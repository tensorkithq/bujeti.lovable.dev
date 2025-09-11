import React, { useRef } from 'react';
import LaserFlow from '../components/LaserFlow';
import { Button } from '@/components/ui/button';

const HeroContent = () => {
  return (
    <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between h-full max-w-7xl mx-auto px-6">
      {/* Left Content */}
      <div className="flex flex-col justify-center lg:w-1/2 pt-32 pb-16">
        <div className="space-y-8">
          {/* Headlines */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Control your business finances,{' '}
              <span className="text-accent">all in one place</span>
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed max-w-lg">
              Track expenses, reimbursements, and invoices for financial efficiency on Africa's most loved spend management platform
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-4 text-lg"
            >
              Try for free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent font-semibold px-8 py-4 text-lg"
            >
              Book a demo
            </Button>
          </div>
        </div>
      </div>

      {/* Right Mockup */}
      <div className="lg:w-1/2 flex items-center justify-center relative h-full">
        <div className="relative w-full max-w-2xl aspect-[4/3] flex items-center justify-center">
          <div className="relative w-full h-full">
            <svg 
              className="absolute top-0 left-0 w-full pointer-events-none"
              style={{ 
                filter: 'blur(80px)', 
                opacity: 0.8,
                height: '250px'
              }}
              viewBox="0 0 1200 50"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="curveGradient" x1="10%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(159, 255, 89, 0.6)" />
                  <stop offset="30%" stopColor="rgba(158, 255, 89, 0.71)" />
                  <stop offset="70%" stopColor="rgba(158, 255, 89, 0.5)" />
                  <stop offset="100%" stopColor="rgba(158, 255, 89, 0.29)" />
                </linearGradient>
              </defs>
              <path
                d="M0,0 C0,20 0,20 0,40 Q300,80 600,40 T1200,60 C1200,40 1200,20 1200,0 Q900,10 600,5 T0,0 Z"
                fill="url(#curveGradient)"
              />
            </svg>
            
            <div 
              className="relative flex w-full justify-center items-center overflow-hidden rounded-2xl ring-1 ring-accent/40 ring-inset"
              style={{ aspectRatio: '4/3' }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-2xl border border-accent/20">
                <div className="relative w-full h-full bg-background overflow-hidden">
                  <img 
                    src="/bujeti-mockup.png" 
                    alt="Bujeti App Interface"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCaption = () => {
  const features = [
    'Expense management',
    'Corporate Cards', 
    'Payment automation',
    'Bank Connect',
    'Invoicing',
    'Payroll'
  ];

  return (
    <div className="relative z-10 bg-background/50 backdrop-blur-sm border-t border-accent/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center space-y-8">
          {/* Caption Title */}
          <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
            One platform, <em className="text-accent font-normal">more control</em> and complete visibility
          </h2>
          
          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-medium hover:bg-accent/20 transition-colors duration-200"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HeroBlock() {
  const revealImgRef = useRef(null);

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Main Hero Area with LaserFlow Background */}
      <div 
        className="relative flex-1 min-h-screen overflow-hidden"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const el = revealImgRef.current;
          if (el) {
            el.style.setProperty('--mx', `${x}px`);
            el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
          }
        }}
        onMouseLeave={() => {
          const el = revealImgRef.current;
          if (el) {
            el.style.setProperty('--mx', '-9999px');
            el.style.setProperty('--my', '-9999px');
          }
        }}
      >
        {/* LaserFlow Background - Vertical dramatic beam */}
        <LaserFlow
          horizontalBeamOffset={0.6}
          verticalBeamOffset={0.0}
          color="#9fff59"
          horizontalSizing={0.1}
          verticalSizing={4}
          wispDensity={1.5}
          wispSpeed={20}
          wispIntensity={6}
          flowSpeed={0.5}
          flowStrength={0.3}
          fogIntensity={0.2}
          fogScale={0.4}
          fogFallSpeed={0.4}
          decay={1.5}
          falloffStart={2.0}
        />
        
        {/* Hero Content */}
        <HeroContent />

        {/* Dotted Grid Effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(159, 255, 89, 0.02) 2px,
                rgba(159, 255, 89, 0.02) 4px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(159, 255, 89, 0.02) 2px,
                rgba(159, 255, 89, 0.02) 4px
              )
            `,
            mixBlendMode: 'screen',
            opacity: 0.6,
            WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.3) 150px, rgba(255,255,255,0) 300px)',
            maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.3) 150px, rgba(255,255,255,0) 300px)',
          }}
        />

        {/* Interactive Reveal Effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 8 }}
        >
          <img
            ref={revealImgRef}
            src="https://cdn.dribbble.com/userupload/42921161/file/original-7c578605b303df0ab822981cede61ea9.png?resize=1024x768&vertical=center"
            alt="Interactive dashboard reveal"
            className="absolute w-full top-1/4 mix-blend-lighten opacity-20"
            style={{
              WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.9) 80px, rgba(255,255,255,0.4) 160px, rgba(255,255,255,0) 240px)',
              maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.9) 80px, rgba(255,255,255,0.4) 160px, rgba(255,255,255,0) 240px)',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat'
            }}
          />
        </div>
      </div>

      {/* Feature Caption Section */}
      <FeatureCaption />
    </section>
  );
}