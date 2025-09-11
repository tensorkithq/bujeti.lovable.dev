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
    padding: '24px', // Reduced padding
    background: 'rgba(13, 15, 17, 0.4)',
    color: 'white',
    minHeight: '380px', // Reduced height
    width: '100%',
    maxWidth: '380px', // Max width for larger screens
    margin: '0 auto', // Center card in grid cell
    display: 'flex',
    flexDirection: 'column',
    backdropFilter: 'blur(10px)',
    borderRadius: style?.borderRadius || 24,
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '4px 6px 25px rgba(0, 0, 0, 0.56)',
    transition: 'all 0.2s',
  };

  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .price-font-size {
            font-size: 48px !important;
          }
          .price-details-font-size {
            font-size: 18px !important;
          }
        }
      `}</style>
      <div style={cardStyle}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>
            {plan.name}
          </h3>
        </div>
        
        <div style={{ marginTop: '10px' }}>
          <div className="price-font-size" style={{ fontSize: '64px', fontWeight: 600, lineHeight: 1, letterSpacing: '-0.03em', transition: 'font-size 0.3s ease' }}>
            {plan.price}
            {plan.priceDetails && (
              <span className="price-details-font-size" style={{ fontSize: '20px', fontWeight: 500, opacity: 0.7, marginLeft: '4px', transition: 'font-size 0.3s ease' }}>
                {plan.priceDetails}
              </span>
            )}
            <span className="price-details-font-size" style={{ fontSize: '20px', fontWeight: 500, opacity: 0.7, transition: 'font-size 0.3s ease' }}>
              /monthly
            </span>
          </div>
        </div>
        
        <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: 1.4, margin: 0, marginTop: '8px', letterSpacing: '-0.03em' }}>
          {plan.description}
        </p>

        <span style={{
          marginTop: '18px',
          display: 'block',
          height: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }} aria-hidden="true"></span>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
          {plan.features.map((feature, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)' }}>
              <span style={{ color: '#44ff88' }}>✓</span> {feature}
            </div>
          ))}
        </div>
        
        <button style={{
          width: '100%',
          height: '50px', // Slightly smaller button
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 'auto',
          paddingTop: '2px',
          background: plan.featured ? 'white' : 'transparent',
          color: plan.featured ? 'black' : 'white',
          border: plan.featured ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '9999px',
          fontSize: '16px',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          textTransform: 'capitalize',
        }}>
          {plan.buttonText}
        </button>
      </div>
    </>
  );
};

export default PricingCard;