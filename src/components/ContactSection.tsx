/**
 * ContactSection Component
 * 
 * Final section with contact form, "Thank You!" message and social links.
 * Features animated entrance and hover effects.
 * 
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { 
  faInstagram, 
  faTwitter, 
  faYoutube, 
  faLinkedin, 
  faTiktok,
  faFacebook,
  faGithub
} from "@fortawesome/free-brands-svg-icons";
import ContactForm from "./ContactForm";

gsap.registerPlugin(ScrollTrigger);

/**
 * Social media links data - All @ibwmahin
 */
const socialLinks = [
  {
    icon: faEnvelope,
    label: "ibwmahin@gmail.com",
    href: "mailto:ibwmahin@gmail.com",
  },
  {
    icon: faInstagram,
    label: "@ibwmahin",
    href: "https://instagram.com/ibwmahin",
  },
  {
    icon: faTwitter,
    label: "@ibwmahin",
    href: "https://twitter.com/ibwmahin",
  },
];

/**
 * Portfolio/Social links
 */
const portfolioLinks = [
  { icon: faYoutube, href: "https://youtube.com/@ibwmahin", label: "YouTube" },
  { icon: faLinkedin, href: "https://linkedin.com/in/ibwmahin", label: "LinkedIn" },
  { icon: faTiktok, href: "https://tiktok.com/@ibwmahin", label: "TikTok" },
  { icon: faFacebook, href: "https://facebook.com/ibwmahin", label: "Facebook" },
  { icon: faGithub, href: "https://github.com/ibwmahin", label: "GitHub" },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with bounce
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, scale: 0.5 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
          },
        }
      );

      // Content stagger animation
      const contentElements = contentRef.current?.children || [];
      gsap.fromTo(
        contentElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );

      // Links animation with scale
      const linkElements = linksRef.current?.children || [];
      gsap.fromTo(
        linkElements,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: linksRef.current,
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
      id="contact"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 red-glow-bottom" />
      <div className="absolute inset-0 red-glow-center opacity-30" />

      <div className="container relative z-10">
        <div className="text-center space-y-8">
          {/* Main Title */}
          <h2 
            ref={titleRef}
            className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold text-foreground tracking-tight glow-text"
          >
            Let's Work Together
          </h2>

          {/* Subtitle */}
          <p className="text-muted-foreground text-xl md:text-2xl">
            Have a project in mind? Get in touch!
          </p>

          {/* Contact Form */}
          <div ref={formRef} className="pt-8">
            <ContactForm />
          </div>

          {/* Or Divider */}
          <div className="flex items-center gap-4 max-w-lg mx-auto pt-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground text-sm">or reach out directly</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div ref={contentRef} className="space-y-8">
            {/* Contact Links */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 pt-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all duration-300 group magnetic-hover"
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={link.icon}
                    className="text-xl text-primary group-hover:scale-125 transition-transform duration-300"
                  />
                  <span className="font-body text-sm md:text-base">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Portfolio Links */}
            <div ref={linksRef} className="flex justify-center gap-4 pt-4">
              {portfolioLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-muted/50 hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-300 border border-border/50 hover:border-primary magnetic-hover"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <FontAwesomeIcon icon={link.icon} className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-16 border-t border-border/50 mt-16">
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center pulse-ring">
                <span className="font-heading font-bold text-primary-foreground text-sm">
                  AM
                </span>
              </div>
              <span>Abdulla Al Mahin | Video Editor</span>
            </div>
            <p className="text-muted-foreground/60 text-xs mt-4">
              © {new Date().getFullYear()} Abdulla Al Mahin (@ibwmahin). All rights reserved.
            </p>
            <p className="text-muted-foreground/40 text-xs mt-2">
              Based in Bangladesh 🇧🇩
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;