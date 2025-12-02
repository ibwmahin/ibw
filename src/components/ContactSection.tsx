/**
 * ContactSection Component
 *
 * Modern minimal contact section with form and social links.
 * Features clean design that blends with portfolio aesthetic.
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
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import ContactForm from "./ContactForm";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    icon: faInstagram,
    href: "https://instagram.com/ibwmahin",
    label: "Instagram",
  },
  { icon: faTwitter, href: "https://twitter.com/ibwmahin", label: "Twitter" },
  { icon: faYoutube, href: "https://youtube.com/@ibwmahin", label: "YouTube" },
  {
    icon: faLinkedin,
    href: "https://linkedin.com/in/ibwmahin",
    label: "LinkedIn",
  },
  { icon: faTiktok, href: "https://tiktok.com/@ibwmahin", label: "TikTok" },
  {
    icon: faFacebook,
    href: "https://facebook.com/ibwmahin",
    label: "Facebook",
  },
  { icon: faGithub, href: "https://github.com/ibwmahin", label: "GitHub" },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
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
      <div className="absolute inset-0 red-glow-center opacity-20" />

      <div className="container relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-heading text-5xl md:text-7xl font-bold text-foreground tracking-tight mb-4"
          >
            Let's Talk
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl">
            Ready to elevate your content? Drop me a message.
          </p>
        </div>

        {/* Content Grid */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start"
        >
          {/* Left: Contact Form */}
          <div className="md:col-span-2 bg-card/30 border border-border/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <ContactForm />
          </div>

          {/* Right: Contact Info */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="font-heading text-xl font-bold text-foreground">
                Contact Details
              </h3>
              <a
                href="mailto:ibwmahin@gmail.com"
                className="flex items-center gap-4 group"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-primary text-lg"
                />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  ibwmahin@gmail.com
                </span>
              </a>
              <div className="space-y-2 text-sm text-muted-foreground pt-2">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Available for projects
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Based in Bangladesh
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-heading text-xl font-bold text-foreground">
                Find Me Online
              </h3>
              <div className="space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group hover-lift p-2 rounded-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={link.icon}
                      className="w-5 text-lg text-primary/70 group-hover:text-primary transition-colors"
                    />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 pt-12 border-t border-border/20">
          <p className="text-muted-foreground/60 text-sm">
            © {new Date().getFullYear()} Abdulla Al Mahin (@ibwmahin). All
            rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
