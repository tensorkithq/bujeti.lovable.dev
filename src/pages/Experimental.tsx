import React, { CSSProperties, useState } from 'react';
import Header from '@/components/Header';
import FumyBorder from '@/components/FumyBorder';
import WispyBorder from '@/components/WispyBorder';
import ElectricBorder from '@/components/ElectricBorder';
interface IPricingPlan {
  name: string;
  price: string;
  priceDetails?: string;
  description: string;
  features: string[];
  buttonText: string;
  featured: boolean;
}
interface CardProps {
  plan: IPricingPlan;
  style?: CSSProperties;
}
const PortraitCard: React.FC<CardProps> = ({
  plan,
  style
}) => {
  const cardStyle: CSSProperties = {
    ...style,
    padding: '3rem 2.5rem',
    background: 'linear-gradient(135deg, rgba(10, 10, 20, 0.95) 0%, rgba(15, 15, 25, 0.95) 100%)',
    color: 'white',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    backdropFilter: 'blur(10px)',
    borderRadius: 24
  };
  return <div style={cardStyle}>
    <div>
      <h3 style={{
        fontSize: '1.2rem',
        fontWeight: '400',
        opacity: 0.9,
        margin: 0
      }}>
        {plan.name}
      </h3>
    </div>

    <div>
      <div style={{
        fontSize: '3rem',
        fontWeight: '700',
        lineHeight: 1
      }}>
        {plan.price}
        {plan.priceDetails && <span style={{
          fontSize: '1.2rem',
          fontWeight: '400',
          opacity: 0.7
        }}>
          {plan.priceDetails}
        </span>}
        <span style={{
          fontSize: '1.2rem',
          fontWeight: '400',
          opacity: 0.7
        }}>
          /monthly
        </span>
      </div>
    </div>

    <p style={{
      fontSize: '1rem',
      opacity: 0.8,
      lineHeight: 1.5,
      margin: 0
    }}>
      {plan.description}
    </p>

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginTop: 'auto'
    }}>
      {plan.features.map((feature, index) => <div key={index} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span style={{
          color: '#44ff88'
        }}>✓</span> {feature}
      </div>)}
    </div>

    <button style={{
      width: '100%',
      padding: '1rem',
      marginTop: '1.5rem',
      background: plan.featured ? 'white' : 'transparent',
      color: plan.featured ? 'black' : 'white',
      border: plan.featured ? 'none' : '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }}>
      {plan.buttonText}
    </button>
  </div>;
};

/**
 * Comparison component to test performance of ElectricBorder implementations
 */
const Experimental: React.FC = () => {
  const [disabled, setDisabled] = useState(false);

  // Pricing plans data
  const pricingPlans = {
    starter: {
      name: 'Starter',
      price: '$9',
      priceDetails: '.99',
      description: 'Perfect for individuals getting started with premium features.',
      features: ['Up to 5 projects', '10GB storage', 'Basic analytics', 'Email support', 'Mobile app access'],
      buttonText: 'Start Free Trial',
      featured: false
    },
    professional: {
      name: 'Professional',
      price: '$29',
      priceDetails: '.99',
      description: 'Best for professionals and small teams who need advanced features.',
      features: ['Unlimited projects', '100GB storage', 'Advanced analytics', 'Priority support', 'Team collaboration', 'Custom integrations'],
      buttonText: 'Get Started',
      featured: true
    },
    enterprise: {
      name: 'Enterprise',
      price: '$99',
      priceDetails: '.99',
      description: 'Comprehensive solution for large organizations with custom needs.',
      features: ['Unlimited everything', '1TB storage', 'Enterprise analytics', 'Dedicated support', 'Advanced security', 'Custom development', 'SLA guarantee'],
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
      style: {
        borderRadius: "24px"
      },
      disabled,
      color
    };
    const baseLaserProps = {
      speed: 0.5,
      thickness: 0.012,
      intensity: 1.5,
      style: {
        borderRadius: "24px"
      },
      disabled,
      color,
      wispDensity: 1.2,
      wispSpeed: 10.0,
      wispIntensity: 6.0
    };
    return borderType === 'electric' ? baseElectricProps : baseLaserProps;
  };
  return <>
    <Header />
    <div style={{
      padding: '2rem',
      background: 'linear-gradient(180deg, #000000 0%, #0a0a1a 50%, #000000 100%)',
      minHeight: '100vh'
    }}>
      <h1 style={{
        color: 'white',
        marginBottom: '2rem',
        fontSize: '2.5rem',
        textAlign: 'center'
      }}>
        Border Effects Comparison
      </h1>

      <div style={{
        marginBottom: '3rem',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button onClick={() => setDisabled(!disabled)} style={{
          padding: '0.75rem 1.5rem',
          background: disabled ? '#ff4444' : '#44ff44',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '600',
          transition: 'all 0.3s ease'
        }}>
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
        {/* FumyBorder Pricing Card - Cyan */}
        <div>
          <ElectricBorder
            color="#00d4ff"
            speed={1}
            chaos={0.5}
            thickness={1}
            style={{ borderRadius: 24 }}
          >
            <WispyBorder {...getBorderProps('#00d4ff', 'electric')}>
              <PortraitCard plan={pricingPlans.starter} />
            </WispyBorder>
          </ElectricBorder>
        </div>

        {/* WispyBorder Pricing Card - Magenta */}
        <div>
        <ElectricBorder
            color="#ff6b9d"
            speed={1}
            chaos={0.9}
            thickness={9}
            style={{ borderRadius: 24 }}
          >
          <WispyBorder {...getBorderProps('#ff6b9d', 'electric')}>
            <PortraitCard plan={pricingPlans.professional} />
          </WispyBorder>
          </ElectricBorder>
        </div>

        {/* Nested Composition: WispyBorder inside FumyBorder - Purple/Gold */}
        <div>
        <ElectricBorder
            color="#fbbf24"
            speed={1}
            chaos={0.5}
            thickness={1}
            style={{ borderRadius: 24 }}
          >
          <FumyBorder {...getBorderProps('#fbbf24', 'electric')}>
            <WispyBorder {...{
              ...getBorderProps('#fbbf24', 'laser'),
              style: {
                borderRadius: "20px"
              }
            }}>
              <PortraitCard plan={pricingPlans.enterprise} style={{
                borderRadius: 16
              }} />
            </WispyBorder>
          </FumyBorder>
          </ElectricBorder>
        </div>
      </div>

      <div style={{
        marginTop: '4rem',
        color: 'white',
        maxWidth: '1400px',
        margin: '4rem auto'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '1.5rem'
        }}>Pricing Tiers with Dynamic Border Effects:</h2>

        <div style={{
          lineHeight: '1.8'
        }}>
          <h3 style={{
            color: '#00d4ff',
            marginTop: '2rem'
          }}>Starter Plan - FumyBorder (Cyan)</h3>
          <ul style={{
            paddingLeft: '1.5rem'
          }}>




          </ul>
        </div>

        <div style={{
          lineHeight: '1.8'
        }}>
          <h3 style={{
            color: '#ff6b9d',
            marginTop: '2rem'
          }}>Professional Plan - FumyBorder (Magenta)</h3>
          <ul style={{
            paddingLeft: '1.5rem'
          }}>
            <li><strong>Border Effect:</strong> Continuous flowing laser with particle wisps and a shimmering overlay</li>
            <li><strong>Color Scheme:</strong> Vibrant magenta (#ff6b9d) for professional appeal</li>
            <li><strong>Animation:</strong> Smooth beam flow with ambient particles and sparkling highlights</li>

          </ul>
        </div>

        <div style={{
          lineHeight: '1.8'
        }}>
          <h3 style={{
            color: '#a855f7',
            marginTop: '2rem'
          }}>Enterprise Plan - Nested Composition (Purple/Gold)</h3>
          <ul style={{
            paddingLeft: '1.5rem'
          }}>
            <li><strong>Outer Border:</strong> Purple electric border (#a855f7) with interactive lightning</li>
            <li><strong>Inner Border:</strong> Gold laser flow (#fbbf24) with continuous animation</li>


          </ul>
        </div>


        <ul style={{
          lineHeight: '1.8',
          paddingLeft: '1.5rem'
        }}>

        </ul>


      </div>
    </div>
  </>;
};
export default Experimental;