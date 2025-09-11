import React, { CSSProperties } from 'react';

interface PricingPlan {
  name: string;
  price: string;
  priceDetails?: string;
  description: string;
  features: string[];
  buttonText: string;
  featured: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  style?: CSSProperties;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, style }) => {
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
    borderRadius: 24,
  };

  return (
    <div style={cardStyle}>
      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.9, margin: 0 }}>
          {plan.name}
        </h3>
      </div>
      
      <div>
        <div style={{ fontSize: '3rem', fontWeight: '700', lineHeight: 1 }}>
          {plan.price}
          {plan.priceDetails && (
            <span style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.7 }}>
              {plan.priceDetails}
            </span>
          )}
          <span style={{ fontSize: '1.2rem', fontWeight: '400', opacity: 0.7 }}>
            /monthly
          </span>
        </div>
      </div>
      
      <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: 1.5, margin: 0 }}>
        {plan.description}
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
        {plan.features.map((feature, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#44ff88' }}>✓</span> {feature}
          </div>
        ))}
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
  );
};

export default PricingCard;