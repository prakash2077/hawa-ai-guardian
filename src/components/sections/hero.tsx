
import { ButtonEffect } from "@/components/ui/button-effect";
import { Shield, Video } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-28">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5deff_1px,transparent_1px),linear-gradient(to_bottom,#e5deff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="container relative px-4">
        <div className="flex flex-col items-center text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10">
            <div className="w-64 h-64 rounded-full bg-primary/20 filter blur-3xl" />
          </div>
          
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm mb-6 animate-fade-in">
            <span className="pulse inline-flex h-2 w-2 rounded-full bg-primary"></span>
            <span>Introducing HAWA Guardian</span>
          </div>
          
          <h1 className="font-sora text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in [animation-delay:200ms]">
            <span className="inline-block">HAWA is</span>{" "}
            <span className="inline-block gradient-text">Watching Over</span>{" "}
            <span className="inline-block">Your AI Responses 🛡️</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mb-8 animate-fade-in [animation-delay:300ms]">
            Real-time hallucination detection, model comparison, and peace of mind 
            for every AI conversation. Trust HAWA to ensure your AI responses are 
            factual and reliable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in [animation-delay:400ms]">
            <ButtonEffect 
              size="lg" 
              sparkles 
              asChild
            >
              <Link to="/try-it" className="flex items-center gap-2">
                Try It 💬
              </Link>
            </ButtonEffect>
            <ButtonEffect size="lg" variant="outline">
              <span className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                See How It Works
              </span>
            </ButtonEffect>
          </div>
          
          <div className="relative w-full max-w-4xl mx-auto animate-fade-in [animation-delay:500ms]">
            <div className="aspect-[16/9] rounded-xl overflow-hidden border-8 border-white shadow-2xl shadow-primary/10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-hawa-lavender via-hawa-pink to-hawa-coral flex items-center justify-center">
                <div className="glass p-8 rounded-3xl flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center mb-4 animate-bounce-gentle">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-xl font-sora font-semibold">HAWA Guardian Try It</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 animate-float">
              <div className="bubble bg-hawa-yellow text-gray-800 text-sm">
                I'm watching for hallucinations! ✨
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-6 animate-float [animation-delay:1s]">
              <div className="bubble bg-hawa-green text-gray-800 text-sm">
                Facts verified! 🔍
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
