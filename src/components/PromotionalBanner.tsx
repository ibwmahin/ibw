/**
 * PromotionalBanner Component
 * 
 * Displays services/offerings with animated text effects.
 * Features gradient backgrounds and hover interactions.
 * 
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faMagicWandSparkles, faPalette } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

/**
 * Services data
 */
const services = [
  {
    id: 1,
    icon: faVideo,
    title: "Video Editing",
    subtitle: "Professional Cuts",
    description: "Clean edits, smooth transitions, and engaging storytelling for your content.",
    gradient: "from-primary/80 to-primary/40",
  },
  {
    id: 2,
    icon: faMagicWandSparkles,
    title: "Motion Graphics",
    subtitle: "Visual Effects",
    description: "Eye-catching animations, intros, and motion design to elevate your brand.",
    gradient: "from-primary/60 to-primary/20",
  },
  {
    id: 3,
    icon: faPalette,
    title: "Color Grading",
    subtitle: "Cinematic Look",
    description: "Professional color correction and grading for that perfect cinematic feel.",
    gradient: "from-amber-500/60 to-amber-600/20",
  },
];

const PromotionalBanner = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards animation with 3D rotation and scroll scrubbing
      const cards = cardsRef.current?.children || [];
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0, rotateX: 30, rotateY: -10, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 red-glow-center opacity-30" />

      <div className="container relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl">
            Services
          </h2>
          <p className="text-muted-foreground text-lg mt-2">What I Offer</p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <div
              key={service.id}
              className={`relative p-8 rounded-xl overflow-hidden cursor-pointer group tilt-card
                bg-gradient-to-br ${service.gradient}
                border border-border/30 hover:border-primary/50
                transform transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20`}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-background/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon 
                  icon={service.icon} 
                  className="text-2xl text-foreground"
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  {service.title}
                </h3>
                <p className="text-foreground/70 text-sm mt-1 font-medium">
                  {service.subtitle}
                </p>
                <p className="text-foreground/60 text-sm mt-4 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-24 h-24 bg-foreground/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-foreground/10 group-hover:bg-foreground/30 transition-colors duration-300" />
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors duration-300 font-medium"
          >
            <span>Interested in working together?</span>
            <span className="text-xl">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;