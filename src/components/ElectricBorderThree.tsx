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
    
    // Hash function for randomness
    float hash(vec2 p) {
      p = fract(p * vec2(234.34, 435.345));
      p += dot(p, p + 34.23);
      return fract(p.x * p.y);
    }
    
    // Noise function
    float noise2D(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }
    
    // Fractal noise for lightning
    float fbm(vec2 p, float octaves) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 2.0;
      
      for(float i = 0.0; i < 5.0; i++) {
        if(i >= octaves) break;
        value += amplitude * noise2D(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      return value;
    }
    
    // Get distance to closest edge and which edge
    vec4 getEdgeInfo(vec2 uv) {
      float distLeft = uv.x;
      float distRight = 1.0 - uv.x;
      float distBottom = uv.y;
      float distTop = 1.0 - uv.y;
      
      float minDist = min(min(distLeft, distRight), min(distBottom, distTop));
      
      // Return: (minDist, edgeId, position along edge, 0)
      // edgeId: 0=bottom, 1=right, 2=top, 3=left
      if(minDist == distBottom) return vec4(minDist, 0.0, uv.x, 0.0);
      else if(minDist == distRight) return vec4(minDist, 1.0, uv.y, 0.0);
      else if(minDist == distTop) return vec4(minDist, 2.0, 1.0 - uv.x, 0.0);
      else return vec4(minDist, 3.0, 1.0 - uv.y, 0.0);
    }
    
    // Create lightning bolt
    float createLightning(vec2 uv, float t, float seed) {
      vec4 edgeInfo = getEdgeInfo(uv);
      float distToEdge = edgeInfo.x;
      float edgeId = edgeInfo.y;
      float posAlongEdge = edgeInfo.z;
      
      // Only render very close to edges
      if(distToEdge > thickness * 2.0) return 0.0;
      
      // Create flowing position along edge
      float flowPos = posAlongEdge + t * speed + seed + edgeId * 0.25;
      
      // Main lightning path using fractal noise
      float lightning = 0.0;
      
      // Primary bolt - bright and sharp
      float primaryPath = fbm(vec2(flowPos * 8.0, seed * 10.0), 3.0);
      primaryPath = abs(primaryPath - 0.5) * 2.0; // Center and make symmetric
      primaryPath = 1.0 - primaryPath; // Invert so center is bright
      primaryPath = pow(primaryPath, 3.0); // Make it sharp
      
      // Calculate distance from edge with displacement
      float displacement = (primaryPath - 0.5) * thickness * 0.8;
      float distFromPath = abs(distToEdge - thickness * 0.5 - displacement);
      
      // Sharp falloff for electric look
      lightning = exp(-distFromPath * 50.0 / thickness) * primaryPath;
      
      // Add branching bolts
      for(float i = 0.0; i < 3.0; i++) {
        float branchFlow = flowPos * (10.0 + i * 3.0) + i * 100.0;
        float branch = fbm(vec2(branchFlow, seed * 20.0 + i), 2.0);
        branch = 1.0 - abs(branch - 0.5) * 2.0;
        branch = pow(branch, 4.0);
        
        // Random branching
        float branchChance = hash(vec2(floor(branchFlow * 5.0), seed + i));
        if(branchChance > 0.7) {
          float branchDist = abs(distToEdge - thickness * (0.3 + i * 0.2));
          float branchGlow = exp(-branchDist * 40.0 / thickness) * branch * 0.5;
          lightning = max(lightning, branchGlow);
        }
      }
      
      return lightning;
    }
    
    void main() {
      vec2 uv = vUv;
      float t = time;
      
      vec3 finalColor = vec3(0.0);
      float totalGlow = 0.0;
      
      // Layer multiple lightning bolts
      for(float i = 0.0; i < 4.0; i++) {
        float seed = i * 137.5; // Use golden angle for good distribution
        float bolt = createLightning(uv, t + i * 0.1, seed);
        
        if(bolt > 0.01) {
          // Core: bright white
          vec3 coreColor = vec3(1.0, 1.0, 1.0);
          float core = pow(bolt, 0.5) * 2.0;
          
          // Glow: colored
          vec3 glowColor = color;
          float glow = bolt;
          
          // Mix core and glow
          vec3 boltColor = mix(glowColor, coreColor, core * 0.7);
          
          finalColor += boltColor * bolt * intensity * (1.0 - i * 0.1);
          totalGlow = max(totalGlow, bolt);
        }
      }
      
      // Add hover effect
      if(hoverStrength > 0.01) {
        vec4 edgeInfo = getEdgeInfo(uv);
        vec4 hoverEdgeInfo = getEdgeInfo(hoverPos);
        
        if(abs(edgeInfo.y - hoverEdgeInfo.y) < 0.5 || 
           (edgeInfo.y == 0.0 && hoverEdgeInfo.y == 3.0) ||
           (edgeInfo.y == 3.0 && hoverEdgeInfo.y == 0.0)) {
          
          float posDiff = abs(edgeInfo.z - hoverEdgeInfo.z);
          if(posDiff < 0.3) {
            float hoverGlow = (1.0 - posDiff / 0.3) * hoverStrength;
            float hoverBolt = createLightning(uv, t * 1.5, 999.0) * 2.0;
            finalColor += color * hoverBolt * hoverGlow * intensity;
            totalGlow = max(totalGlow, hoverBolt * hoverGlow);
          }
        }
      }
      
      // Add outer glow for atmosphere
      vec4 edgeInfo = getEdgeInfo(uv);
      if(edgeInfo.x < thickness * 4.0) {
        float glowFalloff = 1.0 - (edgeInfo.x / (thickness * 4.0));
        glowFalloff = pow(glowFalloff, 2.0);
        finalColor += color * glowFalloff * 0.2 * intensity * totalGlow;
      }
      
      // Flicker effect
      float flicker = 0.9 + sin(t * 37.0 + hash(uv) * 10.0) * 0.1;
      finalColor *= flicker;
      
      // Output
      float alpha = clamp(totalGlow * 2.0, 0.0, 1.0);
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
    inset: -20,  // Reduced for tighter glow
    borderRadius: style?.borderRadius || 'inherit',
    background: `radial-gradient(circle at center, ${color}22 0%, transparent 50%)`,  // Subtler glow
    filter: 'blur(20px)',
    pointerEvents: 'none',
    opacity: disabled ? 0 : intensity * 0.5,
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