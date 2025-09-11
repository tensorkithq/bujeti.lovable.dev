import React from 'react';
import ElectricBorder from './ElectricBorder';

interface PricingPlan {
  name: string;
  price: string;
  priceDetails?: string;
  description: string;
  features: string[];
  buttonText: string;
  featured: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  const cardContent = (
    <div className={`flex flex-col aspect-[0.7372] w-[390px] flex-shrink-0 cursor-pointer snap-center rounded-[24px] border p-[28px] pb-[25px] text-white transition-all duration-200 lg:mr-12 md:w-[366px] sm:mr-5 sm:w-[91%] sm:max-w-[366px] sm:p-[18px] xs:w-[288px] ${plan.featured ? 'bg-[rgb(13_15_17/40%)] shadow-[4px_6px_25px_rgba(0,0,0,0.56)] border-[rgba(255,255,255,0.1)]' : 'border-[rgba(255,255,255,0.05)]'}`}>
      <h3 className="text-xl font-semibold leading-snug tracking-tight sm:text-lg">{plan.name}</h3>
      <p className="mt-2.5 leading-snug">
        <span className="text-6xl font-semibold tracking-tight lg:text-5xl md:text-4xl sm:text-3xl">{plan.price}</span>
        {plan.priceDetails && <span className="ml-1 text-xl font-medium tracking-tight text-gray-400 sm:text-base">{plan.priceDetails}</span>}
        <span className="ml-1 text-xl font-medium tracking-tight text-gray-400 sm:text-base">/monthly</span>
      </p>
      <p className="mt-1 pr-3 text-lg leading-snug -tracking-[0.03em] md:mt-0 sm:pr-0 sm:text-base">{plan.description}</p>
      <span className="mt-[18px] block h-px bg-[rgba(255,255,255,0.10)] sm:mt-4" aria-hidden="true"></span>
      <ul className="mt-6 flex flex-col gap-y-4 lg:mt-8 md:mt-7 sm:mt-4 sm:gap-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-x-2 text-lg leading-none tracking-snugger text-white/90 sm:gap-x-1.5 sm:whitespace-nowrap sm:text-base sm:tracking-tight">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="16" height="16">
              <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.829" d="m13.33 4-7.333 7.333L2.664 8"></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <a className={`transition-colors duration-200 uppercase font-bold flex items-center justify-center h-14 w-full text-lg tracking-snugger rounded-full border transition-all hover:border-white/50 mt-auto font-semibold capitalize hover:bg-opacity-85 sm:!h-10 sm:!text-base ${plan.featured ? 'bg-white !text-black border-transparent' : 'border-white/20'}`} href="/login">
        {plan.buttonText}
      </a>
    </div>
  );

  if (plan.featured) {
    return (
      <div className="item relative mr-14 flex flex-col">
        <ElectricBorder
          color="#7df9ff"
          speed={1}
          chaos={0.5}
          thickness={2}
          style={{ borderRadius: 24 }}
        >
          {cardContent}
        </ElectricBorder>
      </div>
    );
  }

  return (
    <div className="item relative mr-14 flex flex-col">
      {cardContent}
    </div>
  );
};

export default PricingCard;