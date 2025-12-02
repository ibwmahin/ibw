/**
 * TestimonialsSection Component
 * 
 * Horizontal auto-scrolling carousel of client testimonials.
 * Features pause on hover and fade effects on edges.
 * 
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "John Smith",
    handle: "@johnsmith",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    text: "Amazing work! Mahin completely transformed the quality of my videos. Highly recommend for anyone looking to elevate their channel's production value.",
    verified: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    handle: "@sarahjohnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    text: "Professional, fast, and exactly what I needed. The attention to detail in every edit is outstanding. Will definitely work with Mahin again!",
    verified: true,
  },
  {
    id: 3,
    name: "Mike Chen",
    handle: "@mikechen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    text: "Best video editor I've worked with. Quick turnaround, creative ideas, and always delivers above expectations. A true professional!",
    verified: true,
  },
  {
    id: 4,
    name: "Emma Davis",
    handle: "@emmadavis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    text: "Mahin's editing style is unique and modern. He understood my vision immediately and brought it to life perfectly. Couldn't be happier!",
    verified: true,
  },
  {
    id: 5,
    name: "Alex Rodriguez",
    handle: "@alexrodriguez",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    text: "Incredible work ethic and talent. My YouTube channel has grown significantly since working with Mahin. Highly skilled editor!",
    verified: true,
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
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
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Infinite scroll animation
      const scroller = scrollerRef.current;
      if (scroller) {
        const scrollWidth = scroller.scrollWidth / 2;
        
        const animation = gsap.to(scroller, {
          x: -scrollWidth,
          duration: 40,
          ease: "none",
          repeat: -1,
        });

        // Pause on hover
        scroller.addEventListener("mouseenter", () => animation.pause());
        scroller.addEventListener("mouseleave", () => animation.play());
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 red-glow-bottom opacity-30" />

      <div className="container relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="section-title text-5xl md:text-7xl lg:text-8xl">
            Testimonials
          </h2>
          <p className="text-muted-foreground text-lg mt-2">What Clients Say</p>
        </div>

        {/* Carousel Container with Fade Edges */}
        <div className="relative">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          
          {/* Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div className="overflow-hidden">
            <div
              ref={scrollerRef}
              className="flex gap-6"
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-[380px] bg-card/50 border border-border/50 rounded-xl p-6 hover:bg-card hover:border-border transition-all duration-300 hover-lift"
                >
                  {/* Quote Icon */}
                  <FontAwesomeIcon 
                    icon={faQuoteLeft} 
                    className="text-primary/30 text-2xl mb-4"
                  />

                  {/* Testimonial Text */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {testimonial.text}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-semibold text-sm">
                          {testimonial.name}
                        </span>
                        {testimonial.verified && (
                          <svg
                            className="w-4 h-4 text-primary"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {testimonial.handle}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default TestimonialsSection;
