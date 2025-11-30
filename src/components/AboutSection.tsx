/**
 * AboutSection Component
 * 
 * Displays personal information, bio (PT/EN), skills, experience, and software icons.
 * Uses GSAP ScrollTrigger for reveal animations.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Software data with Adobe-style icons
 */
const softwareList = [
  { name: "Premiere Pro", abbr: "Pr", color: "#9999FF" },
  { name: "After Effects", abbr: "Ae", color: "#9999FF" },
  { name: "Photoshop", abbr: "Ps", color: "#31A8FF" },
  { name: "Illustrator", abbr: "Ai", color: "#FF9A00" },
  { name: "Blender", icon: "blender", isIcon: true },
];

/**
 * Skills list
 */
const skills = [
  "Edição de Vídeo",
  "Motion Graphics",
  "Manipulação",
  "Vetorização",
  "Modelagem 3D",
];

/**
 * Experience data
 */
const experiences = [
  {
    title: "Estágio Designer Gráfico",
    period: "(2021-2023)",
    company: "Shizen Max.",
    tasks: [
      "Manutenção Visual do E-commerce",
      "Artes para as Redes Sociais",
      "Motion Graphics dos produtos",
      "Edição de vídeos corporativos",
    ],
  },
  {
    title: "Designer Gráfico Jr.",
    period: "(2023-presente)",
    company: "Distribuidora Wilson.",
    tasks: [
      "Manutenção Visual do E-commerce",
      "Peças de E-mail Marketing",
      "Artes para as Redes Sociais",
      "Motion Graphics dos produtos",
      "Edição de vídeos corporativos",
    ],
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each content block on scroll
      contentRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: ref,
                start: "top 85%",
                toggleActions: "play none none none",
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
      <div className="absolute inset-0 bg-background grid-pattern" />
      <div className="absolute inset-0 red-glow-left" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Profile Image */}
          <div
            ref={(el) => (contentRefs.current[0] = el)}
            className="lg:col-span-3"
          >
            <div className="profile-frame aspect-[3/4] max-w-xs mx-auto lg:mx-0">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                alt="Rafael Costa - Video Editor"
                className="w-full h-full object-cover"
                style={{
                  filter: "sepia(30%) saturate(150%) hue-rotate(-10deg)",
                }}
              />
              {/* Red Tint Overlay */}
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
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
                Sobre mim
              </h2>

              {/* Portuguese Bio */}
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground font-medium">
                  pt-BR
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Me chamo <span className="text-foreground font-semibold">Rafael Costa.</span>{" "}
                  Tenho 4 anos de experiência profissional como{" "}
                  <span className="text-foreground font-semibold">Designer Gráfico.</span>{" "}
                  Aprendi a usar o After Effects em 2016, e desde então, tenho me
                  aproximado cada vez mais na área do{" "}
                  <span className="text-foreground font-semibold">audiovisual.</span>{" "}
                  Hoje tenho domínio em diversas ferramentas, e{" "}
                  <span className="text-primary font-semibold">
                    já realizei projetos para inúmeros criadores de conteúdo.
                  </span>
                </p>
              </div>

              {/* English Bio */}
              <div className="space-y-4 mt-6">
                <p className="text-xs text-muted-foreground font-medium">
                  en-US
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  My name is <span className="text-foreground font-semibold">Rafael Costa.</span>{" "}
                  I have 4 years of professional experience as a{" "}
                  <span className="text-foreground font-semibold">Graphic Designer.</span>{" "}
                  I learned to use After Effects in 2016, and since then, I have been
                  increasingly moving closer to the{" "}
                  <span className="text-foreground font-semibold">audiovisual</span> field.
                  Currently, I am proficient in various tools and{" "}
                  <span className="text-primary font-semibold">
                    have already completed projects for numerous content creators.
                  </span>
                </p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="section-title text-3xl md:text-4xl mb-4">
                Habilidades
              </h3>
              <ul className="space-y-2">
                {skills.map((skill, index) => (
                  <li
                    key={index}
                    className="text-sm md:text-base text-muted-foreground flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                    {skill};
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
                Experiências
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index}>
                    <h4 className="text-foreground font-semibold text-sm md:text-base">
                      {exp.title}{" "}
                      <span className="font-normal text-muted-foreground">
                        {exp.period}
                      </span>
                    </h4>
                    <p className="text-muted-foreground text-sm">{exp.company}</p>
                    <p className="text-muted-foreground text-xs mt-2">Tarefas:</p>
                    <ul className="mt-1 space-y-1">
                      {exp.tasks.map((task, taskIndex) => (
                        <li
                          key={taskIndex}
                          className="text-xs md:text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                          {task};
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
                Softwares
              </h3>
              <div className="flex flex-wrap gap-3">
                {softwareList.map((software, index) => (
                  <div
                    key={index}
                    className="software-icon"
                    title={software.name}
                    style={{
                      backgroundColor: software.isIcon ? "#fff" : software.color,
                      color: software.isIcon ? "#000" : "#1a1a1a",
                    }}
                  >
                    {software.isIcon ? (
                      <i className="fab fa-blender text-xl" />
                    ) : (
                      software.abbr
                    )}
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
