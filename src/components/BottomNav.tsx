import Button from './Button';

export default function BottomNav() {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    </>
    // <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md rounded-full pl-6 pr-2 py-1.5 flex items-center justify-between gap-8 shadow-primary-btn border border-neutral-200/40 select-none max-w-[90vw]">
    //   {/* Brand logo letter */}
    //   <button
    //     onClick={handleLogoClick}
    //     aria-label="Scroll to top"
    //     className="font-mondwest text-2xl font-semibold text-[#051A24] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
    //   >
    //     V
    //   </button>

    //   {/* Mini primary button */}
    //   <Button
    //     variant="primary"
    //     href="#"
    //     className="text-xs md:text-sm px-5 py-2"
    //   >
        
    //   </Button>
    // </div>
  );
}
