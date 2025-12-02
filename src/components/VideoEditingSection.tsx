/**
 * VideoEditingSection Component
 *
 * Showcases video editing portfolio with YouTube embeds.
 * Features GSAP scroll animations and clickable video cards.
 *
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoEmbed from "./VideoEmbed";

gsap.registerPlugin(ScrollTrigger);

/**
 * Portfolio video projects with YouTube IDs
 * Replace with your actual video IDs
 */
const projects = [
  {
    id: 1,
    title: "YouTube Video Edit",
    channel: "@Creator",
    videoId: "dQw4w9WgXcQ", // Replace with actual video ID
    category: "Long-form Content",
    size: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Gaming Montage",
    channel: "@Gamer",
    videoId: "dQw4w9WgXcQ", // Replace with actual video ID
    category: "Gaming",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    title: "Tutorial Video",
    channel: "@Designer",
    videoId: "dQw4w9WgXcQ", // Replace with actual video ID
    category: "Educational",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    title: "Vlog Edit",
    channel: "@Vlogger",
    videoId: "dQw4w9WgXcQ", // Replace with actual video ID
    category: "Lifestyle",
    size: "md:col-span-2 md:row-span-1",
  },
];

const VideoEditingSection = () => {
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

      // Grid items stagger animation
      const gridItems = gridRef.current?.children || [];
      gsap.fromTo(
        gridItems,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
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
    <section
      ref={sectionRef}
      id="video-editing"
      className="relative py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 red-glow-left" />

      <div className="container relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="section-title text-5xl md:text-7xl lg:text-8xl">
            Video Editing
          </h2>
          <p className="text-muted-foreground text-lg mt-2">
            Featured Projects
          </p>
        </div>

        {/* Video Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[300px]"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`${project.size} group relative rounded-xl overflow-hidden magnetic-hover`}
            >
              {/* Video Embed */}
              <VideoEmbed videoId={project.videoId} title={project.title} />

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 via-background/70 to-transparent pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {project.channel}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-xl transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="text-center mt-12">
          <a
            href="https://youtube.com/@ibwmahin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors duration-300 font-medium group"
          >
            <span>View All on YouTube</span>
            <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoEditingSection;
