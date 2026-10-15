import Button from './Button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

export default function PricingSection() {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>();

  return (
    <section
      id="pricing"
      ref={ref}
      className="w-full py-16 md:py-20 px-6 bg-transparent"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Right-aligned content wrapper for desktop */}
        <div className="w-full md:max-w-4xl md:ml-auto grid grid-cols-1 md:grid-cols-2 gap-8 justify-end">
          
          

          {/* Card 2 - Light Project Plan */}
          <div
            style={{ animationDelay: '0.2s' }}
            className={`bg-white rounded-[40px] pl-10 pr-10 md:pr-20 pt-8 pb-10 shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-neutral-100 flex flex-col justify-between transition-all duration-700 hover:scale-[1.01] ${
              isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <div>
              <h3 className="text-[22px] font-medium text-[#0D212C] font-sans mb-3">
                O que você vai ter:
              </h3>
              <p className="text-sm md:text-base text-[#273C46] leading-relaxed mb-10 font-sans">
                ✓ Sem mensalidades <br />
                ✓ Pagamento único <br />
                ✓ Vitrine profissional <br />
                ✓ Pedidos com facilidade <br />
                ✓ Seu cardápio online 24h
              </p>
            </div>

            <div>
              <div className="mb-0 pt-0">
                <div className="mb-8">
                  <span className="text-xs md:text-sm uppercase tracking-wider text-[#273C46]/70 font-mono mt-1 block">
                  <br /> de <del>R$ 1.2000</del> <br /><br />
                  </span>
                  <span className="text-3xl md:text-4xl font-semibold text-[#0D212C] block">
                    
                    12x de R$31,36
                  </span>
                  <span className="text-xs md:text-sm uppercase tracking-wider text-[#273C46]/70 font-mono mt-1 block">
                  
                    ou R$297,00 à vista
                  </span>
                </div>

                <Button
                  variant="tertiary"
                  href="https://wa.me/5511988279130?text=ol%C3%A1%2C%20eu%20sou%20confeiteira%20e%20quero%20ter%20um%20site%20para%20valorizar%20o%20meu%20neg%C3%B3cio%2C%20quero%20saber%20mais"
                  className="w-full text-center py-3.5 bg-white text-[#051A24]"
                >
                  Entre em contato
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
