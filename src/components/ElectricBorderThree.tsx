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
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    void main() {
      vec2 uv = vUv;
      float t = time * speed;
      
      // Calculate distance to all edges
      float distLeft = uv.x;
      float distRight = 1.0 - uv.x;
      float distTop = 1.0 - uv.y;
      float distBottom = uv.y;
      float minDist = min(min(distLeft, distRight), min(distTop, distBottom));
      
      // Create border mask
      float borderMask = 1.0 - smoothstep(0.0, thickness, minDist);
      
      if(borderMask < 0.01) {
        discard;
      }
      
      // Initialize final color
      vec3 finalColor = vec3(0.0);
      float totalGlow = 0.0;
      
      // Create multiple traveling lightning bolts
      for(float i = 0.0; i < 6.0; i++) {
        float speed_i = 1.0 + i * 0.3;
        float offset = i * 1.618; // Golden ratio for distribution
        
        // Determine position along perimeter (0-4 for full loop)
        float perimPos = 0.0;
        if(minDist == distBottom && uv.x > thickness && uv.x < 1.0 - thickness) {
          perimPos = uv.x; // Bottom edge: 0-1
        } else if(minDist == distRight && uv.y > thickness && uv.y < 1.0 - thickness) {
          perimPos = 1.0 + uv.y; // Right edge: 1-2
        } else if(minDist == distTop && uv.x > thickness && uv.x < 1.0 - thickness) {
          perimPos = 3.0 - uv.x; // Top edge: 2-3
        } else if(minDist == distLeft && uv.y > thickness && uv.y < 1.0 - thickness) {
          perimPos = 4.0 - uv.y; // Left edge: 3-4
        }
        
        // Create traveling bright spots
        float travelPos = fract(perimPos * 0.25 + t * speed_i * 0.2 + offset);
        
        // Sharp bright bolt
        float bolt = 1.0 - abs(travelPos - 0.5) * 2.0;
        bolt = pow(bolt, 38.0); // Very sharp peak
        bolt *= borderMask;
        
        // Add flickering
        float flicker = random(vec2(floor(t * 15.0 + i), i));
        if(flicker > 0.7) {
          bolt *= 2.0;
        }
        
        totalGlow += bolt;
      }
      
      // Add continuous electric glow along edges
      float edgeGlow = borderMask * (0.5 + 0.5 * sin(t * 10.0));
      totalGlow += edgeGlow * 0.3;
      
      // Create the final color
      // Base blue/purple glow
      finalColor += color * borderMask * 0.5 * intensity;
      
      // Bright white bolts
      finalColor += vec3(1.0) * totalGlow * intensity * 2.0;
      
      // Colored glow around bolts
      finalColor += color * totalGlow * intensity;
      
      // Add extra brightness at bolt peaks
      if(totalGlow > 0.5) {
        finalColor += vec3(1.0, 1.0, 1.0) * pow(totalGlow, 0.5) * intensity;
      }
      
      // Output
      float alpha = clamp(borderMask + totalGlow, 0.0, 1.0);
      gl_FragColor = vec4(finalColor, alpha);
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

      // Update base uniforms
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
            antialias: false,
            powerPreference: "high-performance",
            preserveDrawingBuffer: true
          }}
          dpr={[1, 2]}
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