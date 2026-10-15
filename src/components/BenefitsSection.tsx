import { Check } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const benefits = [
  'Transforma visitas em pedidos',
  'Valoriza o seu trabalho sem precisar baixar o preço',
  'Encanta antes da primeira mordida',
  'Os seus doces merecem mais do que uma foto no WhatsApp',
  'Faz os seus clientes desejarem antes de provar'
];

export default function BenefitsSection() {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>();

  return (
    <section id="benefits" ref={ref} className="w-full py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2
          style={{ animationDelay: '0.1s' }}
          className={`text-[30px] md:text-[40px] lg:text-[44px] leading-[1.15] tracking-tight text-[#0D212C] max-w-2xl mb-10 transition-all duration-700 ${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          O que o seu site vai fazer por você,{' '}
          <span className="font-mondwest italic font-normal">todos os dias.</span>
        </h2>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-left">
          {benefits.map((benefit, index) => (
            <div
              key={benefit}
              style={{ animationDelay: `${0.15 + index * 0.05}s` }}
              className={`flex items-center gap-3 bg-white rounded-2xl border border-neutral-100 shadow-secondary-btn px-5 py-4 transition-all duration-700 ${
                isInView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
            >
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#051A24] text-[#F6FCFF]">
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              </span>
              <span className="text-sm md:text-base text-[#051A24] leading-snug">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
