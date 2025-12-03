/**
 * HeroSection Component
 *
 * Main landing section with portfolio title and animated elements.
 * Optimized for mobile performance with reduced animations.
 *
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Only track mouse on desktop
const useMousePosition = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  return mousePos;
};

// Reduced particles for better performance
const FloatingParticles = () => {
  const particles = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 6 : 12;
    return [...Array(count)].map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 2,
      opacity: 0.15 + Math.random() * 0.2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary will-change-transform"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animation: `float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Simpler, faster animations for mobile
      const duration = isMobile ? 0.5 : 0.8;
      
      tl.fromTo(
        nameRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration }
      )
        .fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration },
          "-=0.3"
        )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: duration * 0.8 },
          "-=0.2"
        )
        .fromTo(
          ".cta-button",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
          "-=0.2"
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          "-=0.1"
        );

      // Skip scroll bounce on mobile
      if (!isMobile) {
        gsap.to(scrollRef.current, {
          y: -8,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 red-glow opacity-50" />

      {/* Background - simplified transform */}
      <div
        className="absolute inset-0 opacity-20 hidden md:block"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1667906962043-a3e82dea23a3?q=80&w=1200&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%)",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%)",
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
      />

      <FloatingParticles />

      <div className="container relative z-10">
        <p
          ref={nameRef}
          className="text-primary font-body text-sm md:text-base font-medium tracking-widest uppercase mb-4 flex items-center gap-3"
        >
          <span className="w-8 h-[2px] bg-primary" />
          Abdulla Al Mahin
        </p>

        <h1
          ref={titleRef}
          className="font-heading text-4xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight tracking-tight"
        >
          Video Editor & <br /> Motion Designer
        </h1>
        <p
          ref={subtitleRef}
          className="font-body text-base md:text-xl text-muted-foreground mt-4 md:mt-6 max-w-xl"
        >
          I bring stories to life through captivating visuals and seamless edits, 
          turning creative visions into dynamic realities.
        </p>
        <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3 md:gap-4">
          <a href="#video-editing" className="cta-button">
            <Button size="lg" className="group">
              View My Work
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
          <a href="#contact" className="cta-button">
            <Button size="lg" variant="outline">
              Get in Touch
            </Button>
          </a>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center items-center flex-col"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
        <p className="text-muted-foreground text-xs mt-2 text-center tracking-widest">
          SCROLL
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
