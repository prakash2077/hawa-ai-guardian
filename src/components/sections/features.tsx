
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, Info, Shield, ShieldAlert, Star } from "lucide-react";

export function FeaturesSection() {
  const [sensitivity, setSensitivity] = useState([50]);
  
  return (
    <section id="features" className="py-24 md:py-32 bg-slate-50">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="font-sora text-3xl md:text-4xl font-bold mb-4">
            Complete <span className="gradient-text">Control</span> Panel
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Customize how HAWA protects your AI interactions with our intuitive control panel
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          {/* Left: Control Panel */}
          <div className="glass p-6 md:p-8 rounded-2xl">
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
          <div className="glass-card p-6 rounded-2xl">
            <div className="bg-white rounded-xl p-4 shadow-sm mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Chat with Guardian</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Active</span>
              </div>
            </div>
            
            <div className="space-y-6 mb-6">
              <ChatBubble 
                sender="user" 
                content="What are the side effects of drinking alkaline water during pregnancy?" 
              />
              
              <ChatBubble 
                sender="ai" 
                content="Alkaline water is generally safe during pregnancy and can help with morning sickness. It can reduce acid reflux, provide better hydration, and boost immune function for both mother and baby."
                status="hallucination"
              />
              
              <ChatBubble 
                sender="hawa" 
                content="⚠️ The previous response contains unverified claims about alkaline water benefits during pregnancy. There is limited scientific evidence supporting these specific benefits for pregnant women."
              />
              
              <ChatBubble 
                sender="ai" 
                content="While alkaline water is generally considered safe to drink during pregnancy, there is limited scientific evidence for specific benefits like reducing morning sickness or boosting immune function. It's important to maintain proper hydration during pregnancy, but regular water is equally effective. Always consult with your healthcare provider about dietary changes during pregnancy."
                status="verified"
              />
            </div>
            
            <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200 pt-3">
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
    </section>
  );
}
