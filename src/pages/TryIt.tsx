import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, ShieldAlert, Mic, Send, Volume2, Menu, X, Info, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ButtonEffect } from "@/components/ui/button-effect";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDnBZ7hn0GVjMGoeUD_UA3hs6BcP9GCzhA" });

async function ask_gemini(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  console.log(response.text);
  return response;
}

type ChatMessage = 
  | { sender: "user"; content: string }
  | { sender: "ai"; content: string; status?: "verified" | "hallucination" | "filtered" }
  | { sender: "hawa"; content: string };

const TryIt = () => {
  const [sensitivity, setSensitivity] = useState([50]);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: "hawa",
      content: "Welcome to HAWA Guardian! Ask me anything, and I'll ensure you get verified information.",
    }
  ]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth > 768);
  const [isListening, setIsListening] = useState(false);
  const [currentlySpeaking, setCurrentlySpeaking] = useState<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);
  
  // Handle window resize for responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth > 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    // Store the user message in a variable
    const messageToSend = userMessage;

    // Add user message to chat
    setChatHistory((prev) => [
      ...prev,
      {
        sender: "user",
        content: messageToSend,
      },
    ]);

    // Clear the input field
    setUserMessage("");

    try {
      // Send the message to the Gemini API and await the response
      const geminiResponse = await ask_gemini(messageToSend);

      // Extract the response text
      const generatedResponse = geminiResponse.text;

      // Add the Gemini API response to the chat
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "ai",
          content: generatedResponse, // Use the `text` field from the response
        },
      ]);

      // Prepare the JSON object
      const payload = {
        prompt: messageToSend,
        response: generatedResponse,
      };

      // Send the POST request to your backend
      const logResponse = await fetch("https://hallucination-detector.onrender.com/api/trust", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await logResponse.json();

      if (!logResponse.ok) {
        console.error("Failed to log the prompt and response to the API");
      }

      // Extract the trustworthiness score
      const confidenceScore = responseData.trustworthiness_score?.trustworthiness_score;
      const formattedConfidenceScore = confidenceScore !== undefined 
        ? Math.round(confidenceScore * 10000) / 100 
        : undefined;
      // Add the confidence score to the chat
      if (formattedConfidenceScore !== undefined) {
        setChatHistory((prev) => [
          ...prev,
          {
            sender: "ai",
            content: `Confidence Score: ${formattedConfidenceScore}%`,
          },
        ]);
      }
    } catch (error) {
      console.error("Error during message handling:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "hawa",
          content: "⚠️ Unable to fetch a response from the Gemini API. Please try again later.",
        },
      ]);
    }
  };

  // Voice-to-text functionality
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognitionAPI();
      
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      
      recognition.onstart = () => {
        setIsListening(true);
        toast("Listening...", {
          description: "Speak clearly into your microphone",
          icon: <Mic className="h-4 w-4 animate-pulse" />
        });
      };
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setUserMessage(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast("Recognition Error", {
          description: `Error: ${event.error}. Please try again.`,
          icon: <ShieldAlert className="h-4 w-4 text-destructive" />,
          variant: "destructive"
        });
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      console.log("Speech recognition not supported");
      toast("Feature Not Supported", {
        description: "Speech recognition is not supported in your browser",
        icon: <ShieldAlert className="h-4 w-4 text-destructive" />,
        variant: "destructive"
      });
    }
  };

  // Text-to-speech functionality
  const speakMessage = (messageIndex: number) => {
    if ('speechSynthesis' in window) {
      // If already speaking, stop it
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        if (currentlySpeaking === messageIndex) {
          setCurrentlySpeaking(null);
          return;
        }
      }
      
      const message = chatHistory[messageIndex];
      if (message.sender !== 'user') {
        const utterance = new SpeechSynthesisUtterance(message.content);
        utterance.rate = 1;
        utterance.pitch = 1;
        
        utterance.onend = () => {
          setCurrentlySpeaking(null);
        };
        
        setCurrentlySpeaking(messageIndex);
        window.speechSynthesis.speak(utterance);

        toast("Reading aloud", {
          description: message.sender === 'hawa' ? 'HAWA is speaking' : 'AI response is being read',
          icon: <Volume2 className="h-4 w-4 text-primary" />
        });
      }
    } else {
      toast("Feature Not Supported", {
        description: "Text-to-speech is not supported in your browser",
        icon: <ShieldAlert className="h-4 w-4 text-destructive" />,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* <div className="bg-gradient-to-br from-hawa-lavender via-hawa-pink to-hawa-coral py-4">
        <Navbar />
      </div> */}
      
      <div className="flex-grow flex h-full overflow-hidden">
        {/* Left: Control Panel */}
        <div 
          className={cn(
            "glass p-5 overflow-y-auto border-r transition-all",
            isSidebarVisible ? "w-full md:w-80 lg:w-96" : "hidden md:block md:w-0 lg:w-0 md:p-0 overflow-hidden"
          )}
        >
          <div className={cn("transition-opacity", !isSidebarVisible && "md:opacity-0")}>
            <h3 className="font-sora font-semibold text-xl mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Guardian Control Panel
            </h3>
            
            <div className={cn("space-y-8", !isSidebarVisible && "md:hidden")}>
              {/* Sensitivity */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-1.5">
                    Guardian Sensitivity
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </label>
                  <span className="text-sm font-medium">{sensitivity}%</span>
                </div>
                <Slider
                  value={sensitivity}
                  onValueChange={setSensitivity}
                  max={100}
                  step={1}
                  className="py-1"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Relaxed</span>
                  <span>Balanced</span>
                  <span>Strict</span>
                </div>
              </div>
              
              {/* Model Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  AI Model
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                </label>
                <Select defaultValue="gpt-4">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4 Turbo</SelectItem>
                    <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                    <SelectItem value="claude">Claude 3 Opus</SelectItem>
                    <SelectItem value="palm">Gemini Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-1.5">
                    Hallucination Detection
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                  </label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-1.5">
                    Real-time Fact-checking
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                  </label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-1.5">
                    Source References
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                  </label>
                  <Switch />
                </div>
              </div>
              
              {/* Response Style */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  Response Style
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                </label>
                <Select defaultValue="balanced">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="detailed">Detailed Corrections</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="minimal">Minimal Interventions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right: Chat Interface */}
        <div className="flex flex-col h-full flex-1 overflow-hidden">
          <div className="bg-white p-4 shadow-sm flex items-center justify-between border-b">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarVisible(!isSidebarVisible)} 
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h3 className="font-semibold text-lg">Chat with Guardian</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarVisible(!isSidebarVisible)} 
                className="hidden md:flex"
              >
                {isSidebarVisible ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>
          
          {/* Chat messages with scroll */}
          <ScrollArea className="flex-1 p-4 bg-slate-50" ref={chatContainerRef}>
            <div className="space-y-6 min-h-full pb-4">
              {chatHistory.map((message, index) => (
                <div key={index} className="relative group">
                  <ChatBubble
                    sender={message.sender}
                    content={message.content}
                    status={message.sender === "ai" ? message.status : undefined}
                  />
                  {message.sender !== "user" && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => speakMessage(index)}
                    >
                      <Volume2 className={cn(
                        "h-4 w-4", 
                        currentlySpeaking === index ? "text-primary animate-pulse" : "text-slate-500"
                      )} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Ask about health, science, or any topic..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="pr-10"
                />
                <ButtonEffect 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/10 -translate-y-full h-8 w-8"
                  onClick={startListening}
                >
                  <Mic className={cn(
                    "h-4 w-4", 
                    isListening ? "text-primary animate-pulse" : "text-slate-500"
                  )} />
                </ButtonEffect>
              </div>
              <ButtonEffect onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </ButtonEffect>
            </div>
            
            <div className="flex justify-between items-center text-xs text-slate-500 pt-3">
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-primary" />
                <span>HAWA Guardian Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryIt;
