/**
 * HeroSection Component
 * 
 * Main landing section with portfolio title and animated elements.
 * Features GSAP animations for text reveal and interactive effects.
 * 
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(nameRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 })
        .fromTo(titleRef.current, { y: 150, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 1.4 }, "-=0.5")
        .fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo(scrollRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.2");

      gsap.to(scrollRef.current, { y: -10, duration: 1.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-end pb-20 overflow-hidden">
      <div className="absolute inset-0 red-glow animate-glow-pulse" />
      
      <div 
        className="absolute inset-0 opacity-30 transition-transform duration-300"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: `hsl(0 72% ${50 + Math.random() * 30}% / ${0.2 + Math.random() * 0.3})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <p ref={nameRef} className="text-primary font-body text-sm md:text-base font-medium tracking-widest uppercase mb-4 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-primary" />
          @ibwmahin
        </p>
        
        <h1 ref={titleRef} className="font-heading text-7xl md:text-9xl lg:text-[12rem] font-bold text-foreground leading-none tracking-tight glow-text">
          Portfolio
        </h1>
        <p ref={subtitleRef} className="font-body text-lg md:text-xl text-muted-foreground mt-4 flex items-center gap-3">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Video Editor & Motion Designer
        </p>
      </div>

      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2 pulse-ring">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
        <p className="text-muted-foreground text-xs mt-2 text-center tracking-widest">SCROLL</p>
      </div>
    </section>
  );
};

export default HeroSection;