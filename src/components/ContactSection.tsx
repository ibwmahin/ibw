/**
 * ContactSection Component
 * 
 * Final section with "Obrigado!" message and social media links.
 * Features animated entrance and hover effects.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTwitter, faBehance, faYoutube, faLinkedin, faTiktok } from "@fortawesome/free-brands-svg-icons";

gsap.registerPlugin(ScrollTrigger);

/**
 * Social media links data
 */
const socialLinks = [
  {
    icon: faEnvelope,
    label: "faayzeffects12@gmail.com",
    href: "mailto:faayzeffects12@gmail.com",
  },
  {
    icon: faInstagram,
    label: "faayz.edit",
    href: "https://instagram.com/faayz.edit",
  },
  {
    icon: faTwitter,
    label: "faayzeddit",
    href: "https://twitter.com/faayzeddit",
  },
];

/**
 * Portfolio links
 */
const portfolioLinks = [
  { icon: faBehance, href: "#", label: "Behance" },
  { icon: faYoutube, href: "#", label: "YouTube" },
  { icon: faLinkedin, href: "#", label: "LinkedIn" },
  { icon: faTiktok, href: "#", label: "TikTok" },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: contentRef.current,
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
      id="contact"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background grid-pattern" />
      <div className="absolute inset-0 red-glow-bottom" />

      <div className="container relative z-10">
        <div ref={contentRef} className="text-center space-y-8">
          {/* Main Title */}
          <h2 className="font-heading text-7xl md:text-9xl lg:text-[10rem] font-bold text-foreground tracking-tight">
            Obrigado!
          </h2>

          {/* Subtitle */}
          <p className="text-muted-foreground text-xl md:text-2xl">
            Thank you!
          </p>

          {/* Contact Links */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 pt-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={link.icon as any}
                  className="text-xl text-primary group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-body text-sm md:text-base">
                  {link.label}
                </span>
              </a>
            ))}
          </div>

          {/* Portfolio Links */}
          <div className="flex justify-center gap-4 pt-8">
            {portfolioLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <FontAwesomeIcon icon={link.icon as any} />
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-16 border-t border-border mt-16">
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="font-heading font-bold text-primary-foreground text-xs">
                  RC
                </span>
              </div>
              <span>Edição de Vídeo | Portfólio</span>
            </div>
            <p className="text-muted-foreground/60 text-xs mt-4">
              © 2024 Rafael Costa. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
