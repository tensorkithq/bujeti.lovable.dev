import React, { useRef, useMemo, PropsWithChildren, CSSProperties } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /*glsl*/ `
  varying vec2 vUv;
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    vUv = uv;
  }`;

const fragmentShader = /*glsl*/ `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 pointer;
    uniform vec3 color;
    uniform float intensity;
    uniform float thickness;
    uniform float noise;
    uniform float speed;
    varying vec2 vUv;

    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    // Distance to border edges
    float edgeDistance(vec2 uv) {
      return min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    }
    
    // Map UV to border parameter (0-4 going around clockwise)
    float borderParam(vec2 uv) {
      if (abs(uv.y) <= abs(uv.x) && abs(uv.y - 1.0) <= abs(uv.x)) {
        // Top or bottom edge
        return uv.y < 0.5 ? uv.x : 3.0 - uv.x;
      } else {
        // Left or right edge  
        return uv.x < 0.5 ? 1.0 + uv.y : 4.0 - uv.y;
      }
    }
    
    // Create thick lightning bolts that flow around the border
    float lightningBolt(vec2 uv, float t, float seed) {
      float eDist = edgeDistance(uv);
      if (eDist > thickness * 30.0) return 0.0;  // Increased range
      
      float borderPos = borderParam(uv);
      
      // Create flowing lightning with multiple frequencies
      float flow = t * speed + seed * 6.28;
      float phase = borderPos * 0.3 + flow;
      
      // Main thick lightning path with more intensity
      float mainBolt = sin(phase) * 0.6 + 0.5;
      mainBolt *= sin(phase * 0.7 + seed) * 0.5 + 0.6;
      mainBolt = pow(mainBolt, 0.5);  // Make it brighter
      
      // Add organic noise displacement
      vec2 noiseCoord = uv * 15.0 + vec2(flow, seed * 3.0);
      float organicNoise = snoise(noiseCoord) * noise;
      mainBolt *= (0.8 + organicNoise * 0.7);
      
      // More prominent branching bolts
      float branch1 = sin(phase * 2.5 + seed * 2.0);
      branch1 = smoothstep(0.6, 1.0, branch1) * 0.9;
      
      float branch2 = sin(phase * 1.8 - seed * 1.5);
      branch2 = smoothstep(0.7, 1.0, branch2) * 0.8;
      
      float branch3 = sin(phase * 3.2 + seed * 3.0);
      branch3 = smoothstep(0.75, 1.0, branch3) * 0.7;
      
      // Combine main bolt with branches
      float lightning = max(mainBolt, max(branch1, max(branch2, branch3)));
      
      // Sharper, more defined falloff from edge
      float falloff = 1.0 - smoothstep(0.0, thickness * 25.0, eDist);
      falloff = pow(falloff, 0.7);  // Make falloff more gradual
      
      return lightning * falloff;
    }
    
    void main() {
      vec2 uv = vUv;
      float t = time;
      
      // Create multiple lightning channels
      float electric = 0.0;
      
      // More lightning bolts for denser effect
      for (int i = 0; i < 8; i++) {
        float seed = float(i) * 1.618;
        float bolt = lightningBolt(uv, t, seed);
        electric = max(electric, bolt * (1.0 - float(i) * 0.08));
      }
      
      // Add concentrated lightning areas with more intensity
      electric = max(electric, lightningBolt(uv, t * 0.8, 10.0) * 1.6);
      electric = max(electric, lightningBolt(uv, t * 1.2, 20.0) * 1.3);
      electric = max(electric, lightningBolt(uv, t * 0.6, 30.0) * 1.4);
      
      // Mouse interaction - create lightning surge near pointer
      if (length(pointer) > 0.1) {
        float pointerDist = length(uv - pointer);
        float surge = exp(-pointerDist * 6.0) * 0.8;
        electric += surge;
      }
      
      // Stronger overall pulsing
      float pulse = 0.85 + sin(t * speed * 2.5) * 0.15;
      electric *= pulse;
      
      if (electric < 0.02) {
        gl_FragColor = vec4(0.0);
        return;
      }
      
      // Create more vibrant lightning colors
      vec3 finalColor = vec3(0.0);
      
      // Much brighter white-blue core
      float coreStrength = pow(electric, 0.25);
      finalColor += vec3(3.0, 3.0, 3.5) * coreStrength * intensity * 2.0;
      
      // More vibrant colored plasma glow
      float plasmaGlow = pow(electric, 0.5);
      finalColor += color * plasmaGlow * intensity * 2.0;
      
      // Stronger outer atmospheric glow
      float atmosphericGlow = pow(electric, 1.0);
      finalColor += color * 1.2 * atmosphericGlow * intensity * 1.0;
      
      // Add extra bright spots
      float brightSpots = pow(electric, 0.1);
      finalColor += vec3(1.0) * brightSpots * intensity * 0.5;
      
      // More dramatic electric flicker
      float flicker = 0.8 + sin(t * 18.0) * 0.2;
      finalColor *= flicker;
      
      // Increase overall brightness and opacity
      gl_FragColor = vec4(finalColor, min(1.0, electric * 1.2));
    }`;

const ElectricMesh: React.FC<{
  color: string;
  speed: number;
  intensity: number;
  thickness: number;
  noise: number;
  mousePos: { x: number; y: number };
}> = ({ color, speed, intensity, thickness, noise, mousePos }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      resolution: { value: new THREE.Vector2() },
      pointer: { value: new THREE.Vector2() },
      color: { value: new THREE.Color(color) },
      intensity: { value: intensity },
      thickness: { value: thickness },
      noise: { value: noise },
      speed: { value: speed },
    }),
    [color, intensity, thickness, noise, speed]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.pointer.value.set(mousePos.x, mousePos.y);
      materialRef.current.uniforms.resolution.value.set(state.viewport.width, state.viewport.height);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
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

type ElectricBorderCleanProps = PropsWithChildren<{
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
 * ElectricBorderClean - Clean implementation using shaderMaterial pattern
 */
const ElectricBorderClean: React.FC<ElectricBorderCleanProps> = ({
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
  const mousePos = useRef({ x: -10, y: -10 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height; // Flip Y for UV space
    mousePos.current = { x, y };
  };

  const handleMouseLeave = () => {
    mousePos.current = { x: -10, y: -10 };
  };

  const containerStyle: CSSProperties = {
    ...style,
    position: 'relative',
    isolation: 'isolate',
    padding: '12px',
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

  const glowStyle: CSSProperties = {
    position: 'absolute',
    inset: -40,  // Increased from -30
    borderRadius: style?.borderRadius || 'inherit',
    background: `radial-gradient(circle at center, ${color}66 0%, ${color}33 25%, ${color}11 50%, transparent 70%)`,  // Stronger glow
    filter: 'blur(40px)',  // Increased blur
    pointerEvents: 'none',
    opacity: disabled ? 0 : intensity * 0.9,  // Increased opacity
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
            mousePos={mousePos.current}
          />
        </Canvas>
      </div>
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default ElectricBorderClean;