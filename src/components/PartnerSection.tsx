import React, { useState, useRef } from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { SpawningThumbnail } from '../types';

const marqueeGifs = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif',
  'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
];

export default function PartnerSection() {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLDivElement>();
  const [thumbnails, setThumbnails] = useState<SpawningThumbnail[]>([]);
  const lastSpawnTime = useRef<number>(0);
  const spawnCounter = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mouse hover hover-spawn algorithm
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    // Spawning throttled at 80ms minimum interval to yield highly performant, dense trail without overloading FPS
    if (now - lastSpawnTime.current < 80) return;
    lastSpawnTime.current = now;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Local coordinates inside container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const randomIndex = Math.floor(Math.random() * marqueeGifs.length);
    const rotation = Math.random() * 20 - 10; // random rotation -10deg to +10deg
    const currentId = spawnCounter.current++;

    const newThumb: SpawningThumbnail = {
      id: currentId,
      x,
      y,
      url: marqueeGifs[randomIndex],
      rotation,
      scale: 1,
      opacity: 1,
    };

    setThumbnails((prev) => [...prev, newThumb]);

    // Async thread cleanup: filter out item after 1000ms to free JS memory
    setTimeout(() => {
      setThumbnails((prev) => prev.filter((t) => t.id !== currentId));
    }, 1000);
  };

  return (
    <section ref={sectionRef} className="w-full py-16 px-6 bg-transparent select-none">
      <div
        ref={(el) => {
          containerRef.current = el;
        }}
        onMouseMove={handleMouseMove}
        className="max-w-7xl mx-auto py-32 md:py-48 rounded-[40px] bg-white border border-neutral-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center relative overflow-hidden cursor-crosshair group"
      >
        {/* Hardware-accelerated CSS Keyframes for Spawning GIFs */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes spawnFadeOut {
            0% {
              transform: translate(-50%, -50%) scale(0.1) rotate(var(--rot));
              opacity: 0;
            }
            15% {
              transform: translate(-50%, -50%) scale(1) rotate(var(--rot));
              opacity: 0.95;
            }
            100% {
              transform: translate(-50%, -50%) scale(0.2) rotate(var(--rot));
              opacity: 0;
            }
          }
          .animate-spawn-thumb {
            animation: spawnFadeOut 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            pointer-events: none;
            position: absolute;
            width: 140px;
            height: 100px;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            z-index: 10;
          }
          @media (max-width: 768px) {
            .animate-spawn-thumb {
              width: 90px;
              height: 65px;
            }
          }
        `}} />

        {/* Dynamic spawning images render tray */}
        {thumbnails.map((thumb) => (
          <img
            key={thumb.id}
            src={thumb.url}
            style={{
              left: `${thumb.x}px`,
              top: `${thumb.y}px`,
              // Bind custom variable for rotation
              '--rot': `${thumb.rotation}deg`,
            } as React.CSSProperties}
            className="animate-spawn-thumb"
            alt="Spawning hover thumbnail"
            referrerPolicy="no-referrer"
          />
        ))}

        {/* Content Centered Stack */}
        <div className="z-20 relative px-6 flex flex-col items-center pointer-events-auto">
          <h2
            className={`font-mondwest text-[#0D212C] text-[48px] md:text-[64px] lg:text-[80px] leading-[1.0] tracking-tight mb-12 transition-all duration-1000 ${
              isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            Partner with us
          </h2>

          <a
            href="https://halaskastudio.com/./book"
            target="_blank"
            rel="noopener noreferrer"
            style={{ animationDelay: '0.2s' }}
            className={`inline-flex items-center gap-3 bg-[#051A24] text-white hover:bg-neutral-900 rounded-full pl-3.5 pr-8 py-3.5 transition-all duration-300 shadow-primary-btn active:scale-[0.98] ${
              isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            {/* Round Avatar visual inside CTA */}
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
              alt="Viktor Oddy profile avatar"
              className="w-10 h-10 rounded-full object-cover shadow-sm border border-white/20"
              referrerPolicy="no-referrer"
            />
            <span className="font-sans font-medium text-sm md:text-base text-[#F6FCFF]">
              Start chat with Viktor
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
