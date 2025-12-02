/**
 * PortfolioNav Component
 *
 * Minimal navigation with smooth scroll to sections.
 * Fixed position with glass morphism effect.
 *
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";

/**
 * Navigation links
 */
const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Editing", href: "#video-editing" },
  { label: "Motion", href: "#motion-graphics" },
  { label: "Contact", href: "#contact" },
];

const PortfolioNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initial logo animation
    gsap.fromTo(
      logoRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out" }
    );

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo(
        ".mobile-nav-link",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${
            isScrolled
              ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/20"
              : "bg-transparent"
          }`}
      >
        <div className="container py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => handleNavClick(e, "#")}
              className="flex items-center gap-3 group"
            >
              <div
                ref={logoRef}
                className="w-10 h-10  rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              >
                <img src="/favicon.png" alt="logo" className="w-8 h-8" />
              </div>
              <div className="hidden sm:block">
                <span className="font-heading font-semibold text-foreground block leading-tight">
                  Abdulla Al Mahin
                </span>
                <span className="text-xs text-muted-foreground">@ibwmahin</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative text-muted-foreground hover:text-foreground transition-colors duration-300 text-base font-semibold group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-foreground rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faTimes : faBars}
                className="text-xl"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background/98 backdrop-blur-xl transition-all duration-500 md:hidden
          ${
            isMobileMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="mobile-nav-link font-heading text-4xl font-bold text-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}

          {/* Social links in mobile menu */}
          <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border/50">
            <span className="text-muted-foreground text-sm">@ibwmahin</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioNav;
