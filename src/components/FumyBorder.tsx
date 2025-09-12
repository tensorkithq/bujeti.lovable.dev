import React, { useEffect, useRef, useState, PropsWithChildren, CSSProperties } from 'react';
import * as THREE from 'three';

// Vertex shader - simple pass-through for full-screen triangle
const vertexShader = `
  attribute vec3 position;
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

// Fragment shader with enhanced electric border effects
const fragmentShader = `
  #ifdef GL_ES
  precision highp float;
  #endif
  
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 hoverPos;
  uniform float hoverStrength;
  uniform vec3 color;
  uniform float intensity;
  uniform float thickness;
  uniform float noise;
  uniform float speed;
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  
  // Improved noise function for more chaotic patterns
  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 34.123);
    return fract(p.x * p.y);
  }
  
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  
  // Distance to border edges
  float edgeDistance(vec2 uv) {
    return min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  }
  
  // Determine which edge we're closest to and position along that edge
  float borderPosition(vec2 uv, float edgeDist) {
    float distLeft = uv.x;
    float distRight = 1.0 - uv.x;
    float distTop = 1.0 - uv.y;
    float distBottom = uv.y;
    
    if (edgeDist == distBottom) {
      return uv.x; // Bottom edge: 0-1
    } else if (edgeDist == distRight) {
      return 1.0 + uv.y; // Right edge: 1-2
    } else if (edgeDist == distTop) {
      return 3.0 - uv.x; // Top edge: 2-3 (reversed)
    } else { // left edge
      return 4.0 - uv.y; // Left edge: 3-4 (reversed)
    }
  }
  
  // Enhanced lightning bolt with multiple arc patterns
  float enhancedLightning(vec2 uv, float t, float seed, float arcIntensity) {
    float eDist = edgeDistance(uv);
    if (eDist > thickness * 50.0) return 0.0; // Increased range for better glow
    
    float borderPos = borderPosition(uv, eDist);
    
    // Primary lightning arc traveling around border
    float flow = t * speed * 2.0 + seed * 6.28;
    float phase = borderPos * 0.5 + flow;
    
    // Multiple frequency lightning patterns
    float mainArc = sin(phase) * 0.8 + 0.2;
    mainArc *= sin(phase * 1.3 + seed) * 0.6 + 0.7;
    
    // Add chaotic noise displacement
    vec2 noiseCoord = uv * 20.0 + vec2(flow * 0.5, seed * 2.0);
    float chaosNoise = vnoise(noiseCoord) * 2.0 - 1.0;
    mainArc += chaosNoise * noise * 0.3;
    
    // Secondary branching arcs
    float branch1 = sin(phase * 3.7 + seed * 1.5) * 0.5 + 0.5;
    branch1 = smoothstep(0.7, 1.0, branch1) * 0.8;
    
    float branch2 = sin(phase * 2.1 - seed * 2.3) * 0.5 + 0.5;
    branch2 = smoothstep(0.75, 1.0, branch2) * 0.6;
    
    float branch3 = sin(phase * 5.3 + seed * 0.7) * 0.5 + 0.5;
    branch3 = smoothstep(0.8, 1.0, branch3) * 0.4;
    
    // Combine all arc patterns
    float combinedLightning = clamp(mainArc + branch1 + branch2 + branch3, 0.0, 2.0);
    combinedLightning = pow(combinedLightning, 0.6) * arcIntensity;
    
    // Enhanced falloff for better glow distribution
    float innerFalloff = 1.0 - smoothstep(0.0, thickness * 15.0, eDist);
    float outerGlow = 1.0 - smoothstep(0.0, thickness * 45.0, eDist);
    outerGlow = pow(outerGlow, 2.0) * 0.3;
    
    float totalFalloff = innerFalloff + outerGlow;
    
    return combinedLightning * totalFalloff;
  }
  
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float t = time;
    
    float totalElectric = 0.0;
    
    // Multiple lightning layers with different characteristics
    for (int i = 0; i < 12; i++) {
      float seed = float(i) * 1.618 + 100.0;
      float layerIntensity = 1.0 - float(i) * 0.06;
      float speedMult = 1.0 + float(i) * 0.2;
      
      float layer = enhancedLightning(uv, t * speedMult, seed, layerIntensity);
      totalElectric = max(totalElectric, layer);
    }
    
    // Add concentrated high-intensity arcs
    totalElectric = max(totalElectric, enhancedLightning(uv, t * 0.7, 50.0, 2.0));
    totalElectric = max(totalElectric, enhancedLightning(uv, t * 1.4, 75.0, 1.5));
    totalElectric = max(totalElectric, enhancedLightning(uv, t * 0.9, 25.0, 1.8));
    
    // Enhanced mouse interaction
    if (length(hoverPos) > 0.1) {
      float pointerDist = length(uv - hoverPos);
      float surgeMask = exp(-pointerDist * 4.0);
      float surgePattern = sin(t * 25.0 + pointerDist * 15.0) * 0.5 + 0.5;
      float surge = surgeMask * surgePattern * hoverStrength * 0.8;
      totalElectric += surge;
    }
    
    // Dynamic pulsing with multiple frequencies
    float basePulse = 0.7 + sin(t * speed * 3.0) * 0.2;
    float highFreqPulse = 0.9 + sin(t * speed * 12.0) * 0.1;
    float combinedPulse = basePulse * highFreqPulse;
    totalElectric *= combinedPulse;
    
    // Early exit for very low values
    if (totalElectric < 0.01) {
      gl_FragColor = vec4(0.0);
      return;
    }
    
    // Enhanced color system matching reference image
    vec3 finalColor = vec3(0.0);
    
    // Primary colored plasma layer - no white core
    float primaryGlow = pow(totalElectric, 0.35);
    finalColor += color * primaryGlow * intensity * 1.5;
    
    // Secondary colored glow extending outward
    float secondaryGlow = pow(totalElectric, 0.6);
    finalColor += color * 0.8 * secondaryGlow * intensity * 0.8;
    
    // Atmospheric outer glow
    float atmosphericGlow = pow(totalElectric, 1.2);
    finalColor += color * 0.4 * atmosphericGlow * intensity * 0.5;
    
    // High-frequency electric flicker
    float rapidFlicker = 0.85 + sin(t * 30.0) * 0.15;
    float slowFlicker = 0.9 + sin(t * 8.0) * 0.1;
    finalColor *= rapidFlicker * slowFlicker;
    
    // Reduced alpha for more transparency
    float alpha = clamp(totalElectric * 0.05, 0.0, 2.0);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

type FumyBorderProps = PropsWithChildren<{
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
 * FumyBorder - Realistic electric border using raw Three.js
 * 
 * Creates a true electric/lightning border effect with dynamic plasma-like
 * animations using WebGL shaders for maximum realism and performance.
 */
const FumyBorder: React.FC<FumyBorderProps> = ({
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
  const mountRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: -10, y: -10 });

  const hexToRgba = (hex: string, alpha: number): string => {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${alpha})`;
    }
    return `rgba(255, 255, 255, ${alpha})`; // fallback
  };

  useEffect(() => {
    if (!mountRef.current || disabled) return;

    const mount = mountRef.current;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      premultipliedAlpha: false
    });
    
    renderer.setClearColor(0x000000, 0);
    renderer.getContext().enable(renderer.getContext().BLEND);
    renderer.getContext().blendFunc(renderer.getContext().SRC_ALPHA, renderer.getContext().ONE_MINUS_SRC_ALPHA);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.pointerEvents = 'none';
    mount.appendChild(renderer.domElement);

    // Create scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Create full-screen triangle geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));

    // Parse color
    const parseColor = (hexColor: string) => {
      let c = hexColor.trim();
      if (c[0] === '#') c = c.slice(1);
      if (c.length === 3) c = c.split('').map(x => x + x).join('');
      let n = parseInt(c, 16);
      if (isNaN(n)) n = 0x7df9ff;
      const r = ((n >> 16) & 255) / 255;
      const g = ((n >> 8) & 255) / 255;
      const b = (n & 255) / 255;
      return new THREE.Vector3(r, g, b);
    };

    // Create uniforms
    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(1, 1) },
      hoverPos: { value: new THREE.Vector2(-10, -10) },
      hoverStrength: { value: 0 },
      color: { value: parseColor(color) },
      intensity: { value: intensity },
      thickness: { value: thickness },
      noise: { value: noise },
      speed: { value: speed }
    };

    // Create material
    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    let hoverStrength = 0;

    // Handle sizing
    const setSize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      const pixelRatio = Math.min(window.devicePixelRatio ?? 1, 2);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(w, h, false);
      uniforms.resolution.value.set(w * pixelRatio, h * pixelRatio);
    };

    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(mount);

    // Handle mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // Flip Y for UV space
      mousePos.current = { x, y };

      if (maskRef.current) {
        const maskRect = maskRef.current.getBoundingClientRect();
        const x_px = e.clientX - maskRect.left;
        const y_px = e.clientY - maskRect.top;
        maskRef.current.style.setProperty('--mx', `${x_px}px`);
        maskRef.current.style.setProperty('--my', `${y_px}px`);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      mousePos.current = { x: -10, y: -10 };
    };

    mount.addEventListener('mousemove', handleMouseMove);
    mount.addEventListener('mouseenter', handleMouseEnter);
    mount.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    let raf = 0;
    const animate = () => {
      const t = clock.getElapsedTime();
      
      // Update uniforms
      uniforms.time.value = t;
      uniforms.color.value = parseColor(color);
      uniforms.intensity.value = intensity;
      uniforms.thickness.value = thickness;
      uniforms.noise.value = noise;
      uniforms.speed.value = speed;
      
      // Update hover
      const target = isHovering ? 1 : 0;
      hoverStrength += (target - hoverStrength) * 0.12;
      uniforms.hoverStrength.value = hoverStrength;
      uniforms.hoverPos.value.set(mousePos.current.x, mousePos.current.y);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mount.removeEventListener('mousemove', handleMouseMove);
      mount.removeEventListener('mouseenter', handleMouseEnter);
      mount.removeEventListener('mouseleave', handleMouseLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [color, speed, intensity, thickness, noise, disabled]);

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
    zIndex: 10, // Ensure canvas is on top
  };

  // Canvas container with proper border radius masking
  const canvasContainerStyle: CSSProperties = {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    width: 'calc(100% + 16px)',
    height: 'calc(100% + 16px)',
    borderRadius: style?.borderRadius || 'inherit',
    overflow: 'hidden', // This will clip the canvas content to respect border radius
    zIndex: 10,
    pointerEvents: 'none',
  };

  const contentStyle: CSSProperties = {
    position: 'relative',
    borderRadius: Number(style?.borderRadius) - 4 || 'inherit',
    zIndex: 20, // Above the inner mask
    background: 'transparent',
    padding: '2px',
  };

  // Calculate proper inner border radius to match container proportionally
  const calculateInnerBorderRadius = (): string => {
    const containerRadius = style?.borderRadius;
    
    if (!containerRadius) return '8px'; // Default fallback
    
    // Handle different border radius formats
    if (typeof containerRadius === 'string') {
      // Extract numeric value and unit
      const match = containerRadius.match(/^(\d+(?:\.\d+)?)(px|rem|em|%)?$/);
      if (match) {
        const value = parseFloat(match[1]);
        const unit = match[2] || 'px';
        
        // For percentage-based inset (10% from each side), reduce radius proportionally
        // Inner element is 80% the size of outer, so reduce radius by ~20%
        if (unit === '%') {
          return `${Math.max(0, value * 0.8)}${unit}`;
        } else {
          // For pixel/rem/em values, subtract a fixed amount for the 10% inset
          const reducedValue = Math.max(0, value - 8); // Reduce by 8px for 10% inset
          return `${reducedValue}${unit}`;
        }
      }
      
      // Handle complex border radius (e.g., "16px 8px")
      if (containerRadius.includes(' ')) {
        return containerRadius
          .split(' ')
          .map(radius => {
            const match = radius.match(/^(\d+(?:\.\d+)?)(px|rem|em|%)?$/);
            if (match) {
              const value = parseFloat(match[1]);
              const unit = match[2] || 'px';
              if (unit === '%') {
                return `${Math.max(0, value * 0.8)}${unit}`;
              } else {
                return `${Math.max(0, value - 8)}${unit}`;
              }
            }
            return radius;
          })
          .join(' ');
      }
    }
    
    if (typeof containerRadius === 'number') {
      return `${Math.max(0, containerRadius - 8)}px`;
    }
    
    return '8px'; // Fallback
  };

  // Inner mask that covers 95% of the electric border, leaving outer 5% visible (19/20)
  const innerMaskStyle: CSSProperties = {
    position: 'absolute',
    top: '1%',
    left: '1%',
    right: '1%',
    bottom: '1%',
    borderRadius: calculateInnerBorderRadius(),
    background: 'transparent',
    zIndex: 15, // Above the electric canvas (zIndex: 10) but below content
    border: `0.5px solid ${color}cc`, // Brighter, thicker border
    boxShadow: `0 0 12px ${color}99, 0 0 24px ${color}66`, // Strong glow effect
    pointerEvents: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
    // Mesh effect styles
    backgroundImage: `
      radial-gradient(circle, ${hexToRgba(color, 0.5)} 1px, transparent 1px),
      radial-gradient(circle, ${hexToRgba(color, 0.3)} 1px, transparent 1px)
    `,
    backgroundSize: "20px 20px, 10px 10px",
    backgroundPosition: "0 0, 5px 5px",
    mixBlendMode: "overlay",
    opacity: isHovering ? 1 : 0.4,
    // Spotlight mask effect
    WebkitMaskImage:
      "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,1) 0px, rgba(255,255,255,0.9) 80px, rgba(255,255,255,0.5) 160px, rgba(255,255,255,0) 240px)",
    maskImage:
      "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,1) 0px, rgba(255,255,255,0.9) 80px, rgba(255,255,255,0.5) 160px, rgba(255,255,255,0) 240px)",
  };

  // Simplified glow system - reduced intensity for electric focus
  const outerGlowStyle: CSSProperties = {
    position: 'absolute',
    inset: -35,
    borderRadius: style?.borderRadius || 'inherit',
    background: `radial-gradient(circle at center, ${color}25 0%, ${color}12 40%, transparent 70%)`,
    filter: 'blur(25px)',
    pointerEvents: 'none',
    opacity: disabled ? 0.2 : intensity * 0.6, // Show a subtle glow when disabled
    zIndex: 0,
    transition: 'opacity 0.3s ease',
  };

  const innerGlowStyle: CSSProperties = {
    position: 'absolute',
    inset: -20,
    borderRadius: style?.borderRadius || 'inherit',
    background: `radial-gradient(circle at center, ${color}40 0%, ${color}25 30%, transparent 60%)`,
    filter: 'blur(15px)',
    pointerEvents: 'none',
    boxShadow: `0 0 2px ${color}99, 0 0 4px ${color}03`, 
    opacity: disabled ? 0.25 : intensity * 0.6, // Show a subtle glow when disabled
    zIndex: 1,
    transition: 'opacity 0.3s ease',
  };


  if (disabled) {
    return (
      <div className={className} style={containerStyle}>
        <div style={{ 
          ...contentStyle, 
          border: `0px solid ${color}33`,
        }}>
          {children}
        </div>
      </div>
    );
  }


  return (
    <div className={className} style={containerStyle}>
      {/* Simplified glow system */}
      <div style={outerGlowStyle} />
      <div style={innerGlowStyle} />
      
      {/* Electric border WebGL canvas with border radius masking */}
      <div style={canvasContainerStyle}>
        <div ref={mountRef} style={canvasStyle} />
      </div>
      
      {/* Inner mask covering 95% (19/20) */}
      <div ref={maskRef} style={innerMaskStyle} />
      
      {/* Content */}
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default FumyBorder;