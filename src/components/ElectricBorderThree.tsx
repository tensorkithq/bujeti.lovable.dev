import React, { useRef, useMemo, useEffect, useState, PropsWithChildren, CSSProperties } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ElectricMeshProps {
  color: string;
  speed: number;
  intensity: number;
  thickness: number;
  noise: number;
  isHovering: boolean;
  hoverPos: { x: number; y: number };
}

const ElectricMesh: React.FC<ElectricMeshProps> = ({ color, speed, intensity, thickness, noise, isHovering, hoverPos }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      color: { value: new THREE.Color(color) },
      intensity: { value: intensity },
      thickness: { value: thickness },
      noise: { value: noise },
      speed: { value: speed },
      hoverPos: { value: new THREE.Vector2(-10, -10) },
      hoverStrength: { value: 0 },
    }),
    [] // Empty deps to create once, values updated in useFrame
  );

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    uniform vec3 color;
    uniform float intensity;
    uniform float thickness;
    uniform float noise;
    uniform float speed;
    uniform vec2 hoverPos;
    uniform float hoverStrength;
    
    varying vec2 vUv;
    
    // Simple random
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    // Simple noise
    float noise2d(vec2 st) {
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
      vec2 uv = vUv;
      float t = time * speed;
      
      // Calculate distance to each edge
      float distToLeft = uv.x;
      float distToRight = 1.0 - uv.x;
      float distToBottom = uv.y;
      float distToTop = 1.0 - uv.y;
      
      // Find minimum distance to any edge
      float minDist = min(min(distToLeft, distToRight), min(distToBottom, distToTop));
      
      // Create the border region - make it wider
      float borderMask = 1.0 - smoothstep(0.0, thickness * 5.0, minDist);
      
      if(borderMask < 0.001) {
        gl_FragColor = vec4(0.0);
        return;
      }
      
      // Determine which edge we're on and get position along that edge
      float edgePos = 0.0;
      float edgeId = 0.0;
      
      if(minDist == distToBottom) {
        edgePos = uv.x;
        edgeId = 0.0;
      } else if(minDist == distToRight) {
        edgePos = uv.y;  
        edgeId = 1.0;
      } else if(minDist == distToTop) {
        edgePos = 1.0 - uv.x;
        edgeId = 2.0;
      } else {
        edgePos = 1.0 - uv.y;
        edgeId = 3.0;
      }
      
      // Create animated lightning effect
      float lightning = 0.0;
      
      // Multiple waves for complex pattern
      for(float i = 0.0; i < 5.0; i++) {
        float freq = 10.0 + i * 7.0;
        float amp = 1.0 / (i + 1.0);
        float phase = t * (1.0 + i * 0.3) + edgeId * 1.57 + i * 2.0;
        
        // Main wave
        float wave = sin(edgePos * freq + phase) * amp;
        
        // Add noise for organic feel
        float noiseVal = noise2d(vec2(edgePos * 20.0 + t * 2.0, i + edgeId)) * noise;
        wave += noiseVal * amp * 0.5;
        
        // Create sharp peaks for lightning look
        wave = abs(wave);
        wave = pow(wave, 0.5);
        
        // Distance field for glow
        float dist = abs(minDist / thickness - 0.5 - wave * 0.3);
        float glow = exp(-dist * dist * 10.0);
        
        lightning += glow * amp;
      }
      
      // Add bright flashes
      float flash = random(vec2(floor(t * 10.0), edgeId));
      if(flash > 0.9) {
        lightning *= 2.0;
      }
      
      // Create color
      vec3 finalColor = vec3(0.0);
      
      // White hot core - make it much brighter
      vec3 coreColor = vec3(1.0, 1.0, 1.0);
      float core = pow(lightning, 0.3);
      finalColor += coreColor * core * intensity * 3.0;
      
      // Colored glow - more intense
      float glow = lightning * 1.5;
      finalColor += color * glow * intensity * 1.5;
      
      // Outer halo - stronger
      float halo = pow(borderMask, 1.5);
      finalColor += color * halo * 0.5 * intensity;
      
      // Apply border mask
      finalColor *= borderMask;
      
      // Hover boost
      if(hoverStrength > 0.0) {
        vec2 hDist = abs(uv - hoverPos);
        float hoverDist = length(hDist);
        if(hoverDist < 0.3) {
          float hoverGlow = (1.0 - hoverDist / 0.3) * hoverStrength;
          finalColor += color * hoverGlow * intensity;
        }
      }
      
      // Ensure visibility with higher alpha
      float alpha = clamp(borderMask * (lightning * 2.0 + 0.5), 0.0, 1.0);
      gl_FragColor = vec4(finalColor * 2.0, alpha);  // Boost final color as well
    }
  `;

  const hoverAmt = useRef(0);

  useFrame((state) => {
    if (materialRef.current) {
      // Animate time
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();

      // Smooth hover easing
      const target = isHovering ? 1 : 0;
      hoverAmt.current += (target - hoverAmt.current) * 0.12;

      // Update uniforms from props and hover
      const u = materialRef.current.uniforms as any;
      u.hoverStrength.value = hoverAmt.current;
      u.hoverPos.value.set(hoverPos.x, hoverPos.y);

      // Update base uniforms - no need to boost on hover as it's handled in shader
      u.intensity.value = intensity;
      u.thickness.value = thickness;
      u.speed.value = speed;
      u.noise.value = noise;
      u.color.value = new THREE.Color(color);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

type ElectricBorderThreeProps = PropsWithChildren<{
  color?: string;
  speed?: number;
  intensity?: number;
  thickness?: number;
  noise?: number;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}>;

/**
 * ElectricBorderThree - Realistic electric border using Three.js
 * 
 * Creates a true electric/lightning border effect with dynamic plasma-like
 * animations using WebGL shaders for maximum realism and performance.
 */
const ElectricBorderThree: React.FC<ElectricBorderThreeProps> = ({
  children,
  color = '#7df9ff',
  speed = 1,
  intensity = 1,
  thickness = 0.015,
  noise = 0.5,
  className = '',
  style,
  disabled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: -10, y: -10 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const nyTop = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
    const ny = 1.0 - nyTop; // convert to UV space (0 at bottom)
    mousePos.current = { x: nx, y: ny };
  };

  const containerStyle: CSSProperties = {
    ...style,
    position: 'relative',
    isolation: 'isolate',
    padding: '12px', // Add padding around the component
  };

  const canvasStyle: CSSProperties = {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    width: 'calc(100% + 16px)',
    height: 'calc(100% + 16px)',
    pointerEvents: 'none',
    borderRadius: style?.borderRadius || 'inherit',
    zIndex: 2,
  };

  const contentStyle: CSSProperties = {
    position: 'relative',
    borderRadius: style?.borderRadius || 'inherit',
    zIndex: 1,
    background: 'rgba(0, 0, 0, 0.8)', // Darker background for better contrast
    backdropFilter: 'blur(12px)',
    boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.5)', // Inner shadow for depth
  };

  // Adjusted parameters for new shader
  const glowStyle: CSSProperties = {
    position: 'absolute',
    inset: -30,
    borderRadius: style?.borderRadius || 'inherit',
    background: `radial-gradient(circle at center, ${color}88 0%, ${color}44 20%, ${color}22 40%, transparent 70%)`,  // Much stronger glow
    filter: 'blur(30px)',
    pointerEvents: 'none',
    opacity: disabled ? 0 : 1,
    zIndex: 0,
  };

  if (disabled) {
    return (
      <div ref={containerRef} className={className} style={containerStyle}>
        <div style={{ 
          ...contentStyle, 
          border: `2px solid ${color}33`,
        }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={containerStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <div style={glowStyle} />
      <div style={canvasStyle}>
        <Canvas
          camera={{ position: [0, 0, 1], fov: 75 }}
          gl={{ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
          }}
        >
          <ElectricMesh
            color={color}
            speed={speed}
            intensity={intensity}
            thickness={thickness}
            noise={noise}
            isHovering={isHovering}
            hoverPos={mousePos.current}
          />
        </Canvas>
      </div>
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default ElectricBorderThree;