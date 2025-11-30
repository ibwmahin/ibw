/**
 * HeroSection Component
 * 
 * Main landing section with portfolio title and video editing background.
 * Features GSAP animations for text reveal and red glow effects.
 * 
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Animation Timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Title animation with split effect
      tl.fromTo(
        titleRef.current,
        { y: 150, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.4 }
      )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        nameRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        scrollRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.2"
      );

      // Floating animation for scroll indicator
      gsap.to(scrollRef.current, {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-end pb-20 overflow-hidden"
    >
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

      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10">
        {/* Name tag */}
        <p
          ref={nameRef}
          className="text-primary font-body text-sm md:text-base font-medium tracking-widest uppercase mb-4"
        >
          @ibwmahin
        </p>
        
        <h1
          ref={titleRef}
          className="font-heading text-7xl md:text-9xl lg:text-[12rem] font-bold text-foreground leading-none tracking-tight glow-text"
          style={{ fontStyle: "italic" }}
        >
          Portfolio
        </h1>
        <p
          ref={subtitleRef}
          className="font-body text-lg md:text-xl text-muted-foreground mt-4"
        >
          Video Editor & Motion Designer
        </p>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2 pulse-ring">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
        <p className="text-muted-foreground text-xs mt-2 text-center">Scroll</p>
      </div>
    </section>
  );
};

export default HeroSection;