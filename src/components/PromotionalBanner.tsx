/**
 * PromotionalBanner Component
 * 
 * Displays promotional offers with animated text effects.
 * Features gradient backgrounds and hover interactions.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Promotional offers data
 */
const promotions = [
  {
    id: 1,
    title: "PARA VOCÊ",
    subtitle: "For You",
    description: "Pacotes especiais para criadores de conteúdo",
    gradient: "from-primary/80 to-primary/40",
  },
  {
    id: 2,
    title: "PRIMEIRA COMPRA",
    subtitle: "First Purchase",
    description: "Desconto exclusivo na primeira edição",
    gradient: "from-primary/60 to-primary/20",
  },
  {
    id: 3,
    title: "POR TEMPO LIMITADO",
    subtitle: "Limited Time",
    description: "Ofertas especiais por tempo limitado",
    gradient: "from-yellow-500/60 to-yellow-600/20",
  },
];

const PromotionalBanner = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 50, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
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
      className="relative py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background grid-pattern" />

      <div className="container relative z-10">
        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className={`relative p-8 rounded-xl overflow-hidden cursor-pointer group
                bg-gradient-to-br ${promo.gradient}
                transform transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
            >
              {/* Content */}
              <div className="relative z-10">
                <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground italic tracking-tight">
                  {promo.title}
                </h3>
                <p className="text-foreground/70 text-sm mt-1">
                  {promo.subtitle}
                </p>
                <p className="text-foreground/60 text-xs mt-4">
                  {promo.description}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-foreground/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-foreground/20 group-hover:bg-foreground/40 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;
