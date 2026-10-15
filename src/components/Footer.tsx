import { ArrowUpRight } from 'lucide-react';
import Button from './Button';

export default function Footer() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-transparent py-16 px-6 border-t border-neutral-100">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        {/* Left column - CTA */}
        <div className="flex flex-col items-start gap-4">
          <Button
            variant="primary"
            href="https://wa.me/5511988279130?text=ol%C3%A1%2C%20eu%20sou%20confeiteira%20e%20quero%20ter%20um%20site%20para%20valorizar%20o%20meu%20neg%C3%B3cio%2C%20quero%20saber%20mais"
            className="px-8 py-3.5 bg-[#051A24] text-[#F6FCFF] flex items-center gap-2 rounded-full"
          >
            Entre em contato
          </Button>
        </div>

        {/* Right column - Anchor / Social Links in Cols */}
        <div className="flex items-start gap-12 md:gap-24">
          {/* Section index columns */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleScroll('pricing')}
              className="text-base font-sans text-left text-[#051A24] hover:opacity-75 transition duration-200 cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => handleScroll('work')}
              className="text-base font-sans text-left text-[#051A24] hover:opacity-75 transition duration-200 cursor-pointer"
            >
              Work
            </button>
            <button
              onClick={() => handleScroll('about')}
              className="text-base font-sans text-left text-[#051A24] hover:opacity-75 transition duration-200 cursor-pointer"
            >
              About
            </button>
          </div>

          {/* Social column */}
          <div className="flex flex-col gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-sans text-[#051A24] hover:opacity-75 transition duration-200 flex items-center gap-1 group"
            >
              x.com
              <ArrowUpRight className="w-4 h-4 text-[#051A24]/40 group-hover:text-[#051A24]/100 transition duration-200" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-sans text-[#051A24] hover:opacity-75 transition duration-200 flex items-center gap-1 group"
            >
              LinkedIn
              <ArrowUpRight className="w-4 h-4 text-[#051A24]/40 group-hover:text-[#051A24]/100 transition duration-200" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
