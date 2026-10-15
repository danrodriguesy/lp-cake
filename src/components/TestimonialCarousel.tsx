import { useState, useEffect, useRef, useTransition } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../types';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Marcus Anderson',
    role: 'CEO',
    company: 'Data.storage',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    quote: 'With very little guidance team delivered designs that were consistently spot on. Viktor brings exceptional product design leadership.',
  },
  {
    id: 2,
    name: 'alexwu',
    role: 'Founder',
    company: 'Nexgate',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
    quote: 'Viktor led the creation of our best fundraising deck to date! The pacing, the visual alignment, and the attention to detail is world class.',
  },
  {
    id: 3,
    name: 'James Mitchell',
    role: 'VP Product',
    company: 'LaunchPad',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
    quote: 'Working with Viktor transformed our product vision. He has an Apple-grade ability to prune complexity down to functional beauty.',
  },
  {
    id: 4,
    name: 'Rachel Foster',
    role: 'Co-founder',
    company: 'Nexus Labs',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    quote: 'The design quality exceeded our expectations. The communication was pristine, and their design templates changed how we prototype.',
  },
  {
    id: 5,
    name: 'David Zhang',
    role: 'Head of Design',
    company: 'Paradigm Labs',
    avatar: 'https://images.pexels.com/photos/2287252/pexels-photo-2287252.jpeg?auto=compress&cs=tinysrgb&w=300',
    quote: 'Incredible work from start to finish. They build screens that feel tactile and responsive, holding themselves to an incredibly high standard.',
  },
];

// Tripled roster for infinite seamless wrap scrolling
const tripledRoster = [...testimonialsData, ...testimonialsData, ...testimonialsData];

export default function TestimonialCarousel() {
  const { ref: sectionAnimateRef, isInView } = useInViewAnimation<HTMLElement>();
  const [currentIndex, setCurrentIndex] = useState(5); // start in middle block
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [cardWidth, setCardWidth] = useState(427.5);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Responsive layout tracking
  useEffect(() => {
    const handleResize = () => {
      const mobileStatus = window.innerWidth < 768;
      setIsMobile(mobileStatus);
      if (mobileStatus) {
        setCardWidth(window.innerWidth - 48);
      } else {
        setCardWidth(427.5);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Infinite carousel wrap jump helper
  const handleIndexJump = (target: number) => {
    setTransitionEnabled(false);
    setCurrentIndex(target);
    setTimeout(() => {
      setTransitionEnabled(true);
    }, 50);
  };

  // Navigations
  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // Check bounds and wrap
  useEffect(() => {
    if (currentIndex < 5) {
      // If we go left into first set, jump to third set core
      const timer = setTimeout(() => {
        handleIndexJump(currentIndex + 5);
      }, 820); // wait for transition
      return () => clearTimeout(timer);
    }
    if (currentIndex >= 10) {
      // If we go right into third set, jump to first set core
      const timer = setTimeout(() => {
        handleIndexJump(currentIndex - 5);
      }, 820);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // Autoplay interval
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, currentIndex]);

  const gap = 24; // gap-6 is 24px

  // Calculate slide offset to center the active item in the carousel viewport
  const getTranslateX = () => {
    const paddingOffset = isMobile ? 24 : (window.innerWidth - cardWidth) / 2;
    return `calc(-${currentIndex} * (${cardWidth}px + ${gap}px) + ${paddingOffset}px)`;
  };

  return (
    <section
      id="testimonials"
      ref={sectionAnimateRef}
      className="w-full py-20 overflow-hidden bg-transparent select-none"
    >
      <div className="max-w-7xl mx-auto px-6 mb-12">
        {/* Header Block alignment */}
        <div className="w-full md:max-w-4xl md:ml-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-2 border-b border-neutral-100">
          <div
            className={`transition-all duration-700 ${
              isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <h2 className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] tracking-tight font-sans font-semibold text-[#0D212C]">
              What <span className="font-mondwest">builders</span> say
            </h2>
          </div>

          <div
            style={{ animationDelay: '0.1s' }}
            className={`flex items-center gap-3 transition-all duration-700 ${
              isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-black fill-black" />
              ))}
            </div>
            <span className="text-sm font-semibold font-sans text-neutral-950 uppercase tracking-wider block">
              Clutch 5/5
            </span>
          </div>
        </div>
      </div>

      {/* Carousel Track & Window */}
      <div
        className="w-full relative py-6 cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            transform: `translateX(${getTranslateX()})`,
            transition: transitionEnabled
              ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              : 'none',
          }}
          className="flex whitespace-nowrap"
        >
          {tripledRoster.map((item, index) => {
            const isCenterOfFocus = index === currentIndex;
            return (
              <div
                key={`${item.id}-${index}`}
                style={{
                  width: `${cardWidth}px`,
                  transition: 'opacity 0.8s ease, transform 0.8s ease',
                  opacity: isCenterOfFocus ? 1 : 0.4,
                  transform: isCenterOfFocus ? 'scale(1)' : 'scale(0.96)',
                }}
                className="flex-shrink-0 mx-3 bg-white rounded-[32px] md:rounded-[40px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-neutral-100 p-8 md:pl-10 md:pr-12 md:py-10 flex flex-col justify-between"
              >
                {/* Custom Vector Svg Quote Icon */}
                <div className="mb-6">
                  <svg
                    className="w-8 h-8 text-[#0D212C]/20"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.2 1.8-4 4-4V8z" />
                  </svg>
                </div>

                {/* Quote Text */}
                <p className="text-sm md:text-[16px] text-[#0D212C] leading-relaxed mb-8 whitespace-normal text-left font-sans">
                  "{item.quote}"
                </p>

                {/* Author Block */}
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover shadow-sm grayscale hover:grayscale-0 transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-sm text-[#0D212C]">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#273C46] mt-0.5">
                      <span className="font-sans text-[#273C46]/50 mr-1">&#8594;</span>{' '}
                      {item.role}, {item.company}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Button Handlers */}
      <div className="max-w-7xl mx-auto px-6 flex justify-end gap-4 mt-6">
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="w-12 h-12 rounded-full border border-[#0D212C]/20 hover:border-[#0D212C] hover:bg-[#0D212C]/5 flex items-center justify-center transition-all duration-300 cursor-pointer text-[#0D212C]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="w-12 h-12 rounded-full border border-[#0D212C]/20 hover:border-[#0D212C] hover:bg-[#0D212C]/5 flex items-center justify-center transition-all duration-300 cursor-pointer text-[#0D212C]"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
