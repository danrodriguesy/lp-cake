import { useEffect, useState } from 'react';
import Button from './components/Button';
import BenefitsSection from './components/BenefitsSection';
import TestimonialSection from './components/TestimonialSection';
import PricingSection from './components/PricingSection';
import TestimonialCarousel from './components/TestimonialCarousel';
import ProjectsSection from './components/ProjectsSection';
import PartnerSection from './components/PartnerSection';
import Footer from './components/Footer';
import CopyrightBar from './components/CopyrightBar';
import BottomNav from './components/BottomNav';

const marqueeGifs = [
  'assets/imagens/1.png',
  'assets/imagens/2.png',
  'assets/imagens/3.png',
  'assets/imagens/4.png',
  'assets/imagens/5.png',
];

// Combine regular stream with duplicate set for horizontal seamless loop
const duplicatedMarqueeGifs = [...marqueeGifs, ...marqueeGifs];

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScrollView = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative min-h-screen bg-white text-[#051A24] overflow-x-hidden select-none pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="w-full flex justify-center text-center px-6 pt-16 md:pt-24 pb-8">
        <div className="w-full max-w-[440px] flex flex-col items-center">
          
          {/* Logo Name */}
          {/* <h1
            style={{ animationDelay: '0.1s' }}
            className={`font-mondwest text-[32px] md:text-[40px] lg:text-[44px] font-semibold text-[#051A24] tracking-tight mb-4 transition-all duration-1000 ${
              mounted ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            Dan Rodrigues
          </h1> */}

          {/* Tagline */}
          {/* <p
            style={{ animationDelay: '0.2s' }}
            className={`font-mono text-xs md:text-sm text-[#051A24] uppercase tracking-wider mb-2 transition-all duration-1000 ${
              mounted ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            O estúdio criativo de Dan Rodrigues
          </p> */}

          {/* Core display heading lines */}
          <div
            style={{ animationDelay: '0.3s' }}
            className={`flex flex-col gap-1 tracking-tight text-[#0D212C] text-[clamp(26px,7vw,44px)] leading-[1.1] text-balance transition-all duration-1000 ${
              mounted ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <span className="block">
              Assuma a postura <span className="font-mondwest italic font-normal">da confeitaria</span>
            </span>
            <span className="block">
              que <span className="font-mondwest italic font-normal">o mercado admira.</span>
            </span>
          </div>

          {/* Studio Profile Descriptions */}
          <div
            style={{ animationDelay: '0.4s' }}
            className={`flex flex-col gap-6 text-sm md:text-base text-[#051A24] leading-relaxed mt-6 transition-all duration-1000 ${
              mounted ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <p>
              Sites que transformam confeiteiras iniciantes em marcas que ninguém esquece.
            </p>
            {/* <p>
              The studio is deliberately small. I guide the creative vision on every project,
              backed by a veteran design crew that moves fast without cutting corners.
            </p> */}
            {/* <p className="font-semibold text-neutral-900 mt-1">
              Site Premium para confeiteira 12x de R$ 31,36 
            </p> */}
          </div>

          {/* Action buttons list */}
          <div
            style={{ animationDelay: '0.5s' }}
            className={`flex flex-col sm:flex-row gap-4 w-full justify-center mt-8 transition-all duration-1000 ${
              mounted ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <Button
              variant="primary"
              href="https://wa.me/5511988279130?text=ol%C3%A1%2C%20eu%20sou%20confeiteira%20e%20quero%20ter%20um%20site%20para%20valorizar%20o%20meu%20neg%C3%B3cio%2C%20quero%20saber%20mais"
              className="px-8 py-3 text-sm md:text-base text-center"
            >
              Quero ter o meu site
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleScrollView('work')}
              className="px-8 py-3 text-sm md:text-base text-center"
            >
              Ver projetos
            </Button>
          </div>

        </div>
      </section>

      {/* 2. INFINITE MARQUEE */}
      <section className="w-full mt-16 md:mt-20 mb-16 overflow-hidden relative">
        <div className="animate-marquee">
          {duplicatedMarqueeGifs.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="h-[280px] md:h-[500px] w-[210px] md:w-[375px] mx-3 rounded-2xl shadow-lg border border-neutral-100 overflow-hidden flex-shrink-0 relative"
            >
              <img
                src={url}
                alt="Studio cinematic portfolio animation showcase background"
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 3. BENEFITS SECTION */}
      <BenefitsSection />

      {/* 4. TESTIMONIAL QUOTE SECTION */}
      <TestimonialSection />

      {/* 5. PRICING SECTION */}
      <PricingSection />

      {/* 6. TESTIMONIAL CAROUSEL */}
      {/* <TestimonialCarousel /> */}

      {/* 7. PROJECTS SECTION */}
      <ProjectsSection />

      {/* 8. PARTNER SECTION */}
      {/* <PartnerSection /> */}

      {/* 9. FOOTER */}
      {/* <Footer /> */}

      {/* 10. COPYRIGHT BAR */}
      <CopyrightBar />

      {/* 11. FIXED BOTTOM NAV */}
      <BottomNav />

    </div>
  );
}
