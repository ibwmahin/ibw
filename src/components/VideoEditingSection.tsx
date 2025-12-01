/**
 * VideoEditingSection Component
 * 
 * Showcases video editing portfolio with before/after comparisons.
 * Features GSAP scroll animations and hover effects.
 * 
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

/**
 * Portfolio project data
 */
const projects = [
  {
    id: 1,
    clientName: "YouTube Channel Project",
    youtubeHandle: "@Creator",
    subscribers: "1.5M+",
    before: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80",
    after: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80",
    description: "Complete video editing for the channel, including motion graphics and color correction.",
  },
  {
    id: 2,
    clientName: "Gaming Channel",
    youtubeHandle: "@Gamer",
    subscribers: "800K+",
    before: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80",
    after: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
    description: "Gameplay editing with visual effects and dynamic transitions.",
  },
  {
    id: 3,
    clientName: "Design Tutorial Channel",
    youtubeHandle: "@Designer",
    subscribers: "500K+",
    before: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
    after: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
    description: "Design tutorials with advanced motion graphics.",
  },
];

/**
 * Testimonial data
 */
const testimonial = {
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
  name: "John Smith",
  handle: "@johnsmith",
  verified: true,
  text: "Amazing work! Mahin completely transformed the quality of my videos. Highly recommend for anyone looking to elevate their channel's production value.",
  likes: "2.4K",
  retweets: "156",
};

const VideoEditingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      // Project cards stagger animation
      projectRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.15,
              scrollTrigger: {
                trigger: ref,
                start: "top 85%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="video-editing"
      className="relative py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background grid-pattern" />
      <div className="absolute inset-0 red-glow-left" />

      <div className="container relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="section-title text-5xl md:text-7xl lg:text-8xl">
            Video Editing
          </h2>
          <p className="text-muted-foreground text-lg mt-2">Featured Projects</p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="space-y-8"
            >
              {/* Before/After Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* Before */}
                <div className="space-y-3">
                  <p className="text-muted-foreground text-sm font-medium">
                    Before
                  </p>
                  <div className="comparison-card aspect-video relative group cursor-pointer overflow-hidden hover-lift">
                    <img
                      src={project.before}
                      alt={`${project.clientName} - Before`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="play-overlay">
                      <div className="w-16 h-16 bg-foreground/90 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faPlay as any}
                          className="text-background text-xl ml-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="space-y-3">
                  <p className="text-muted-foreground text-sm font-medium">
                    After
                  </p>
                  <div className="comparison-card aspect-video relative group cursor-pointer overflow-hidden hover-lift">
                    <img
                      src={project.after}
                      alt={`${project.clientName} - After`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="play-overlay">
                      <div className="w-16 h-16 bg-foreground/90 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faPlay as any}
                          className="text-background text-xl ml-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Name */}
              <p className="text-center text-muted-foreground text-sm">
                {project.clientName}
              </p>

              {/* Show testimonial after first project */}
              {index === 0 && (
                <div className="max-w-xl mx-auto mt-12">
                  <div className="bg-card border border-border rounded-xl p-6 hover-lift">
                    <div className="flex items-start gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
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
                          <span className="text-muted-foreground text-sm">
                            {testimonial.handle}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                          {testimonial.text}
                        </p>
                        <div className="flex items-center gap-6 mt-4 text-muted-foreground text-xs">
                          <span className="flex items-center gap-1">
                            <i className="far fa-heart" /> {testimonial.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="fas fa-retweet" /> {testimonial.retweets}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoEditingSection;