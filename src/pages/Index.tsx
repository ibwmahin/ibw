/**
 * Index Page
 * 
 * Main portfolio landing page combining all sections.
 * Video Editor Portfolio for Abdulla Al Mahin.
 * 
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PortfolioNav from "@/components/PortfolioNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VideoEditingSection from "@/components/VideoEditingSection";
import MotionGraphicsSection from "@/components/MotionGraphicsSection";
import PromotionalBanner from "@/components/PromotionalBanner";
import ContactSection from "@/components/ContactSection";
import AIBot from "@/components/AIBot";
import ScrollToTop from "@/components/ScrollToTop";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <div className="grid-pattern-fixed" />
      <PortfolioNav />
      <HeroSection />
      <AboutSection />
      <VideoEditingSection />
      <MotionGraphicsSection />
      <PromotionalBanner />
      <ContactSection />
      <AIBot />
      <ScrollToTop />
    </main>
  );
};

export default Index;
