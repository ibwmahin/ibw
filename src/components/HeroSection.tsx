/**
 * HeroSection Component
 * 
 * Main landing section with portfolio title and video editing background.
 * Features GSAP animations for text reveal and red glow effects.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // GSAP Animation Timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 }
      ).fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-end pb-20 overflow-hidden"
    >
      {/* Background with Grid Pattern */}
      <div className="absolute inset-0 bg-background grid-pattern" />
      
      {/* Red Glow Effect - Top Right */}
      <div className="absolute inset-0 red-glow animate-glow-pulse" />
      
      {/* Video Timeline Background Image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
        }}
      />

      {/* Content */}
      <div className="container relative z-10">
        <h1
          ref={titleRef}
          className="font-heading text-7xl md:text-9xl lg:text-[12rem] font-bold text-foreground leading-none tracking-tight"
          style={{ fontStyle: "italic" }}
        >
          Portfólio
        </h1>
        <p
          ref={subtitleRef}
          className="font-body text-lg md:text-xl text-muted-foreground mt-4"
        >
          Editor de Vídeo / Video Editor
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
