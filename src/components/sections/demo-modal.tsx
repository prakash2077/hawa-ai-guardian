
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, Info, Send, Shield, ShieldAlert, Star, X } from "lucide-react";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ChatMessage = 
  | { sender: "user"; content: string }
  | { sender: "ai"; content: string; status?: "verified" | "hallucination" | "filtered" }
  | { sender: "hawa"; content: string };

export function DemoModal({ open, onOpenChange }: DemoModalProps) {
  const [sensitivity, setSensitivity] = useState([50]);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: "hawa",
      content: "Welcome to HAWA Guardian! Ask me anything, and I'll ensure you get verified information.",
    }
  ]);
  
  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    
    // Add user message to chat
    setChatHistory(prev => [...prev, {
      sender: "user",
      content: userMessage
    }]);
    
    // Simulate AI response with hallucination
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        sender: "ai",
        content: "Studies show that drinking alkaline water during pregnancy can reduce morning sickness by 75% and boost your immune system significantly.",
        status: "hallucination"
      }]);
      
      // Simulate HAWA correction
      setTimeout(() => {
        setChatHistory(prev => [...prev, {
          sender: "hawa",
          content: "⚠️ The previous response contains unverified claims about alkaline water benefits during pregnancy. There is limited scientific evidence supporting these specific benefits for pregnant women."
        }]);
        
        // Simulate corrected AI response
        setTimeout(() => {
          setChatHistory(prev => [...prev, {
            sender: "ai",
            content: "While alkaline water is generally considered safe to drink during pregnancy, there is limited scientific evidence for specific benefits like reducing morning sickness or boosting immune function. It's important to maintain proper hydration during pregnancy, but regular water is equally effective. Always consult with your healthcare provider about dietary changes during pregnancy.",
            status: "verified"
          }]);
        }, 1500);
      }, 1500);
    }, 1000);
    
    setUserMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-full p-0 rounded-xl overflow-hidden">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-2xl font-sora">HAWA Guardian Demo</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[80vh] max-h-[700px]">
          {/* Left: Control Panel */}
          <div className="glass p-6 overflow-y-auto border-r">
            <h3 className="font-sora font-semibold text-xl mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Guardian Control Panel
            </h3>
            
            <div className="space-y-8">
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
          
          {/* Right: Chat Interface */}
          <div className="flex flex-col h-full">
            <div className="bg-white p-4 shadow-sm flex items-center justify-between border-b">
              <h3 className="font-semibold text-lg">Chat with Guardian</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Active</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
              {chatHistory.map((message, index) => (
                <ChatBubble
                  key={index}
                  sender={message.sender}
                  content={message.content}
                  status={message.sender === "ai" ? (message as any).status : undefined}
                />
              ))}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about health, science, or any topic..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex justify-between items-center text-xs text-slate-500 pt-3">
                <div className="flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-primary" />
                  <span>HAWA Guardian Active</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <Star className="w-3 h-3 text-slate-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
