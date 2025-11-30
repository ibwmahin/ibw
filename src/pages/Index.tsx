/**
 * Index Page
 * 
 * Main portfolio landing page combining all sections.
 * Video Editor Portfolio for Rafael Costa.
 */

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Component Imports
import PortfolioNav from "@/components/PortfolioNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VideoEditingSection from "@/components/VideoEditingSection";
import MotionGraphicsSection from "@/components/MotionGraphicsSection";
import PromotionalBanner from "@/components/PromotionalBanner";
import ContactSection from "@/components/ContactSection";

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <PortfolioNav />

      {/* Hero Section - Portfolio Title */}
      <HeroSection />

      {/* About Section - Bio, Skills, Experience, Software */}
      <AboutSection />

      {/* Video Editing Portfolio */}
      <VideoEditingSection />

      {/* Motion Graphics Showcase */}
      <MotionGraphicsSection />

      {/* Promotional Offers */}
      <PromotionalBanner />

      {/* Contact / Thank You Section */}
      <ContactSection />
    </main>
  );
};

export default Index;
