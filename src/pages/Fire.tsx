import React, { useState, useEffect, useRef, useId, useLayoutEffect, CSSProperties, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface ElectricFireBorderProps {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  borderRadius?: number;
  glowColor?: string;
  electricColor?: string;
  className?: string;
  style?: CSSProperties;
  useThreeJS?: boolean;
  speed?: number;
  chaos?: number;
  thickness?: number;
}

function hexToRgba(hex: string, alpha = 1): string {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h
      .split('')
      .map(c => c + c)
      .join('');
  }
  const int = parseInt(h, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ElectricFireBorder: React.FC<ElectricFireBorderProps> = ({
  children,
  width = 400,
  height = 500,
  borderRadius = 24,
  glowColor = '#ff6b35',
  electricColor = '#00d4ff',
  className = '',
  style,
  useThreeJS = false,
  speed = 1,
  chaos = 1.5,
  thickness = 3
}) => {
  const rawId = useId().replace(/[:]/g, '');
  const filterId = useMemo(() => `electric-fire-${rawId}`, [rawId]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const strokeRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  const updateAnimation = useCallback(() => {
    const svg = svgRef.current;
    const host = rootRef.current;
    if (!svg || !host) return;

    if (strokeRef.current) {
      strokeRef.current.style.filter = `url(#${filterId})`;
    }

    const hostWidth = Math.max(1, Math.round(host.clientWidth || 0));
    const hostHeight = Math.max(1, Math.round(host.clientHeight || 0));

    const dyAnims = Array.from(svg.querySelectorAll<SVGAnimateElement>('feOffset > animate[attributeName="dy"]'));
    if (dyAnims.length >= 2) {
      dyAnims[0].setAttribute('values', `${hostHeight}; 0`);
      dyAnims[1].setAttribute('values', `0; -${hostHeight}`);
    }

    const dxAnims = Array.from(svg.querySelectorAll<SVGAnimateElement>('feOffset > animate[attributeName="dx"]'));
    if (dxAnims.length >= 2) {
      dxAnims[0].setAttribute('values', `${hostWidth}; 0`);
      dxAnims[1].setAttribute('values', `0; -${hostWidth}`);
    }

    const baseDur = 8;
    const dur = Math.max(0.001, baseDur / (speed || 1));
    [...dyAnims, ...dxAnims].forEach(a => a.setAttribute('dur', `${dur}s`));

    const disp = svg.querySelector('feDisplacementMap');
    if (disp) disp.setAttribute('scale', String(25 * (chaos || 1)));

    const filterEl = svg.querySelector<SVGFilterElement>(`#${CSS.escape(filterId)}`);
    if (filterEl) {
      filterEl.setAttribute('x', '-200%');
      filterEl.setAttribute('y', '-200%');
      filterEl.setAttribute('width', '500%');
      filterEl.setAttribute('height', '500%');
    }

    requestAnimationFrame(() => {
      [...dyAnims, ...dxAnims].forEach((a: any) => {
        if (typeof a.beginElement === 'function') {
          try {
            a.beginElement();
          } catch {}
        }
      });
    });
  }, [filterId, speed, chaos]);

  useEffect(() => {
    if (!useThreeJS) {
      updateAnimation();
    }
  }, [speed, chaos, useThreeJS, updateAnimation]);

  useLayoutEffect(() => {
    if (!useThreeJS && rootRef.current) {
      const ro = new ResizeObserver(() => updateAnimation());
      ro.observe(rootRef.current);
      updateAnimation();
      return () => ro.disconnect();
    }
  }, [useThreeJS, updateAnimation]);

  useEffect(() => {
    if (!useThreeJS || !canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -width / 2, width / 2,
      height / 2, -height / 2,
      0.1, 1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    const geometry = new THREE.PlaneGeometry(width - 4, height - 4);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        glowColor: { value: new THREE.Color(glowColor) },
        electricColor: { value: new THREE.Color(electricColor) },
        resolution: { value: new THREE.Vector2(width, height) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 glowColor;
        uniform vec3 electricColor;
        uniform vec2 resolution;
        varying vec2 vUv;
        
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        
        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        
        void main() {
          vec2 st = vUv;
          float dist = min(min(st.x, 1.0 - st.x), min(st.y, 1.0 - st.y));
          
          float electricNoise = noise(st * 10.0 + time * 2.0);
          float fireNoise = noise(st * 5.0 + vec2(0.0, -time * 0.5));
          
          float electricIntensity = smoothstep(0.0, 0.05, dist) * electricNoise;
          float fireIntensity = smoothstep(0.0, 0.1, dist) * fireNoise;
          
          vec3 electric = electricColor * electricIntensity * 2.0;
          vec3 fire = glowColor * fireIntensity * 1.5;
          
          vec3 finalColor = mix(fire, electric, sin(time * 3.0) * 0.5 + 0.5);
          
          float alpha = max(electricIntensity, fireIntensity) * 0.8;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      material.uniforms.time.value += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [width, height, glowColor, electricColor, useThreeJS]);

  const inheritRadius: CSSProperties = {
    borderRadius: style?.borderRadius ?? borderRadius
  };

  const strokeStyle: CSSProperties = {
    ...inheritRadius,
    borderWidth: thickness,
    borderStyle: 'solid',
    borderColor: glowColor
  };

  const glow1Style: CSSProperties = {
    ...inheritRadius,
    borderWidth: thickness,
    borderStyle: 'solid',
    borderColor: hexToRgba(glowColor, 0.6),
    filter: `blur(${0.5 + thickness * 0.25}px)`,
    opacity: 0.5
  };

  const glow2Style: CSSProperties = {
    ...inheritRadius,
    borderWidth: thickness,
    borderStyle: 'solid',
    borderColor: electricColor,
    filter: `blur(${2 + thickness * 0.5}px)`,
    opacity: 0.5
  };

  const bgGlowStyle: CSSProperties = {
    ...inheritRadius,
    transform: 'scale(1.08)',
    filter: 'blur(32px)',
    opacity: 0.3,
    zIndex: -1,
    background: `linear-gradient(-30deg, ${hexToRgba(glowColor, 0.8)}, transparent, ${electricColor})`
  };

  return (
    <motion.div
      ref={rootRef}
      className={`relative isolate ${className}`}
      style={{ width, height, ...style }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {useThreeJS ? (
        <>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ borderRadius }}
          />
          <motion.div
            className="absolute inset-0"
            animate={{
              boxShadow: [
                `0 0 60px ${glowColor}40, inset 0 0 30px ${electricColor}20`,
                `0 0 80px ${electricColor}60, inset 0 0 40px ${glowColor}30`,
                `0 0 60px ${glowColor}40, inset 0 0 30px ${electricColor}20`,
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ borderRadius }}
          />
        </>
      ) : (
        <>
          <svg
            ref={svgRef}
            className="fixed -left-[10000px] -top-[10000px] w-[10px] h-[10px] opacity-[0.001] pointer-events-none"
            aria-hidden
            focusable="false"
          >
            <defs>
              <filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="4" result="noise1" seed="1" />
                <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                  <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
                </feOffset>

                <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="4" result="noise2" seed="2" />
                <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                  <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
                </feOffset>

                <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="3" result="noise3" seed="3" />
                <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
                  <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
                </feOffset>

                <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" result="noise4" seed="4" />
                <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
                  <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
                </feOffset>

                <feComposite in="offsetNoise1" in2="offsetNoise2" operator="over" result="part1" />
                <feComposite in="offsetNoise3" in2="offsetNoise4" operator="over" result="part2" />
                <feBlend in="part1" in2="part2" mode="screen" result="combinedNoise" />
                
                <feColorMatrix in="combinedNoise" type="saturate" values="1.5" result="saturatedNoise" />
                
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="saturatedNoise"
                  scale="30"
                  xChannelSelector="R"
                  yChannelSelector="B"
                />
                
                <feGaussianBlur stdDeviation="0.5" result="blurred" />
                <feComponentTransfer in="blurred" result="brightened">
                  <feFuncA type="discrete" tableValues="0 1 1 1" />
                </feComponentTransfer>
                
                <feMerge>
                  <feMergeNode in="brightened" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          <div className="absolute inset-0 pointer-events-none" style={inheritRadius}>
            <div ref={strokeRef} className="absolute inset-0 box-border" style={strokeStyle} />
            <div className="absolute inset-0 box-border" style={glow1Style} />
            <div className="absolute inset-0 box-border" style={glow2Style} />
            <div className="absolute inset-0" style={bgGlowStyle} />
          </div>

          <motion.div
            className="absolute inset-0"
            style={{ borderRadius }}
            animate={{
              boxShadow: [
                `0 0 40px ${glowColor}60, 0 0 80px ${glowColor}40, inset 0 0 30px ${glowColor}20`,
                `0 0 60px ${electricColor}80, 0 0 100px ${electricColor}60, inset 0 0 40px ${electricColor}30`,
                `0 0 40px ${glowColor}60, 0 0 80px ${glowColor}40, inset 0 0 30px ${glowColor}20`,
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-3"
              style={{
                background: `linear-gradient(to top, ${i % 2 === 0 ? electricColor : glowColor}, transparent)`,
                left: `${5 + (i * 8)}%`,
                bottom: -2,
                filter: 'blur(1px)'
              }}
              animate={{
                y: [-height * 0.8, 0],
                opacity: [0, 1, 1, 0],
                scale: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5 + Math.random() * 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      <div className="relative z-10 w-full h-full" style={inheritRadius}>
        {children}
      </div>
    </motion.div>
  );
};

export default function Fire() {
  const [useThreeJS, setUseThreeJS] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [chaos, setChaos] = useState(1.5);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex gap-4">
          <button
            onClick={() => setUseThreeJS(false)}
            className={`px-6 py-2 rounded-lg transition-all ${
              !useThreeJS 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            SVG Turbulence
          </button>
          <button
            onClick={() => setUseThreeJS(true)}
            className={`px-6 py-2 rounded-lg transition-all ${
              useThreeJS 
                ? 'bg-cyan-500 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Three.js WebGL
          </button>
        </div>
        
        {!useThreeJS && (
          <div className="flex gap-6 mt-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm">Speed: {speed.toFixed(1)}</label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-32"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm">Chaos: {chaos.toFixed(1)}</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={chaos}
                onChange={(e) => setChaos(parseFloat(e.target.value))}
                className="w-32"
              />
            </div>
          </div>
        )}
      </div>

      <ElectricFireBorder
        width={500}
        height={600}
        borderRadius={24}
        glowColor="#ff6b35"
        electricColor="#00d4ff"
        useThreeJS={useThreeJS}
        speed={speed}
        chaos={chaos}
        thickness={3}
      >
        <div className="w-full h-full  from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-8 rounded-3xl">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
            Electric Fire
          </h2>
          <p className="text-gray-400 text-center mb-2">
            {useThreeJS ? 'WebGL Shader Effect' : 'SVG Turbulence Filter'}
          </p>
          <p className="text-gray-500 text-sm text-center">
            {!useThreeJS && 'Mimicking ElectricBorder.tsx implementation'}
          </p>
        </div>
      </ElectricFireBorder>
    </div>
  );
}