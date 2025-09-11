import React from 'react';
import PricingCard from '@/components/PricingCard';

const ManifestoText = () => {
  return (
    <div className="relative overflow-hidden pb-[450px] pt-[212px] lg:pb-[400px] lg:pt-[168px] md:pt-[145px] sm:pt-[109px]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-3xl font-medium leading-relaxed text-white lg:text-2xl md:text-xl sm:text-lg">
          <p>
            The Bujeti team prioritizes open software, ensuring Bujeti remains free. To sustain cloud operations and further development, cloud users will be charged for consumed cloud resources. These resources currently fall into three categories: storage, network and compute.
          </p>
          <div className="my-16 lg:my-14 md:my-12 sm:my-8"></div>
          <p>
            Storage charges depend on data size, excluding Bujeti objects but including attachments. Users can have unlimited Bujeti objects without storage limitations, but documents, images and videos are counted based on the plan.
          </p>
          <div className="my-16 lg:my-14 md:my-12 sm:my-8"></div>
          <p>
            Network charges apply only to audio and video calls.
          </p>
          <div className="my-16 lg:my-14 md:my-12 sm:my-8"></div>
          <p>
            Compute resource charges will apply to the upcoming <span className="bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-400 bg-clip-text text-transparent">Bujeti AI and Bujeti MetaBrain</span> features, with costs assured to be no higher than industry leaders like OpenAI. Users can pay for these services directly via their OpenAI accounts.
          </p>
        </div>
      </div>
    </div>
  );
};



const pricingPlans = [
    {
      name: 'Common',
      price: '$0',
      description: 'For individuals and teams getting started with Bujeti.',
      features: [
        'Unlimited users',
        'Unlimited Bujeti Objects',
        '10GB Storage per Workspace',
        '10GB Video/Audio Traffic',
        'AI — TBD',
      ],
      buttonText: 'Start Free',
      featured: true,
    },
    {
      name: 'Rare',
      price: '$19',
      priceDetails: '.99',
      description: 'For individual creatives, freelancers, and micro-agencies.',
      features: [
        'Unlimited users',
        'Unlimited Bujeti Objects',
        '100GB Storage',
        '100GB Video / Audio Traffic',
        'AI — TBD',
      ],
      buttonText: 'Start Free',
      featured: false,
    },
    {
        name: 'Epic',
        price: '$99',
        priceDetails: '.99',
        description: 'For professional creative companies and small businesses.',
        features: [
          'Unlimited users',
          'Unlimited Bujeti Objects',
          '1TB Storage',
          '500GB Video / Audio Traffic',
          'AI — TBD',
        ],
        buttonText: 'Start Free',
        featured: false,
      },
      {
        name: 'Legendary',
        price: '$399',
        priceDetails: '.99',
        description: 'Best for large multiple teams that need maximum capabilities.',
        features: [
          'Unlimited users',
          'Unlimited Bujeti Objects',
          '10TB Storage',
          '2TB Video / Audio Traffic',
          'AI — TBD',
        ],
        buttonText: 'Start Free',
        featured: false,
      },
  ];

const PricingWithManifesto = () => {
    return (
      <div className="bg-[#0D0F11]">
        <ManifestoText />
        <div className="safe-paddings relative left-1/2 z-10 -my-52 -ml-[50vw] w-screen [mask-image:linear-gradient(270deg,rgba(115,115,115,0.00)_9.82%,#D9D9D9_30.43%,#D9D9D9_78.87%,rgba(217,217,217,0.00)_99.54%)] sm:[mask-image:none]">
            <div className="max-w-7xl mx-auto relative">
                <h2 className="sr-only">Bujeti pricing plans</h2>
                <div className="relative xs:px-5">
                    <div className="no-scrollbars -mx-[calc((100vw-100%)/2)] flex snap-x snap-mandatory overflow-x-auto px-[calc((100vw-100%)/2)] py-[320px] xs:px-[calc((100vw-122%)/2)]">
                        <div className="flex w-max flex-shrink-0">
                            {pricingPlans.map(plan => <PricingCard key={plan.name} plan={plan} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-white text-center text-3xl font-medium leading-relaxed max-w-4xl mx-auto px-4 pb-20">
            <p>
                Our Custom Plan is tailored to meet your unique needs and requirements. Get specific features, extra storage, or enhanced support. Flexible pricing based on your specifications.
            </p>
            <div className="my-16 lg:my-14 md:my-12 sm:my-8"></div>
            <p>
                Ready to discuss your needs and get a personalized quote?
            </p>
            <div className="mt-8">
                <a href="mailto:hey@bujeti.com" className="text-accent hover:underline">
                    Contact us
                </a>
            </div>
        </div>
      </div>
    );
  };
  
  export default PricingWithManifesto; 