/**
 * BentoSection Component
 *
 * Services section with polished card-style layout.
 * Consistent design with testimonial cards.
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

const services = [
  {
    id: 1,
    icon: faAward,
    title: "Quality First",
    description: "Professional standards for every project, ensuring top-tier results.",
  },
  {
    id: 2,
    icon: faFire,
    title: "100% Satisfaction",
    description: "Unlimited revisions until you are completely happy with the final result.",
  },
  {
    id: 3,
    icon: faGlobe,
    title: "Global Clients",
    description: "Working with creators worldwide across all time zones.",
  },
  {
    id: 4,
    icon: faClock,
    title: "Fast Turnaround",
    description: "Quick delivery without compromising quality.",
  },
  {
    id: 5,
    icon: faUsers,
    title: "30+ Clients",
    description: "Trusted by content creators globally.",
  },
  {
    id: 6,
    icon: faCamera,
    title: "Photo Editing",
    description: "High-end photo retouching and manipulation.",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  return (
    <div
      className="group relative p-6 rounded-2xl bg-card/50 border border-border/30 
        hover:border-primary/30 hover:bg-card/80 transition-all duration-300
        backdrop-blur-sm hover-lift"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 
        group-hover:bg-primary/20 transition-colors duration-300">
        <FontAwesomeIcon
          icon={service.icon}
          className="text-xl text-primary group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
        {service.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {service.description}
      </p>

      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 
        transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

const BentoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards stagger animation
      const items = Array.from(gridRef.current?.children || []) as HTMLElement[];
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 red-glow-center opacity-10" />

      <div className="container relative z-10 px-4 md:px-6">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="section-title text-3xl md:text-5xl lg:text-6xl mb-2">
            Services
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            What I Offer
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoSection;
