import React, { CSSProperties, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/blocks/Footer';
import WispyBorder from '@/components/WispyBorder';
import ElectricBorder from '@/components/ElectricBorder';
import FractalElectricBorder from '@/components/FractalElectricBorder';

const ManifestoText = () => {
  return (
    <div className="relative overflow-hidden pb-[120px] pt-[212px] lg:pb-[100px] lg:pt-[168px] md:pt-[145px] sm:pt-[109px]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-3xl leading-relaxed text-white lg:text-2xl md:text-xl sm:text-lg">
          <p>
            The Bujeti team prioritizes open software, ensuring Bujeti remains
            free. To sustain cloud operations and further development, cloud
            users will be charged for consumed cloud resources. These resources
            currently fall into three categories: storage, network and compute.
          </p>
          <div className="my-16 lg:my-14 md:my-12 sm:my-8"></div>
          <p>
            Storage charges depend on data size, excluding Bujeti objects but
            including attachments. Users can have unlimited Bujeti objects
            without storage limitations, but documents, images and videos are
            counted based on the plan.
          </p>
          <div className="my-16 lg:my-14 md:my-12 sm:my-8"></div>
          <p>Network charges apply only to audio and video calls.</p>
          <div className="my-16 lg:my-14 md:my-12 sm:my-8"></div>
          <p>
            Compute resource charges will apply to the upcoming{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-400 bg-clip-text text-transparent">
              Bujeti AI and Bujeti MetaBrain
            </span>{" "}
            features, with costs assured to be no higher than industry leaders
            like OpenAI. Users can pay for these services directly via their
            OpenAI accounts.
          </p>
        </div>
      </div>
    </div>
  );
};

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
    background: 'rgba(13, 15, 17, 0.4)',
    color: 'white',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    backdropFilter: 'blur(10px)',
    borderRadius: 24,
    position: 'relative' as const,
    overflow: 'hidden'
  };

  const dotPatternStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.05) 0.2px, transparent 0.8px)`,
    backgroundSize: '4px 4px',
    backgroundPosition: '0 0, 5px 5px',
    maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 100%)',
    pointerEvents: 'none' as const
  };

  return <div style={cardStyle}>
    <div style={dotPatternStyle} />
    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
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
          }}></span> {feature}
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
    </div>
  </div>;
};

const pricingPlans = [
  {
    name: 'Starter',
    price: '$9',
    priceDetails: '.99',
    description: 'Perfect for individuals getting started with premium features.',
    features: ['Up to 5 projects', '10GB storage', 'Basic analytics', 'Email support', 'Mobile app access'],
    buttonText: 'Start Free Trial',
    featured: false
  },
  {
    name: 'Professional',
    price: '$29',
    priceDetails: '.99',
    description: 'Best for professionals and small teams who need advanced features.',
    features: ['Unlimited projects', '100GB storage', 'Advanced analytics', 'Priority support', 'Team collaboration', 'Custom integrations'],
    buttonText: 'Get Started',
    featured: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    priceDetails: '.99',
    description: 'Comprehensive solution for large organizations with custom needs.',
    features: ['Unlimited everything', '1TB storage', 'Enterprise analytics', 'Dedicated support', 'Advanced security', 'Custom development', 'SLA guarantee'],
    buttonText: 'Contact Sales',
    featured: false
  }
];

// Define border colors for each plan
const borderColors = {
  Starter: { outerColor: "#00d4ff", innerColor: "#00d4ff" },
  Professional: { outerColor: "#ff6b9d", innerColor: "#ff6b9d" },
  Enterprise: { outerColor: "#fbbf24", innerColor: "#fbbf24" },
};

/**
 * Comparison component to test performance of ElectricBorder implementations
 */
const PricingExperimental: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Border effect configurations with different colors
  const getBorderProps = (color: string, borderType: 'electric' | 'laser', disabled?: boolean) => {
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
      thickness: 0.01,
      intensity: 1.25,
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
    <ManifestoText />
    <div style={{
      padding: '2rem',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '3rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {pricingPlans.map((plan) => {
          const colors = borderColors[plan.name as keyof typeof borderColors];
          const isSelected = selectedPlan === plan.name;

          return (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              style={{
                cursor: "pointer",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                minHeight: "500px",
              }}
            >
              {isSelected ? (
                <FractalElectricBorder
                  color={colors.outerColor}
                  speed={1}
                  chaos={0.9}
                  thickness={3}
                  style={{ borderRadius: 20 }}
                >
                  <ElectricBorder
                    color={colors.outerColor}
                    speed={1}
                    chaos={0.9}
                    thickness={3}
                    style={{ borderRadius: 20 }}
                  >
                    <WispyBorder {...getBorderProps(colors.innerColor, 'laser', false)}>
                      <PortraitCard plan={plan} style={{ 
                        borderColor: colors.outerColor, 
                        borderWidth: 2, 
                        borderRadius: 24, 
                        marginTop: '12px',
                        marginLeft: '8px',
                        marginRight: '8px',
                        marginBottom: '12px',
                        background: 'rgba(13, 15, 17, 0.4)',
                        backdropFilter: 'blur(10px)',
                        }} />
                    </WispyBorder>
                  </ElectricBorder>
                </FractalElectricBorder>
              ) : (
                <PortraitCard plan={plan} style={{ borderRadius: 24 }} />
              )}
            </div>
          );
        })}
      </div>

    </div>
    <Footer />
  </>;
};
export default PricingExperimental;