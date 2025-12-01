/**
 * ScrollToTop Component
 * 
 * Animated scroll-to-top button that appears when scrolled down.
 * Features smooth scroll and entrance animation.
 * 
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 400;
      setIsVisible(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate visibility
  useEffect(() => {
    if (buttonRef.current) {
      if (isVisible) {
        gsap.fromTo(
          buttonRef.current,
          { scale: 0, opacity: 0, rotation: -180 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.4, ease: "back.out(1.7)" }
        );
      } else {
        gsap.to(buttonRef.current, {
          scale: 0,
          opacity: 0,
          rotation: 180,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isVisible]);

  // Bounce animation when visible
  useEffect(() => {
    if (isVisible && buttonRef.current) {
      const bounceAnim = gsap.to(buttonRef.current.querySelector(".arrow-icon"), {
        y: -4,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      return () => {
        bounceAnim.kill();
      };
    }
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-6 right-24 w-12 h-12 rounded-full bg-secondary text-foreground flex items-center justify-center z-40 hover:bg-primary hover:text-primary-foreground transition-colors duration-300 border border-border/50 hover:border-primary"
      style={{
        boxShadow: "0 0 20px hsl(var(--background) / 0.5)",
        opacity: 0,
        transform: "scale(0)",
      }}
      aria-label="Scroll to top"
    >
      <FontAwesomeIcon icon={faArrowUp} className="arrow-icon text-lg" />
    </button>
  );
};

export default ScrollToTop;