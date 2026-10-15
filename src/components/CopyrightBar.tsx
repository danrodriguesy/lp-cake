export default function CopyrightBar() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-6 border-t border-neutral-100 flex flex-row justify-between items-center text-sm font-sans text-[#051A24]">
      <span>© {currentYear} Dan Rodrigues</span>
      <span>São Paulo, SP</span>
    </div>
  );
}