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
    
    // DIAGNOSTIC MODE - Set to different values to test components
    #define DEBUG_MODE 0  // 0=full effect, 1=border mask, 2=lightning, 3=UV, 4=simple test
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    void main() {
      vec2 uv = vUv;
      float t = time * speed;
      
      // Calculate distance to edges
      float distToEdges = min(
        min(uv.x, 1.0 - uv.x),
        min(uv.y, 1.0 - uv.y)
      );
      
      // Create border mask
      float borderMask = smoothstep(thickness, 0.0, distToEdges);
      
      // DIAGNOSTIC: Simple animated test pattern
      if(DEBUG_MODE == 4) {
        float testPattern = sin(uv.x * 10.0 + time) * sin(uv.y * 10.0 - time);
        vec3 testColor = vec3(testPattern, 0.5, 1.0 - testPattern);
        gl_FragColor = vec4(testColor, 1.0);
        return;
      }
      
      // DIAGNOSTIC: Show UV coordinates
      if(DEBUG_MODE == 3) {
        gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
        return;
      }
      
      // DIAGNOSTIC: Show border mask only
      if(DEBUG_MODE == 1) {
        gl_FragColor = vec4(vec3(borderMask), borderMask);
        return;
      }
      
      // Create lightning effect with clear, visible bolts
      float lightning = 0.0;
      
      // Traveling waves along the border
      float borderPosition = 0.0;
      
      // Determine position along border perimeter
      if(distToEdges == uv.x) {
        // Left edge
        borderPosition = uv.y;
      } else if(distToEdges == 1.0 - uv.x) {
        // Right edge
        borderPosition = 2.0 + uv.y;
      } else if(distToEdges == uv.y) {
        // Bottom edge
        borderPosition = 1.0 + uv.x;
      } else {
        // Top edge
        borderPosition = 3.0 + (1.0 - uv.x);
      }
      
      // Create sharp, visible lightning bolts
      for(float i = 0.0; i < 5.0; i++) {
        // Create moving bright spots along the border
        float boltPos = fract(borderPosition * 0.25 + t * 0.5 + i * 0.2);
        
        // Create sharp peaks at specific positions
        float bolt = 1.0 - abs(boltPos - 0.5) * 2.0;
        bolt = smoothstep(0.8, 0.95, bolt); // Very sharp cutoff
        
        // Add secondary bolts
        float boltPos2 = fract(borderPosition * 0.5 - t * 0.3 + i * 0.3);
        float bolt2 = 1.0 - abs(boltPos2 - 0.5) * 2.0;
        bolt2 = smoothstep(0.85, 0.98, bolt2);
        
        lightning = max(lightning, max(bolt, bolt2));
      }
      
      // Add constant animated streaks
      float streak = sin(borderPosition * 20.0 + t * 5.0) * 0.5 + 0.5;
      streak = pow(streak, 4.0);
      lightning = max(lightning, streak * 0.5);
      
      // Apply to border region only
      lightning *= borderMask;
      
      // DIAGNOSTIC: Show lightning only
      if(DEBUG_MODE == 2) {
        gl_FragColor = vec4(vec3(lightning), 1.0);
        return;
      }
      
      // Final composition
      vec3 finalColor = vec3(0.0);
      
      // Base glow
      vec3 glowColor = color * borderMask * 0.3;
      finalColor += glowColor;
      
      // Lightning bolts - make them VERY bright
      vec3 boltColor = mix(color, vec3(1.0), 0.7); // Mostly white
      finalColor += boltColor * lightning * intensity * 3.0;
      
      // Extra bright core
      if(lightning > 0.1) {
        finalColor += vec3(1.0) * pow(lightning, 0.5) * intensity;
      }
      
      // Add some constant brightness to ensure visibility
      if(borderMask > 0.1) {
        finalColor += color * 0.1 * intensity;
      }
      
      float alpha = clamp(borderMask + lightning * 2.0, 0.0, 1.0);
      
      // Output with debugging info
      #if DEBUG_MODE == 0
        gl_FragColor = vec4(finalColor * 2.0, alpha);
      #else
        // This shouldn't be reached but just in case
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); // Magenta = error
      #endif
    }
  `;

  const hoverAmt = useRef(0);

  // Add debugging hooks
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
      
      // DIAGNOSTIC: Log every second to verify updates
      if (Math.floor(state.clock.getElapsedTime()) !== Math.floor(state.clock.getElapsedTime() - 0.016)) {
        console.log('ElectricBorder uniforms:', {
          time: u.time.value,
          intensity: u.intensity.value,
          thickness: u.thickness.value,
          color: u.color.value.getHexString()
        });
      }
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
            antialias: false,  // Disable antialiasing for better performance
            powerPreference: "high-performance",
            preserveDrawingBuffer: true  // Ensure buffer is preserved
          }}
          dpr={[1, 2]}  // Set device pixel ratio
          onCreated={(state) => {
            console.log('Canvas created, WebGL context:', state.gl);
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