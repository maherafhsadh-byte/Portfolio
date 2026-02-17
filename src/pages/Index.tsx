import CustomCursor from "@/components/CustomCursor";
import TopoBackground from "@/components/TopoBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <CustomCursor />
      <TopoBackground />
      <Navbar />
      <Hero />
      <Marquee />
      {/* Spacer for scroll testing */}
      <div className="relative z-10 h-screen flex items-center justify-center">
        <p className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground">
          More coming soon<span className="text-primary">.</span>
        </p>
      </div>
    </div>
  );
};

export default Index;
