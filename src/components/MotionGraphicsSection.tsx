/**
 * MotionGraphicsSection Component
 * 
 * Displays motion graphics portfolio work with video embeds.
 * Features animated text and hover effects.
 * 
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoEmbed from "./VideoEmbed";

gsap.registerPlugin(ScrollTrigger);

/**
 * Motion graphics showcase data with YouTube video IDs
 * Replace these with your actual video IDs
 */
const motionWorks = [
  {
    id: 1,
    title: "Logo Animation",
    subtitle: "Brand Identity",
    videoId: "dQw4w9WgXcQ", // Replace with actual video ID
  },
  {
    id: 2,
    title: "Intro Sequence",
    subtitle: "YouTube Opener",
    videoId: "dQw4w9WgXcQ", // Replace with actual video ID
  },
  {
    id: 3,
    title: "Kinetic Typography",
    subtitle: "Text Animation",
    videoId: "dQw4w9WgXcQ", // Replace with actual video ID
  },
];

const MotionGraphicsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with split effect
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0, rotateX: -20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Grid items animation with 3D effect
      const gridItems = gridRef.current?.children || [];
      gsap.fromTo(
        gridItems,
        { 
          y: 80, 
          opacity: 0, 
          rotateY: -30,
          transformPerspective: 1000 
        },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );

      // Marquee parallax effect
      gsap.to(marqueeRef.current, {
        x: "-50%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="motion-graphics"
      className="relative py-20 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 red-glow-bottom" />

      <div className="container relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="section-title text-5xl md:text-7xl lg:text-8xl glow-text">
            Motion Graphics
          </h2>
          <p className="text-muted-foreground text-lg mt-2">Visual Effects</p>
        </div>

        {/* Works Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {motionWorks.map((work) => (
            <div
              key={work.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer magnetic-hover"
            >
              {/* Video Embed */}
              <VideoEmbed
                videoId={work.videoId}
                title={work.title}
              />

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 via-background/50 to-transparent pointer-events-none">
                <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground tracking-wide">
                  {work.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {work.subtitle}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-xl transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Animated Text Banner - Infinite Marquee */}
        <div className="mt-20 overflow-hidden py-8">
          <div ref={marqueeRef} className="flex whitespace-nowrap">
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="font-heading text-6xl md:text-8xl font-bold text-muted/20 mx-8 italic select-none"
              >
                MOTION • GRAPHICS • DESIGN • EFFECTS • 
              </span>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "50+", label: "Projects Completed" },
            { number: "30+", label: "Happy Clients" },
            { number: "3+", label: "Years Experience" },
            { number: "100%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-heading font-bold text-primary glow-text">
                {stat.number}
              </p>
              <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MotionGraphicsSection;