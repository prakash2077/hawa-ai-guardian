
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero";
import { WalkthroughSection } from "@/components/sections/walkthrough";
import { FeaturesSection } from "@/components/sections/features";
import { WhyHawaSection } from "@/components/sections/why-hawa";
import { MetricsSection } from "@/components/sections/metrics";
import { Footer } from "@/components/layout/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-hawa-lavender via-hawa-pink to-hawa-coral pt-24 pb-16">
        <Navbar />
        <HeroSection />
      </div>
      
      <WalkthroughSection />
      {/* <FeaturesSection /> */}
      <WhyHawaSection />
      <MetricsSection />
      <Footer />
    </div>
  );
};

export default Index;
