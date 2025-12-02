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
  faBolt,
  faAward,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const bentoItems = [
  {
    id: 1,
    icon: faClock,
    title: "Fast Turnaround",
    description: "Quick delivery without compromising quality",
    gradient: "from-primary/20 to-primary/5",
    size: "md:col-span-1 md:row-span-2",
  },
  {
    id: 2,
    icon: faFire,
    title: "100% Satisfaction",
    description: "Unlimited revisions until you're happy",
    gradient: "from-amber-500/20 to-amber-500/5",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    icon: faGlobe,
    title: "Global Clients",
    description: "Working with creators worldwide",
    gradient: "from-blue-500/20 to-blue-500/5",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    icon: faBolt,
    title: "Modern Workflow",
    description: "Latest tools and techniques",
    gradient: "from-purple-500/20 to-purple-500/5",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: 5,
    icon: faAward,
    title: "Quality First",
    description: "Professional standards every project",
    gradient: "from-green-500/20 to-green-500/5",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: 6,
    icon: faUsers,
    title: "30+ Clients",
    description: "Trusted by content creators",
    gradient: "from-pink-500/20 to-pink-500/5",
    size: "md:col-span-1 md:row-span-2",
  },
];

const BentoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.children || [];
      gsap.fromTo(
        items,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
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
      <div className="absolute inset-0 red-glow-center opacity-20" />

      <div className="container relative z-10">
        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]"
        >
          {bentoItems.map((item) => (
            <div
              key={item.id}
              className={`${item.size} group relative p-6 rounded-2xl overflow-hidden cursor-pointer
                bg-gradient-to-br ${item.gradient}
                border border-border/30 hover:border-primary/50
                transition-all duration-500 hover-lift`}
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-background/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-foreground/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoSection;
