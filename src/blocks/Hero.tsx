import React, { useRef } from 'react';
import LaserFlow from '../components/LaserFlow';
import { Button } from '@/components/ui/button';

export function Hero() {
  const revealImgRef = useRef<HTMLImageElement>(null);

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background to-background/90">
      {/* Background Laser Flow */}
      <div className="absolute inset-0">
        <LaserFlow 
          horizontalBeamOffset={0.0}
          verticalBeamOffset={0.0}
          color="#FF79C6"
          wispDensity={1.2}
          flowSpeed={0.4}
          fogIntensity={0.3}
        />
      </div>

      {/* Interactive Laser Flow Box */}
      <div 
        className="absolute inset-0"
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
        <LaserFlow
          horizontalBeamOffset={0.1}
          verticalBeamOffset={0.0}
          color="#8BE9FD"
          wispDensity={0.8}
          flowSpeed={0.6}
          fogIntensity={0.25}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-glow">
            <span className="bg-gradient-to-r from-laser-primary via-laser-secondary to-laser-accent bg-clip-text text-transparent">
              Laser Flow
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Experience the future with stunning WebGL laser effects that respond to your every move. 
            Built with Three.js and powered by advanced shader technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-laser-primary to-laser-secondary hover:from-laser-secondary hover:to-laser-accent transition-all duration-300 laser-glow"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-laser-accent text-laser-accent hover:bg-laser-accent/10"
            >
              View Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Interactive reveal image overlay */}
      <div
        ref={revealImgRef}
        className="absolute w-full h-full top-0 left-0 z-5 pointer-events-none opacity-20 mix-blend-lighten"
        style={{
          '--mx': '-9999px',
          '--my': '-9999px',
          background: 'radial-gradient(circle, rgba(255,121,198,0.4) 0%, rgba(189,147,249,0.2) 50%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        } as React.CSSProperties}
      />

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none z-5" />
    </section>
  );
}

export default Hero;