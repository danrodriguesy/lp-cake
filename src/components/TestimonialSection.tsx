import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

export default function TestimonialSection() {
  const { ref: animateRef, isInView } = useInViewAnimation<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [yOffset, setYOffset] = useState(0);

  // High-performance scroll parallax animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const handleScroll = () => {
      if (!isVisible) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      
      // Calculate scroll progress percentage relative to screen center
      const progress = Math.max(-1, Math.min(1, distanceFromCenter / (windowHeight / 2)));
      
      // Set offset, capped around max 100px up or down (total range 200px)
      const targetOffset = progress * 100;
      
      animationFrameId = requestAnimationFrame(() => {
        setYOffset(targetOffset);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="about"
      ref={(el) => {
        animateRef.current = el;
        containerRef.current = el;
      }}
      className="py-16 md:py-24 px-6 max-w-4xl mx-auto flex flex-col items-center text-center select-none"
    >
      {/* Quote Icon */}
      <div
        style={{ animationDelay: '0.1s' }}
        className={`mb-6 transition-all duration-700 ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <Quote className="w-8 h-8 text-neutral-800" />
      </div>

      {/* Quote Text */}
      <h2
        style={{ animationDelay: '0.2s' }}
        className={`text-[30px] md:text-[40px] lg:text-[44px] leading-[1.15] text-[#0D212C] tracking-tight max-w-2xl mb-6 transition-all duration-700 ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        {' '}
        <span className="font-mondwest"></span>{' '}
        Quem vende por mensagem disputa preço, quem tem um site profissional vende mais bolos.
      </h2>

      {/* Author Name */}
      <span
        style={{ animationDelay: '0.3s' }}
        className={`text-sm md:text-base italic text-[#273C46] mb-12 block transition-all duration-700 ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        {/* Dan Rodrigues */}
      </span>

      {/* Logo Typography Row */}
      {/* <div
        style={{ animationDelay: '0.4s' }}
        className={`flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mb-16 max-w-md transition-all duration-700 ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <span style={{ width: '80px' }} className="text-[24px] font-medium text-slate-900 font-sans tracking-tight block">
          Apple
        </span>
        <span style={{ width: '83px' }} className="text-[24px] font-medium text-slate-900 font-sans tracking-tight block">
          IDEO
        </span>
        <span style={{ width: '110px' }} className="text-[24px] font-medium text-slate-900 font-sans tracking-tight block">
          Polygon
        </span>
      </div> */}

      {/* Scroll Parallax Image Block */}
      <div
        style={{ animationDelay: '0.5s' }}
        className={`w-full flex justify-center overflow-hidden rounded-2xl transition-all duration-700 max-w-xs shadow-lg relative ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <div
          style={{
            transform: `translateY(${yOffset * 0.4}px) scale(1.15)`,
            transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="w-full aspect-[4/5] relative overflow-hidden"
        >
          <img
            src="/imagens/confenteira.jpg"
            alt="Chris Halaska testimonial author portrait"
            className="w-full h-full object-cover rounded-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
}
