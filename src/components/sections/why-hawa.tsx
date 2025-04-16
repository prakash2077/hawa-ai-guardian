
import { cn } from "@/lib/utils";
import { AlertTriangle, Check, ShieldAlert } from "lucide-react";

const risks = [
  {
    title: "Medical Misinformation",
    description: "ChatGPT told a pregnant woman to drink castor oil... that's not okay 😢",
    icon: AlertTriangle,
    color: "text-red-500"
  },
  {
    title: "Financial Advice",
    description: "AI models sometimes recommend non-existent investment strategies or products",
    icon: AlertTriangle,
    color: "text-amber-500"
  },
  {
    title: "Educational Errors",
    description: "Students receive incorrect information that could impact their learning",
    icon: AlertTriangle,
    color: "text-orange-500"
  }
];

export function WhyHawaSection() {
  return (
    <section id="why" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#fef7cd_1px,transparent_1px),linear-gradient(to_bottom,#fef7cd_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-sora text-3xl md:text-4xl font-bold mb-6">
            Why We Built <span className="gradient-text">HAWA</span>
          </h2>
          <p className="text-lg text-slate-600">
            We believe AI should be truthful, not tricky. HAWA helps make that a reality by protecting users from potentially harmful AI hallucinations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {risks.map((risk, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md border border-slate-100"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <risk.icon className={cn("w-6 h-6", risk.color)} />
              </div>
              <h3 className="font-sora font-semibold text-lg mb-2">{risk.title}</h3>
              <p className="text-slate-600">{risk.description}</p>
            </div>
          ))}
        </div>
        
        <div className="relative glass-card p-8 md:p-10 rounded-2xl max-w-4xl mx-auto">
          <div className="absolute -top-3 -right-3">
            <div className="w-24 h-24 rounded-full bg-hawa-pink/40 filter blur-xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <ShieldAlert className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-sora font-bold text-2xl mb-2">Our Mission</h3>
                <p className="text-slate-700">
                  Creating a safer AI experience where users can trust the information they receive
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-hawa-green p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p>Protect vulnerable users from making decisions based on hallucinated information</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-hawa-green p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p>Provide transparent, factual responses with verified sources when possible</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-hawa-green p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p>Help AI models become more reliable and trustworthy companions in our daily lives</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
