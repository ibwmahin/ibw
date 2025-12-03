/**
 * Index Page
 * 
 * Main portfolio landing page combining all sections.
 * Video Editor Portfolio for Abdulla Al Mahin.
 * 
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LoadingScreen from "@/components/LoadingScreen";
import PortfolioNav from "@/components/PortfolioNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VideoEditingSection from "@/components/VideoEditingSection";
import BentoSection from "@/components/BentoSection";
import MotionGraphicsSection from "@/components/MotionGraphicsSection";
import PromotionalBanner from "@/components/PromotionalBanner";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import AIBot from "@/components/AIBot";
import ScrollToTop from "@/components/ScrollToTop";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const mouseGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    document.documentElement.style.scrollBehavior = "smooth";
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", checkMobile);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Mouse glow effect - desktop only
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseGlowRef.current) {
        gsap.to(mouseGlowRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {!isMobile && (
        <div
          ref={mouseGlowRef}
          className="pointer-events-none fixed -top-1/2 -left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        />
      )}
      <div className="grid-pattern-fixed" />
      <PortfolioNav />
      <HeroSection />
      <AboutSection />
      <VideoEditingSection />
      <BentoSection />
      <MotionGraphicsSection />
      <PromotionalBanner />
      <TestimonialsSection />
      <ContactSection />
      <AIBot />
      <ScrollToTop />
    </main>
  );
};

export default Index;
