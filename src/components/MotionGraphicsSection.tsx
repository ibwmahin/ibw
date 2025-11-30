/**
 * MotionGraphicsSection Component
 * 
 * Displays motion graphics portfolio work.
 * Features animated text and hover effects.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Motion graphics showcase data
 */
const motionWorks = [
  {
    id: 1,
    title: "BALEÇÃO",
    subtitle: "Animated Logo",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
  },
  {
    id: 2,
    title: "Product Promo",
    subtitle: "3D Animation",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
  },
  {
    id: 3,
    title: "Channel Intro",
    subtitle: "Motion Design",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
];

const MotionGraphicsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Grid items animation
      gsap.fromTo(
        gridRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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
      id="motion-graphics"
      className="relative py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background grid-pattern" />

      <div className="container relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="section-title text-5xl md:text-7xl lg:text-8xl">
            Motion Graphics
          </h2>
          <p className="text-muted-foreground text-lg mt-2">Effects</p>
        </div>

        {/* Works Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {motionWorks.map((work) => (
            <div
              key={work.id}
              className="group relative aspect-video overflow-hidden rounded-lg cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground tracking-wide">
                  {work.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {work.subtitle}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-lg transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Animated Text Banner */}
        <div className="mt-20 overflow-hidden">
          <div className="flex animate-[slide_20s_linear_infinite] whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="font-heading text-6xl md:text-8xl font-bold text-muted/30 mx-8 italic"
              >
                MOTION • GRAPHICS • DESIGN • 
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MotionGraphicsSection;
