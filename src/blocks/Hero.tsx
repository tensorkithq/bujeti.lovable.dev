import React, { useRef } from 'react';
import LaserFlow from '../components/LaserFlow';
import { Button } from '@/components/ui/button';

const HeroMockup = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
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
            <linearGradient id="curveGradient2" x1="50%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(158, 255, 89, 0.71)" />
              <stop offset="50%" stopColor="rgba(158, 255, 89, 0.5)" />
              <stop offset="100%" stopColor="rgba(158, 255, 89, 0.29)" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 C0,20 0,20 0,40 Q300,80 600,40 T1200,60 C1200,40 1200,20 1200,0 Q900,10 600,5 T0,0 Z"
            fill="url(#curveGradient)"
          />
          <path
            d="M0,0 C0,30 0,30 0,60 Q400,100 800,50 T1200,80 C1200,60 1200,30 1200,0 Q800,15 400,8 T0,0 Z"
            fill="url(#curveGradient2)"
          />
        </svg>
      <div 
        className="relative flex w-full justify-start items-start align-left overflow-hidden rounded-2xl ring-1 ring-[rgba(159,255,89,0.62)] ring-inset ring-offset-1 ring-offset-[rgba(159,255,89,0.12)]"
      >

        <div className="relative  w-full h-full overflow-hidden rounded-2xl border-1 border-[rgba(159,255,89,0.12)]">
          <div className="relative w-full h-full bg-[#060010] overflow-hidden">
            <img 
              src="/bujeti-mockup.png" 
              alt="Bujeti App Mockup"
              className="w-full h-full object-cover"
              style={{
                filter: 'invert(100%) hue-rotate(200deg) brightness(100%) contrast(100%)',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HeroBlock() {
  const revealImgRef = useRef(null);

  return (
    <div 
      style={{ 
        height: '840px', 
        position: 'relative', 
        overflow: 'hidden',
      }}
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
        horizontalBeamOffset={0.036}
        verticalBeamOffset={-0.036}
        color="#9fff59"
        horizontalSizing={0.74}
        verticalSizing={3}
        wispDensity={1}
        wispSpeed={15}
        wispIntensity={5}
        flowSpeed={0.45}
        flowStrength={0.158}
        /**
         * Fog intensity doesn't render well on Safari
         * Reduce to 0.002 for compatibility with Safari
         */
        fogIntensity={0.15}
        fogScale={0.478}
        fogFallSpeed={0.3}
        decay={1.2}
        falloffStart={1.5}
      />
      
      <div className='min-h-max-content' style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '67.11%',
        color: 'white',
        display: 'flex',
        zIndex: 6,
      }}>
        <HeroMockup />
      </div>

      {/* Start Dotted Grid Effect */}
      <div
          className="absolute min-h-full inset-0"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(159, 255, 89, 0.03) 2px,
                rgba(159, 255, 89, 0.03) 4px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(159, 255, 89, 0.03) 2px,
                rgba(159, 255, 89, 0.03) 4px
              )
            `,
            mixBlendMode: 'screen',
            opacity: 0.5,
            filter: 'contrast(1.2)',
            WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.4) 120px, rgba(255,255,255,0) 200px)',
            maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.4) 120px, rgba(255,255,255,0) 200px)',
          }}
        />
      {/* End Dotted Grid Effect */}

      {/* Start Reveal Effect */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: 'inherit',
          top: '-50%',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      >

        <img
          ref={revealImgRef}
          /** 
           * @NOTE:
           * Bujeti app is a white based theme, so we need to invert the 
           * color of the image properly blend. For this demo, we will not use their assets.
           *      filter: "invert(98%)  saturate(100%) hue-rotate(200deg) brightness(100%) contrast(100%)",
           *      src="https://framerusercontent.com/images/NLkhr0EP9YuJiG3pkMzw9fAbU.png?scale-down-to=1024&width=1786&height=1372"
           */
          // Preffered Screenshot from Dribbble https://dribbble.com/shots/25900652-Qiespend-AI-Powered-Fintech-Dashboard
          src="https://cdn.dribbble.com/userupload/42921161/file/original-7c578605b303df0ab822981cede61ea9.png?resize=1024x768&vertical=center"
          // src="https://cdn.dribbble.com/userupload/42921159/file/original-b85951904fcd673fd818f99a8a32e661.png?resize=1024x768&vertical=center"
          alt="Reveal effect"
          style={{
            position: 'absolute',
            width: '100%',
            top: '30%',
            //@ts-ignore
            '--mx': '-9999px',
            //@ts-ignore
            '--my': '-9999px',
            mixBlendMode: 'lighten',
            opacity: 0.3,
            WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
            maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat'
          }}
        />
        {/* Very subtle effect, you almost won't notice it,
         but it's there, modify opacity to see it 
         */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(159, 255, 89, 0.8) 1px, transparent 1px),
              radial-gradient(circle, rgba(159, 255, 89, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px, 10px 10px',
            backgroundPosition: '0 0, 5px 5px',
            mixBlendMode: 'overlay',
            opacity: 0.062,
            left: '40%',
            width: '40%',
            filter: 'blur(0.3px)',
            WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.9) 80px, rgba(255,255,255,0.5) 160px, rgba(255,255,255,0) 240px)',
            maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.9) 80px, rgba(255,255,255,0.5) 160px, rgba(255,255,255,0) 240px)',
          }}
        />
      {/* End Reveal Effect */}
      </div>
    </div>
  );
}