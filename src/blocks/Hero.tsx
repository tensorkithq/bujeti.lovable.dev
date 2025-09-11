import React, { useRef } from 'react';
import LaserFlow from '../components/LaserFlow';
import { Button } from '@/components/ui/button';

const HeroMockup = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <div 
        className="relative w-full h-full rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(159, 255, 89, 0.1) 0%, rgba(159, 255, 89, 0.05) 50%, transparent 100%)',
          padding: '3px',
          boxShadow: `
            0 0 40px rgba(159, 255, 89, 0.5),
            0 0 80px rgba(159, 255, 89, 0.3),
            0 0 120px rgba(159, 255, 89, 0.1),
            inset 0 0 20px rgba(159, 255, 89, 0.1)
          `
        }}
      >
        <div 
          className="relative w-full h-full rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #9fff59 0%, #7fdf39 50%, #5fbf19 100%)',
            padding: '2px'
          }}
        >
          <div className="relative w-full h-full bg-[#060010] rounded-2xl overflow-hidden">
            <img 
              src="/bujeti-mockup.png" 
              alt="Bujeti App Mockup"
              className="w-full h-full object-cover"
              style={{
                filter: 'contrast(1.05)',
                objectFit: 'cover'
              }}
            />
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(circle at 30% 20%, rgba(159, 255, 89, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 70% 80%, rgba(159, 255, 89, 0.1) 0%, transparent 50%)
                `
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
        height: '800px', 
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
        flowSpeed={0.35}
        flowStrength={0.58}
        fogIntensity={0.002}
        fogScale={0.78}
        fogFallSpeed={0.3}
        decay={1.1}
        falloffStart={1.2}
      />
      
      <div className='min-h-max-content' style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '67.11%',
        // backgroundColor: '#060010',
        // borderRadius: '20px',
        // border: '2px solid #9fff59',
        // padding: '2rem'
        // fontSize: '2rem',
        // color: 'white',
        // display: 'flex',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        zIndex: 6,
      }}>
        <HeroMockup />
      </div>
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

      <div
        style={{
          position: 'absolute',
          width: '90%',
          height: '100%',
          top: '-50%',
          right: '10%',
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
          // src="https://cdn.dribbble.com/userupload/44808861/file/16544483349dc903de7cb4677ddbcfaa.png?resize=1024x768&vertical=center"
          src="https://cdn.dribbble.com/userupload/42921159/file/original-b85951904fcd673fd818f99a8a32e661.png?resize=1024x768&vertical=center"
          alt="Reveal effect"
          style={{
            position: 'absolute',
            width: '100%',
            top: '50%',
            height: '100%',
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
            opacity: 0.6,
            filter: 'blur(0.3px)',
            WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.9) 80px, rgba(255,255,255,0.5) 160px, rgba(255,255,255,0) 240px)',
            maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.9) 80px, rgba(255,255,255,0.5) 160px, rgba(255,255,255,0) 240px)',
          }}
        />
    
      </div>
    </div>
  );
}