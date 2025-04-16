
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero";
import { WalkthroughSection } from "@/components/sections/walkthrough";
import { FeaturesSection } from "@/components/sections/features";
import { WhyHawaSection } from "@/components/sections/why-hawa";
import { MetricsSection } from "@/components/sections/metrics";
import { Footer } from "@/components/layout/footer";
import { DemoModal } from "@/components/sections/demo-modal";
import { useEffect, useState } from "react";

const Index = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  
  // Listen for custom openTryIt event
  useEffect(() => {
    const openTryItHandler = () => {
      setDemoOpen(true);
    };
    
    window.addEventListener('openTryIt', openTryItHandler);
    
    return () => {
      window.removeEventListener('openTryIt', openTryItHandler);
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-hawa-lavender via-hawa-pink to-hawa-coral pt-24 pb-16">
        <Navbar />
        <HeroSection />
      </div>
      
      <WalkthroughSection />
      <FeaturesSection />
      <WhyHawaSection />
      <MetricsSection />
      
      {/* Try It Section */}
      <div id="try-it-section" className="h-0"></div>
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
      
      <Footer />
    </div>
  );
};

export default Index;
