
import { Progress } from "@/components/ui/progress";

export function MetricsSection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-hawa-lavender via-white to-hawa-pink/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="font-sora text-3xl md:text-4xl font-bold mb-4">
            Safety <span className="gradient-text">Metrics</span> & Tools
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            HAWA works behind the scenes to check facts while you chat
          </p>
        </div>
        
        <div className="glass max-w-3xl mx-auto p-8 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-sora font-semibold">Hallucination Detection</h3>
                  <span className="text-sm font-medium text-green-600">93%</span>
                </div>
                <Progress value={93} className="h-2 bg-slate-200" indicatorClassName="bg-green-500" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-sora font-semibold">Source Verification</h3>
                  <span className="text-sm font-medium text-blue-600">87%</span>
                </div>
                <Progress value={87} className="h-2 bg-slate-200" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-sora font-semibold">Safety Filtering</h3>
                  <span className="text-sm font-medium text-purple-600">98%</span>
                </div>
                <Progress value={98} className="h-2 bg-slate-200" indicatorClassName="bg-purple-500" />
              </div>
            </div>
            
            {/* Right column */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-sora font-semibold">Real-time Processing</h3>
                  <span className="text-sm font-medium text-amber-600">150ms</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[85%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-sora font-semibold">Multi-model Support</h3>
                  <span className="text-sm font-medium text-pink-600">5 models</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 w-[80%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-sora font-semibold">User Satisfaction</h3>
                  <span className="text-sm font-medium text-teal-600">96%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 w-[96%]"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200">
            <blockquote className="italic text-center text-slate-600">
              "HAWA has transformed how we interact with AI models, providing peace of mind that the information we're getting is accurate and trustworthy."
            </blockquote>
            <p className="text-center mt-4 font-medium">
              — AI Safety Research Team
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
