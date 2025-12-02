/**
 * AboutSection Component
 *
 * Displays personal information, bio, skills, and software icons.
 * Uses GSAP ScrollTrigger for reveal animations.
 *
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import software icons
import profileImg from "@/assets/profile.jpg";
import premiereIcon from "@/assets/premiere.png";
import afterEffectsIcon from "@/assets/after-effects.png";
import photoshopIcon from "@/assets/photoshop.png";
import davinciIcon from "@/assets/davinci.png";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Software data with imported icons
 */
const softwareList = [
  { name: "Premiere Pro", icon: premiereIcon },
  { name: "After Effects", icon: afterEffectsIcon },
  { name: "Photoshop", icon: photoshopIcon },
  { name: "DaVinci Resolve", icon: davinciIcon },
];

/**
 * Skills list
 */
const skills = [
  "Video Editing",
  "Motion Graphics",
  "Photo Editing",
  "Color Grading",
  "Sound Design",
  "Visual Effects",
  "Thumbnail Design",
];

/**
 * Experience data
 */
const experiences = [
  {
    title: "Freelance Video Editor",
    period: "(2022 - Present)",
    company: "Self-employed",
    tasks: [
      "YouTube video editing",
      "Social media content",
      "Motion graphics design",
      "Color grading & correction",
    ],
  },
  {
    title: "Content Creator",
    period: "(2021 - Present)",
    company: "@ibwmahin",
    tasks: [
      "Creating engaging video content",
      "Building online presence",
      "Client collaboration",
      "Brand development",
    ],
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const softwareRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each content block on scroll
      contentRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { y: 60, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ref,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // Animate software icons with stagger
      softwareRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { scale: 0, rotation: -180, opacity: 0 },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: ref,
                start: "top 90%",
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
      id="about"
      className="relative py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 red-glow-left" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Profile Image */}
          <div
            ref={(el) => (contentRefs.current[0] = el)}
            className="lg:col-span-3"
          >
            <div className="profile-frame aspect-[3/4] max-w-xs mx-auto lg:mx-0 magnetic-hover">
              <img
                src={profileImg}
                alt="Abdulla Al Mahin - Video Editor"
                className="w-full h-full object-cover"
              />
              {/* Red Tint Overlay */}
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            {/* Location Badge */}
            <div className="mt-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Bangladesh
              </span>
            </div>
          </div>

          {/* About Me & Skills */}
          <div
            ref={(el) => (contentRefs.current[1] = el)}
            className="lg:col-span-5 space-y-8"
          >
            {/* About Me */}
            <div>
              <h2 className="section-title text-4xl md:text-5xl mb-6">
                About Me
              </h2>

              <div className="space-y-4">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Hi, I'm{" "}
                  <span className="text-foreground font-semibold">
                    Abdulla Al Mahin
                  </span>
                  , a passionate{" "}
                  <span className="text-foreground font-semibold">
                    Video Editor
                  </span>{" "}
                  and{" "}
                  <a
                    href="https://ibwmahin.github.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    ex-Web Developer
                  </a>{" "}
                  from Bangladesh. I specialize in creating engaging visual
                  content that tells compelling stories.
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  With expertise in Adobe Premiere Pro, After Effects, and
                  DaVinci Resolve, I bring creative visions to life through{" "}
                  <span className="text-primary font-semibold">
                    professional video editing, motion graphics, and color
                    grading.
                  </span>
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  I've worked with content creators, businesses, and brands to
                  deliver high-quality video content that stands out.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="section-title text-3xl md:text-4xl mb-4">
                Skills
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                {skills.map((skill, index) => (
                  <li
                    key={index}
                    className="text-sm md:text-base text-muted-foreground flex items-center gap-2 group hover-lift p-2 rounded-lg"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-150 transition-transform" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Experience & Software */}
          <div
            ref={(el) => (contentRefs.current[2] = el)}
            className="lg:col-span-4 space-y-8"
          >
            {/* Experience */}
            <div>
              <h2 className="section-title text-4xl md:text-5xl mb-6">
                Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="tilt-card p-4 rounded-lg bg-card/50 border border-border/50 hover-lift"
                  >
                    <h4 className="text-foreground font-semibold text-sm md:text-base">
                      {exp.title}{" "}
                      <span className="font-normal text-muted-foreground">
                        {exp.period}
                      </span>
                    </h4>
                    <p className="text-primary text-sm">{exp.company}</p>
                    <p className="text-muted-foreground text-xs mt-2">Tasks:</p>
                    <ul className="mt-1 space-y-1">
                      {exp.tasks.map((task, taskIndex) => (
                        <li
                          key={taskIndex}
                          className="text-xs md:text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Software */}
            <div>
              <h3 className="section-title text-3xl md:text-4xl mb-4">
                Software
              </h3>
              <div className="flex flex-wrap gap-4">
                {softwareList.map((software, index) => (
                  <div
                    key={index}
                    ref={(el) => (softwareRefs.current[index] = el)}
                    className="software-icon"
                    title={software.name}
                  >
                    <img
                      src={software.icon}
                      alt={software.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
