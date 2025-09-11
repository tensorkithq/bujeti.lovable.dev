import React, { useEffect, useRef, PropsWithChildren, CSSProperties } from 'react';
import * as THREE from 'three';

// Vertex shader - simple pass-through for full-screen triangle
const vertexShader = `
  attribute vec3 position;
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

// Fragment shader combining border-following logic with laser/wisp effects
const fragmentShader = `
  #ifdef GL_ES
  precision highp float;
  #endif
  
  uniform float time;
  uniform vec2 resolution;
  uniform vec3 color;
  uniform float intensity;
  uniform float thickness;
  uniform float speed;
  uniform float wispDensity;
  uniform float wispSpeed;
  uniform float wispIntensity;

  // --- Constants for Wisps (from LaserFlow) ---
  #define W_LANES 55
  #define W_SIDE_DECAY 0.5
  #define W_AA 0.01 // Adjusted for border thickness context
  #define W_CELL 10.0 // Adjusted for border perimeter context
  #define W_SEG_MIN 0.01
  #define W_SEG_MAX 0.55
  #define W_BASE_X 1.5
  #define W_LAYER_GAP 0.25
  
  // --- Hash function (from ElectricBorderThree) ---
  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 34.123);
    return fract(p.x * p.y);
  }

  // --- Rectangular Gate function for wisps (from LaserFlow) ---
  float rGate(float x, float l) {
    float a = smoothstep(0.0, W_AA, x);
    float b = 1.0 - smoothstep(l, l + W_AA, x);
    return max(0.0, a * b);
  }
  
  // --- Border logic (from ElectricBorderThree) ---
  float edgeDistance(vec2 uv) {
    return min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  }
  
  float borderPosition(vec2 uv, float edgeDist) {
    float distLeft = uv.x;
    float distRight = 1.0 - uv.x;
    float distTop = 1.0 - uv.y;
    float distBottom = uv.y;
    
    if (edgeDist == distBottom) return uv.x; // Bottom: 0-1
    if (edgeDist == distRight) return 1.0 + uv.y; // Right: 1-2
    if (edgeDist == distTop) return 3.0 - uv.x; // Top: 2-3 (reversed)
    return 4.0 - uv.y; // Left: 3-4 (reversed)
  }

  // --- Wisp generation, adapted for the border ---
  float borderWisps(float borderPos, float edgeDist, float t) {
    float flow_coord = borderPos * 5.0; // Scale perimeter from 0-4 to something larger
    float yf = (flow_coord - t * wispSpeed) / W_CELL;

    float dRaw = clamp(wispDensity, 0.0, 2.0);
    float d = dRaw <= 0.0 ? 1.0 : dRaw;
    float lanesF = floor(float(W_LANES) * min(d, 1.0) + 0.5);
    int lanes = int(max(1.0, lanesF));
    float sp = min(d, 1.0), ep = max(d - 1.0, 0.0);

    float sum = 0.0;

    for (int i = 0; i < W_LANES; ++i) {
        if (i >= lanes) break;

        float off = W_BASE_X + float(i) * W_LAYER_GAP;
        // Position wisps across the thickness of the border
        float xc = off * thickness * 0.15;
        
        float dx = abs(edgeDist - xc);
        // Use thickness to make the lateral falloff proportional
        float lat = 1.0 - smoothstep(thickness * 0.05, thickness * 0.05 + W_AA * 5.0, dx);
        float amp = exp(-off * W_SIDE_DECAY);

        float seed = hash21(vec2(off, float(i) * 17.0));
        float yf2 = yf + seed * 7.0;
        float ci = floor(yf2);
        float fy = fract(yf2);

        float seg = mix(W_SEG_MIN, W_SEG_MAX, hash21(vec2(ci, off * 2.3)));
        float spR = hash21(vec2(ci, off + float(i) * 31.0));
        float seg1 = rGate(fy, seg) * step(spR, sp);

        if (ep > 0.0) {
            float spR2 = hash21(vec2(ci * 3.1 + 7.0, off * 5.3 + float(i) * 13.0));
            float f2 = fract(fy + 0.5);
            seg1 += rGate(f2, seg * 0.9) * step(spR2, ep);
        }
        sum += amp * lat * seg1;
    }
    return wispIntensity * sum;
  }
  
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float t = time;
    
    float eDist = edgeDistance(uv);
    // Early exit if fragment is far from the border
    if (eDist > thickness * 50.0) {
      gl_FragColor = vec4(0.0);
      return;
    }

    float borderPos = borderPosition(uv, eDist);
    
    // --- Main Laser Beam ---
    float flow = mod(t * speed, 4.0); // 4.0 is perimeter length
    float dist_from_head = min(abs(borderPos - flow), 4.0 - abs(borderPos - flow));
    
    float beamWidth = 1.2;
    float beam = smoothstep(beamWidth, 0.0, dist_from_head);
    beam = pow(beam, 2.5);
    beam *= 0.8 + 0.2 * sin(-t * speed * 8.0); // Pulsing

    // --- Wisps ---
    float wisps = borderWisps(borderPos, eDist, t);

    // --- Combine and apply falloff ---
    float falloff = 1.0 - smoothstep(0.0, thickness * 20.0, eDist);
    falloff = pow(falloff, 1.5);

    float total_effect = (beam + wisps * 0.5) * falloff;

    if (total_effect < 0.01) {
      gl_FragColor = vec4(0.0);
      return;
    }

    vec3 finalColor = color * total_effect * intensity;
    float alpha = clamp(total_effect * 1.5, 0.0, 1.0);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

type LaserBorderProps = PropsWithChildren<{
  color?: string;
  speed?: number;
  intensity?: number;
  thickness?: number;
  wispDensity?: number;
  wispSpeed?: number;
  wispIntensity?: number;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}>;

/**
 * LaserBorder - A flowing laser border effect that wraps its children.
 * 
 * Creates a laser-like border with dynamic wisp particles that continuously
 * flows around the component's border using a WebGL shader.
 */
const LaserBorder: React.FC<LaserBorderProps> = ({
  children,
  color = '#ff79c6', // Default to a pink laser color
  speed = 0.5,
  intensity = 1.5,
  thickness = 0.01,
  wispDensity = 1.0,
  wispSpeed = 8.0,
  wispIntensity = 4.0,
  className = '',
  style,
  disabled = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || disabled) return;

    const mount = mountRef.current;
    
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      premultipliedAlpha: false // Crucial for correct alpha blending
    });
    
    renderer.setClearColor(0x000000, 0);
    // Explicitly set blend function to match working examples
    renderer.getContext().blendFunc(renderer.getContext().SRC_ALPHA, renderer.getContext().ONE_MINUS_SRC_ALPHA);

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.pointerEvents = 'none';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));

    const parseColor = (hexColor: string) => {
      let c = hexColor.trim();
      if (c[0] === '#') c = c.slice(1);
      if (c.length === 3) c = c.split('').map(x => x + x).join('');
      let n = parseInt(c, 16);
      if (isNaN(n)) n = 0xff79c6;
      const r = ((n >> 16) & 255) / 255;
      const g = ((n >> 8) & 255) / 255;
      const b = (n & 255) / 255;
      return new THREE.Vector3(r, g, b);
    };

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(1, 1) },
      color: { value: parseColor(color) },
      intensity: { value: intensity },
      thickness: { value: thickness },
      speed: { value: speed },
      wispDensity: { value: wispDensity },
      wispSpeed: { value: wispSpeed },
      wispIntensity: { value: wispIntensity },
    };

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending // Use NormalBlending for more predictable alpha compositing
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();

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

    let raf = 0;
    const animate = () => {
      const t = clock.getElapsedTime();
      
      uniforms.time.value = t;
      uniforms.color.value = parseColor(color);
      uniforms.intensity.value = intensity;
      uniforms.thickness.value = thickness;
      uniforms.speed.value = speed;
      uniforms.wispDensity.value = wispDensity;
      uniforms.wispSpeed.value = wispSpeed;
      uniforms.wispIntensity.value = wispIntensity;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [color, speed, intensity, thickness, wispDensity, wispSpeed, wispIntensity, disabled]);

  const containerStyle: CSSProperties = {
    ...style,
    position: 'relative',
    isolation: 'isolate',
  };

  // This container will hold the canvas and clip it to the border radius.
  // It's positioned outside the main component area to make the border visible.
  const canvasContainerStyle: CSSProperties = {
    position: 'absolute',
    top: '-4px',
    left: '-4px',
    right: '-4px',
    bottom: '-4px',
    width: 'calc(100% + 8px)',
    height: 'calc(100% + 8px)',
    borderRadius: style?.borderRadius || 'inherit',
    overflow: 'hidden',
    zIndex: 0, // Positioned behind the content
    pointerEvents: 'none',
  };

  const canvasStyle: CSSProperties = {
    width: '100%',
    height: '100%',
  };

  const contentStyle: CSSProperties = {
    position: 'relative',
    zIndex: 1, // Positioned in front of the canvas
  };

  if (disabled) {
    return (
      <div className={className} style={{
        ...containerStyle,
        border: `2px solid ${color}33`,
        borderRadius: style?.borderRadius
      }}>
        <div style={contentStyle}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={containerStyle}>
      <div style={canvasContainerStyle}>
        <div ref={mountRef} style={canvasStyle} />
      </div>
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default LaserBorder; 