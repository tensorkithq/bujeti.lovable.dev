import React from 'react';

const featuresData = [
  {
    title: 'Expense management',
    description: 'Organise transactions and enforce policies',
    href: 'https://bujeti.com/expense-management',
    imageUrl: 'https://framerusercontent.com/images/zfQutIyZ0z4niVsiYDOwLKuEoMI.png',
  },
  {
    title: 'Corporate cards',
    description: 'Flexible multi-currency cards for your teams',
    href: 'https://bujeti.com/corporate-card',
    imageUrl: 'https://framerusercontent.com/images/JNQY19SsIwqJFG9L1jrMnd5Q.png',
  },
  {
    title: 'Payments automation',
    description: 'Efficient payments with approval rules',
    href: 'https://bujeti.com/payments-automation',
    imageUrl: 'https://framerusercontent.com/images/5YitMupVXNGY9e01jluqYqmyXQ.png',
  },
  {
    title: 'Bank connect',
    description: 'Connect and manage bank accounts',
    href: 'https://bujeti.com/bank-connect',
    imageUrl: 'https://framerusercontent.com/images/D7fumEJXvQZLg6tAEVotiO4ywA.png',
  },
  {
    title: 'Invoicing',
    description: 'Create and send invoices in minutes',
    href: 'https://bujeti.com/invoicing',
    imageUrl: 'https://framerusercontent.com/images/Npttp9RiMGhGQ2IcMcBmxDpmPM.png',
  },
  {
    title: 'Payroll',
    description: 'Automated and intelligent payroll',
    href: '#', 
    imageUrl: 'https://framerusercontent.com/images/Zvl4qSl5c51gJ9ARVlCQ0eqRdM.png',
  },
];

const Features = () => {
  return (
    <section className="py-20 sm:py-16 bg-white text-black">
      <div className="container pt-12 mx-auto px-4">
        <div className="text-left py-6 mb-12 max-w-2xl">
          <p className="text-lg text-gray-700 uppercase">Products</p>
          <h2 className="text-6xl font-libre-baskerville mt-2 leading-tight tracking-tight">
            One platform, <em className="text-green-800 italic">more control</em> and complete visibility
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((feature, index) => (
            <a 
              key={index} 
              href={feature.href} 
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl shadow-[inset_0px_-0.5px_0px_0px_rgba(0,0,0,0.12),0px_1px_2px_-0.5px_rgba(0,0,0,0.06),0px_0px_0px_0.5px_rgba(48,48,48,0.16)] overflow-hidden bg-gray-50"
              style={{
                backgroundColor: 'rgb(243, 243, 243)',
              }}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={feature.imageUrl} 
                  alt={feature.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <div className="p-6 bg-white">
                <div className="flex justify-between items-center">
                  <h6 className="text-lg font-semibold text-gray-900">{feature.title}</h6>
                  <div className="w-6 h-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(22, 97, 20)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 