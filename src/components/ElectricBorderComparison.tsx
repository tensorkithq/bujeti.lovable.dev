import React, { useState } from 'react';
import ElectricBorderThree from './ElectricBorderThree';
import ElectricBorderClean from './ElectricBorderClean';

/**
 * Comparison component to test performance of ElectricBorder implementations
 */
const ElectricBorderComparison: React.FC = () => {
  const [version, setVersion] = useState<'clean' | 'three'>('three');
  const [disabled, setDisabled] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'common' | 'rare' | 'epic'>('rare');
  
  const cardStyle = {
    padding: '3rem 2.5rem',
    background: 'rgba(10, 10, 20, 0.6)',
    color: 'white',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  };

  const tierCardStyle = {
    ...cardStyle,
    backdropFilter: 'blur(10px)',
    borderRadius: 24,
    background: 'linear-gradient(135deg, rgba(10, 10, 20, 0.95) 0%, rgba(15, 15, 25, 0.95) 100%)',
  };

  // Much more intense electric border settings
  const getElectricProps = (tier: 'common' | 'rare' | 'epic') => {
    const baseProps = {
      speed: version === 'three' ? 1.5 : 1.8,  // Good animation speed
      thickness: version === 'three' ? 0.06 : 0.035,  // Thicker for better visibility
      intensity: 4.0,  // Very high intensity
      noise: 1.0,  // Full noise for organic movement
      style: { borderRadius: 24 },
      disabled
    };

    // Different colors for each tier - using very bright colors
    switch(tier) {
      case 'common':
        return { ...baseProps, color: '#c084fc' }; // Bright purple
      case 'rare':
        return { ...baseProps, color: '#60a5fa' }; // Bright blue
      case 'epic':
        return { ...baseProps, color: '#fb7185' }; // Bright pink-red
      default:
        return { ...baseProps, color: '#60a5fa' };
    }
  };

  const ElectricBorder = version === 'three' ? ElectricBorderThree : ElectricBorderClean;

  return (
    <div style={{ 
      padding: '2rem', 
      background: 'linear-gradient(180deg, #000000 0%, #0a0a1a 50%, #000000 100%)', 
      minHeight: '100vh' 
    }}>
      <h1 style={{ color: 'white', marginBottom: '2rem', fontSize: '2.5rem', textAlign: 'center' }}>
        Electric Border Implementation Comparison
      </h1>
      
      <div style={{ marginBottom: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          onClick={() => setVersion('three')}
          style={{
            padding: '0.75rem 1.5rem',
            background: version === 'three' ? '#0ea5e9' : '#1a1a2a',
            color: version === 'three' ? '#000' : '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          ElectricBorderThree (Interactive)
        </button>
        
        <button 
          onClick={() => setVersion('clean')}
          style={{
            padding: '0.75rem 1.5rem',
            background: version === 'clean' ? '#0ea5e9' : '#1a1a2a',
            color: version === 'clean' ? '#000' : '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          ElectricBorderClean (Optimized)
        </button>
        
        <button 
          onClick={() => setDisabled(!disabled)}
          style={{
            padding: '0.75rem 1.5rem',
            background: disabled ? '#ff4444' : '#44ff44',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          {disabled ? 'Enable Animations' : 'Disable Animations'}
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', 
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Common Tier */}
        <div style={{ 
          opacity: selectedTier === 'common' ? 1 : 0.6, 
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onClick={() => setSelectedTier('common')}>
          {selectedTier === 'common' ? (
            <ElectricBorder {...getElectricProps('common')}>
              <div style={tierCardStyle}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.9, margin: 0 }}>Common</h3>
                </div>
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: '700', lineHeight: 1 }}>
                    $0<span style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.7 }}>/monthly</span>
                  </div>
                </div>
                <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: 1.5, margin: 0 }}>
                  For individuals and teams getting started with Huly.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#44ff88' }}>✓</span> Unlimited users
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#44ff88' }}>✓</span> Unlimited Huly Objects
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#44ff88' }}>✓</span> 10GB Storage per Workspace
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#44ff88' }}>✓</span> 10GB Video/Audio Traffic
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#44ff88' }}>✓</span> AI — TBD
                  </div>
                </div>
                <button style={{
                  width: '100%',
                  padding: '1rem',
                  marginTop: '1.5rem',
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  Start Free
                </button>
              </div>
            </ElectricBorder>
          ) : (
            <div style={{
              ...tierCardStyle,
              border: '1px solid rgba(159, 122, 234, 0.2)',
              boxShadow: '0 0 30px rgba(159, 122, 234, 0.1)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.9, margin: 0 }}>Common</h3>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: '700', lineHeight: 1 }}>
                  $0<span style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.7 }}>/monthly</span>
                </div>
              </div>
              <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: 1.5, margin: 0 }}>
                For individuals and teams getting started with Huly.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#44ff88' }}>✓</span> Unlimited users
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#44ff88' }}>✓</span> Unlimited Huly Objects
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#44ff88' }}>✓</span> 10GB Storage per Workspace
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#44ff88' }}>✓</span> 10GB Video/Audio Traffic
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#44ff88' }}>✓</span> AI — TBD
                </div>
              </div>
              <button style={{
                width: '100%',
                padding: '1rem',
                marginTop: '1.5rem',
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Start Free
              </button>
            </div>
          )}
        </div>

        {/* Rare Tier - Featured with Blue Electric Border */}
        <div style={{ 
          opacity: selectedTier === 'rare' ? 1 : 0.6, 
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          transform: selectedTier === 'rare' ? 'scale(1.02)' : 'scale(1)'
        }}
        onClick={() => setSelectedTier('rare')}>
          {selectedTier === 'rare' ? (
            <ElectricBorder {...getElectricProps('rare')}>
              <div style={tierCardStyle}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.9, margin: 0 }}>Rare</h3>
                </div>
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: '700', lineHeight: 1 }}>
                    $19<span style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.7 }}>.99 /monthly</span>
                  </div>
                </div>
                <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: 1.5, margin: 0 }}>
                  For individual creatives, freelancers, and micro-agencies.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#44ff88' }}>✓</span> Unlimited users
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#44ff88' }}>✓</span> Unlimited Huly Objects
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#44ff88' }}>✓</span> 100GB Storage
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#44ff88' }}>✓</span> 100GB Video / Audio Traffic
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#44ff88' }}>✓</span> AI — TBD
                  </div>
                </div>
                <button style={{
                  width: '100%',
                  padding: '1rem',
                  marginTop: '1.5rem',
                  background: 'white',
                  color: 'black',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  Start Free
                </button>
              </div>
            </ElectricBorder>
          ) : (
            <div style={{
              ...tierCardStyle,
              border: '1px solid rgba(14, 165, 233, 0.2)',
              boxShadow: '0 0 30px rgba(14, 165, 233, 0.1)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.9, margin: 0 }}>Rare</h3>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: '700', lineHeight: 1 }}>
                  $19<span style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.7 }}>.99 /monthly</span>
                </div>
              </div>
              <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: 1.5, margin: 0 }}>
                For individual creatives, freelancers, and micro-agencies.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#44ff88' }}>✓</span> Unlimited users
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#44ff88' }}>✓</span> Unlimited Huly Objects
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#44ff88' }}>✓</span> 100GB Storage
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#44ff88' }}>✓</span> 100GB Video / Audio Traffic
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#44ff88' }}>✓</span> AI — TBD
                </div>
              </div>
              <button style={{
                width: '100%',
                padding: '1rem',
                marginTop: '1.5rem',
                background: 'white',
                color: 'black',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Start Free
              </button>
            </div>
          )}
        </div>

        {/* Epic Tier with Pink/Magenta Electric Border */}
        <div style={{ 
          opacity: selectedTier === 'epic' ? 1 : 0.6, 
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onClick={() => setSelectedTier('epic')}>
          {selectedTier === 'epic' ? (
            <ElectricBorder {...getElectricProps('epic')}>
              <div style={tierCardStyle}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.9, margin: 0 }}>Epic</h3>
                </div>
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: '700', lineHeight: 1 }}>
                    $99<span style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.7 }}>.99 /monthly</span>
                  </div>
                </div>
                <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: 1.5, margin: 0 }}>
                  For professional creative companies and small businesses.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#44ff88' }}>✓</span> Unlimited users
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#44ff88' }}>✓</span> Unlimited Huly Objects
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#44ff88' }}>✓</span> 1TB Storage
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#44ff88' }}>✓</span> 500GB Video / Audio Traffic
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#44ff88' }}>✓</span> AI — TBD
                  </div>
                </div>
                <button style={{
                  width: '100%',
                  padding: '1rem',
                  marginTop: '1.5rem',
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  Start Free
                </button>
              </div>
            </ElectricBorder>
          ) : (
            <div style={{
              ...tierCardStyle,
              border: '1px solid rgba(236, 72, 153, 0.2)',
              boxShadow: '0 0 30px rgba(236, 72, 153, 0.1)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.9, margin: 0 }}>Epic</h3>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: '700', lineHeight: 1 }}>
                  $99<span style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.7 }}>.99 /monthly</span>
                </div>
              </div>
              <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: 1.5, margin: 0 }}>
                For professional creative companies and small businesses.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#44ff88' }}>✓</span> Unlimited users
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#44ff88' }}>✓</span> Unlimited Huly Objects
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#44ff88' }}>✓</span> 1TB Storage
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#44ff88' }}>✓</span> 500GB Video / Audio Traffic
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#44ff88' }}>✓</span> AI — TBD
                </div>
              </div>
              <button style={{
                width: '100%',
                padding: '1rem',
                marginTop: '1.5rem',
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Start Free
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: '4rem', color: 'white', maxWidth: '1200px', margin: '4rem auto' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Implementation Strategies:</h2>
        
        {version === 'three' && (
          <div style={{ lineHeight: '1.8' }}>
            <h3 style={{ color: '#7df9ff', marginTop: '2rem' }}>ElectricBorderThree - Interactive Hover Effects</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li><strong>Strategy:</strong> Mouse-aware WebGL shaders with hover position tracking</li>
              <li><strong>Hover Detection:</strong> Tracks cursor position and maps to UV coordinates</li>
              <li><strong>Dynamic Response:</strong> Lightning intensifies and follows cursor along border path</li>
              <li><strong>Performance:</strong> GPU-accelerated with minimal CPU overhead</li>
              <li><strong>Visual Effect:</strong> Creates localized "surge" effect that travels along the border</li>
              <li><strong>Smooth Transitions:</strong> Uses easing functions for natural hover enter/leave animations</li>
            </ul>
          </div>
        )}
        
        {version === 'clean' && (
          <div style={{ lineHeight: '1.8' }}>
            <h3 style={{ color: '#7df9ff', marginTop: '2rem' }}>ElectricBorderClean - Optimized Shader Pattern</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li><strong>Strategy:</strong> Clean shaderMaterial pattern with simplified noise algorithms</li>
              <li><strong>Optimization:</strong> Reduced shader complexity for better mobile performance</li>
              <li><strong>Mouse Interaction:</strong> Creates radial surge effect at cursor position</li>
              <li><strong>Border Flow:</strong> Continuous parameter mapping for seamless lightning flow</li>
              <li><strong>Visual Quality:</strong> Multi-layer compositing for realistic plasma glow</li>
              <li><strong>Efficiency:</strong> Single mesh render with additive blending</li>
            </ul>
          </div>
        )}

        <h3 style={{ marginTop: '2rem', color: '#ff7df9' }}>Key Differences:</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '1.5rem' }}>
          <li><strong>ElectricBorderThree:</strong> Superior hover interaction with border-following surge effect</li>
          <li><strong>ElectricBorderClean:</strong> Cleaner implementation with radial mouse interaction</li>
          <li><strong>Both versions:</strong> WebGL-powered for authentic lightning simulation</li>
          <li><strong>Visual fidelity:</strong> Real plasma physics simulation vs CSS approximations</li>
          <li><strong>Performance:</strong> GPU-accelerated rendering for smooth 60fps</li>
        </ul>

        <p style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.7 }}>
          Click on any card to see the electric border effect. The selected card will display the animated electric border using the current implementation strategy.
        </p>
      </div>
    </div>
  );
};

export default ElectricBorderComparison;