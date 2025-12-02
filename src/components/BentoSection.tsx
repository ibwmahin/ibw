/**
 * BentoSection Component
 *
 * Modern bento-style grid layout showcasing key information.
 * Features asymmetric layout with animations and interactive cards.
 *
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFire,
  faGlobe,
  faCamera,
  faAward,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const bentoItems = [
  {
    id: 1,
    icon: faAward,
    title: "Quality First",
    description:
      "Professional standards for every project, ensuring top-tier results.",
    gradient: "from-green-500/20 to-green-500/5",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: 2,
    icon: faFire,
    title: "100% Satisfaction",
    description:
      "I work with you, offering unlimited revisions until you are completely happy with the final result.",
    gradient: "from-amber-500/20 to-amber-500/5",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    icon: faGlobe,
    title: "Global Clients",
    description: "Working with creators worldwide.",
    gradient: "from-blue-500/20 to-blue-500/5",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    icon: faClock,
    title: "Fast Turnaround",
    description: "Quick delivery without compromising quality.",
    gradient: "from-primary/20 to-primary/5",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: 5,
    icon: faUsers,
    title: "30+ Clients",
    description: "Trusted by content creators.",
    gradient: "from-pink-500/20 to-pink-500/5",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: 6,
    icon: faCamera,
    title: "Photo Editing",
    description: "High-end photo retouching and manipulation.",
    gradient: "from-purple-500/20 to-purple-500/5",
    size: "md:col-span-1 md:row-span-1",
  },
];

const BentoCard = ({ item }: { item: (typeof bentoItems)[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline>();

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });

    if (cardRef.current) {
      const icon = cardRef.current.querySelector(".bento-icon");
      const orb = cardRef.current.querySelector(".bento-orb");

      timeline.current
        .to(cardRef.current, {
          scale: 1.02,
          rotateX: 5,
          rotateY: -5,
          perspective: 1000,
          duration: 0.5,
          ease: "power3.out",
        })
        .to(icon, { scale: 1.15, rotate: -5, duration: 0.4, ease: "power3.out" }, "-=0.4")
        .to(orb, { scale: 1.75, duration: 0.5, ease: "power3.out" }, "-=0.4");
    }
  }, []);

  const handleMouseEnter = () => {
    timeline.current?.play();
  };

  const handleMouseLeave = () => {
    timeline.current?.reverse();
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${item.size} relative p-6 rounded-2xl overflow-hidden cursor-pointer
        bg-gradient-to-br ${item.gradient}
        border border-border/30 hover:border-primary/50
        transition-colors duration-300 hover-lift`}
    >
      {/* Icon */}
      <div className="bento-icon w-12 h-12 bg-background/30 rounded-xl flex items-center justify-center mb-4">
        <FontAwesomeIcon
          icon={item.icon}
          className="text-2xl text-foreground"
        />
      </div>

      {/* Content */}
      <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">
        {item.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {item.description}
      </p>

      {/* Decorative gradient orb */}
      <div className="bento-orb absolute -bottom-10 -right-10 w-32 h-32 bg-foreground/5 rounded-full blur-2xl" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none" />
    </div>
  );
};

const BentoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = Array.from(
        gridRef.current?.children || []
      ) as HTMLElement[];
      if (items.length === 0) return;

      gsap.fromTo(
        items,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 red-glow-center opacity-20" />

      <div className="container relative z-10">
        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]"
        >
          {bentoItems.map((item) => (
            <BentoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoSection;
