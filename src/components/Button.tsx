import React from 'react';

interface ButtonProps {
  id?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  id,
  variant = 'primary',
  onClick,
  href,
  className = '',
  children,
}: ButtonProps) {
  const baseStyle =
    'inline-flex items-center justify-center font-medium transition-all duration-300 text-sm md:text-base cursor-pointer select-none rounded-full ';

  const variants = {
    primary:
      'bg-[#051A24] text-[#F6FCFF] px-7 py-3.5 shadow-primary-btn hover:opacity-95 active:scale-[0.98] border border-transparent',
    secondary:
      'bg-white text-[#051A24] px-7 py-3.5 border-0 shadow-secondary-btn hover:bg-[#F6FCFF]/50 active:scale-[0.98]',
    tertiary:
      'bg-white text-[#051A24] px-7 py-3.5 shadow-primary-btn hover:bg-[#F6FCFF]/50 active:scale-[0.98] border border-transparent',
  };

  const combinedClass = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        id={id}
        href={href}
        className={combinedClass}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button id={id} onClick={onClick} className={combinedClass}>
      {children}
    </button>
  );
}
