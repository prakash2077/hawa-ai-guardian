
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    emoji: "🤖",
    title: "You ask a question...",
    description: "Type any question into your favorite AI assistant.",
    color: "bg-hawa-blue"
  },
  {
    emoji: "💡",
    title: "Your AI responds...",
    description: "The AI generates what appears to be a well-written answer.",
    color: "bg-hawa-peach"
  },
  {
    emoji: "⚠️",
    title: "But wait! Something smells off…",
    description: "The response contains information that's incorrect or misleading.",
    color: "bg-hawa-warning"
  },
  {
    emoji: "🛡️",
    title: "HAWA steps in and flags hallucinations!",
    description: "HAWA analyzes the response and identifies factual errors in real-time.",
    color: "bg-hawa-lavender"
  },
  {
    emoji: "✅",
    title: "You get a verified, safe answer.",
    description: "HAWA ensures you only receive factually accurate information.",
    color: "bg-hawa-green"
  }
];

export function WalkthroughSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const scrollListener = () => {
            if (!sectionRef.current) return;
            
            const { top, height } = sectionRef.current.getBoundingClientRect();
            const scrollPosition = window.innerHeight - top;
            const stepHeight = height / steps.length;
            
            let newStep = Math.min(
              Math.max(Math.floor(scrollPosition / stepHeight), 0),
              steps.length - 1
            );
            
            setActiveStep(newStep);
          };
          
          window.addEventListener("scroll", scrollListener);
          
          return () => {
            window.removeEventListener("scroll", scrollListener);
          };
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      id="walkthrough" 
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white"
    >
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="font-sora text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">HAWA</span> Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See how HAWA helps guard your AI interactions and ensures you get factual responses
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left side: Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={cn(
                  "transition-all duration-500 p-6 rounded-2xl border",
                  activeStep === index ? 
                    "border-primary shadow-lg scale-105" : 
                    "border-slate-100 opacity-60"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-xl",
                    step.color
                  )}>
                    <span>{step.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-sora font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right side: Visual */}
          <div className="relative h-[500px] hidden md:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[280px] h-[500px] rounded-[40px] border-[10px] border-slate-800 bg-white overflow-hidden shadow-xl">
                <div className="h-full flex flex-col">
                  <div className="h-8 bg-slate-800 flex items-center justify-center">
                    <div className="w-32 h-4 rounded-full bg-slate-700"></div>
                  </div>
                  <div className="flex-grow p-3 overflow-y-auto bg-slate-50 flex flex-col gap-3">
                    {/* Mock chat bubbles showing current active step */}
                    <div className="chat-bubble-user self-end">
                      Tell me about quantum computing
                    </div>
                    
                    {activeStep >= 1 && (
                      <div className="chat-bubble-ai">
                        Quantum computing uses quantum bits or "qubits" that can exist in multiple states at once, allowing for parallel calculations.
                        {activeStep >= 2 && (
                          <span className="font-medium"> The first quantum computer was built in 1982 by Richard Feynman.</span>
                        )}
                      </div>
                    )}
                    
                    {activeStep >= 3 && (
                      <div className="chat-bubble-hawa">
                        <p className="font-medium mb-1">⚠️ Hallucination detected:</p>
                        <p className="text-sm">Richard Feynman proposed quantum computing in 1982 but did not build a quantum computer. The first working quantum computer was demonstrated much later.</p>
                      </div>
                    )}
                    
                    {activeStep >= 4 && (
                      <div className="chat-bubble-ai">
                        <p>Quantum computing uses qubits that can exist in multiple states simultaneously. While Richard Feynman proposed the concept in 1982, the first functional quantum computers weren't built until the 1990s.</p>
                        <div className="mt-1 text-xs flex items-center gap-1">
                          <span className="tag-verified">✅ Verified</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
