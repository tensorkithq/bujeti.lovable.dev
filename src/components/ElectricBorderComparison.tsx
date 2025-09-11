import React, { useState } from 'react';
import ElectricBorderThree from './ElectricBorderThree';
import WispyBorder from './WispyBorder';
import PricingCard from './PricingCard';

/**
 * Comparison component to test performance of ElectricBorder implementations
 */
const ElectricBorderComparison: React.FC = () => {
  const [disabled, setDisabled] = useState(false);

  // Pricing plans data
  const pricingPlans = {
    starter: {
      name: 'Starter',
      price: '$9',
      priceDetails: '.99',
      description: 'Perfect for individuals getting started with premium features.',
      features: [
        'Up to 5 projects',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'Mobile app access'
      ],
      buttonText: 'Start Free Trial',
      featured: false
    },
    professional: {
      name: 'Professional',
      price: '$29',
      priceDetails: '.99',
      description: 'Best for professionals and small teams who need advanced features.',
      features: [
        'Unlimited projects',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'Team collaboration',
        'Custom integrations'
      ],
      buttonText: 'Get Started',
      featured: true
    },
    enterprise: {
      name: 'Enterprise',
      price: '$99',
      priceDetails: '.99',
      description: 'Comprehensive solution for large organizations with custom needs.',
      features: [
        'Unlimited everything',
        '1TB storage',
        'Enterprise analytics',
        'Dedicated support',
        'Advanced security',
        'Custom development',
        'SLA guarantee'
      ],
      buttonText: 'Contact Sales',
      featured: false
    }
  };
  

  // Border effect configurations with different colors
  const getBorderProps = (color: string, borderType: 'electric' | 'laser') => {
    const baseElectricProps = {
      speed: 2.0,
      thickness: 0.015,
      intensity: 2.0,
      noise: 0.8,
      style: { borderRadius: "24px" },
      disabled,
      color
    };

    const baseLaserProps = {
      speed: 0.5,
      thickness: 0.012,
      intensity: 1.5,
      style: { borderRadius: "24px" },
      disabled,
      color,
      wispDensity: 1.2,
      wispSpeed: 10.0,
      wispIntensity: 6.0,
    };

    return borderType === 'electric' ? baseElectricProps : baseLaserProps;
  };


  return (
    <div style={{ 
      padding: '2rem', 
      background: 'linear-gradient(180deg, #000000 0%, #0a0a1a 50%, #000000 100%)', 
      minHeight: '100vh' 
    }}>
      <h1 style={{ color: 'white', marginBottom: '2rem', fontSize: '2.5rem', textAlign: 'center' }}>
        Border Effects Comparison
      </h1>
      
      <div style={{ marginBottom: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '3rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* ElectricBorderThree Pricing Card - Cyan */}
        <div>
          <ElectricBorderThree {...getBorderProps('#00d4ff', 'electric')}>
            <PricingCard plan={pricingPlans.starter} />
          </ElectricBorderThree>
        </div>

        {/* WispyBorder Pricing Card - Magenta */}
        <div>
          <WispyBorder {...getBorderProps('#ff6b9d', 'laser')}>
            <PricingCard plan={pricingPlans.professional} />
          </WispyBorder>
        </div>

        {/* Nested Composition: WispyBorder inside ElectricBorderThree - Purple/Gold */}
        <div>
          <ElectricBorderThree {...getBorderProps('#a855f7', 'electric')}>
            <WispyBorder {...{ ...getBorderProps('#fbbf24', 'laser'), style: { borderRadius: "20px" } }}>
              <PricingCard plan={pricingPlans.enterprise} style={{ borderRadius: 16 }} />
            </WispyBorder>
          </ElectricBorderThree>
        </div>
      </div>

      <div style={{ marginTop: '4rem', color: 'white', maxWidth: '1400px', margin: '4rem auto' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Pricing Tiers with Dynamic Border Effects:</h2>
        
        <div style={{ lineHeight: '1.8' }}>
          <h3 style={{ color: '#00d4ff', marginTop: '2rem' }}>Starter Plan - ElectricBorderThree (Cyan)</h3>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><strong>Border Effect:</strong> Interactive electric border with hover-following lightning</li>
            <li><strong>Color Scheme:</strong> Bright cyan (#00d4ff) for a modern, accessible feel</li>
            <li><strong>Interaction:</strong> Lightning surge follows mouse movement around border</li>
            <li><strong>Best For:</strong> Entry-level plans that need engaging interactivity</li>
          </ul>
        </div>
        
        <div style={{ lineHeight: '1.8' }}>
          <h3 style={{ color: '#ff6b9d', marginTop: '2rem' }}>Professional Plan - WispyBorder (Magenta)</h3>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><strong>Border Effect:</strong> Continuous flowing laser with particle wisps and a shimmering overlay</li>
            <li><strong>Color Scheme:</strong> Vibrant magenta (#ff6b9d) for professional appeal</li>
            <li><strong>Animation:</strong> Smooth beam flow with ambient particles and sparkling highlights</li>
            <li><strong>Best For:</strong> Featured plans that need continuous visual attention</li>
          </ul>
        </div>

        <div style={{ lineHeight: '1.8' }}>
          <h3 style={{ color: '#a855f7', marginTop: '2rem' }}>Enterprise Plan - Nested Composition (Purple/Gold)</h3>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><strong>Outer Border:</strong> Purple electric border (#a855f7) with interactive lightning</li>
            <li><strong>Inner Border:</strong> Gold wispy flow (#fbbf24) with continuous animation</li>
            <li><strong>Layered Effects:</strong> Premium dual-border composition for maximum visual impact</li>
            <li><strong>Best For:</strong> High-tier plans requiring sophisticated, premium presentation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ElectricBorderComparison;