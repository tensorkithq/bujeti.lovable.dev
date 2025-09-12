import React, { CSSProperties } from 'react';
import FumyBorder from './FumyBorder';
import WispyBorder from './WispyBorder';
import PricingCard from './PricingCard';

interface PricingPlan {
  name: string;
  price: string;
  priceDetails?: string;
  description: string;
  features: string[];
  buttonText: string;
  featured: boolean;
}

interface NestedBorderPricingCardProps {
  plan: PricingPlan;
  outerColor: string;
  innerColor: string;
  isSelected: boolean;
}

const getBorderProps = (color: string, borderType: 'electric' | 'laser', disabled?: boolean) => {
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

const NestedBorderPricingCard: React.FC<NestedBorderPricingCardProps> = ({ plan, outerColor, innerColor, isSelected }) => {
  const disabled = !isSelected;
  const outerProps = getBorderProps(outerColor, 'electric', disabled);
  const innerProps = getBorderProps(innerColor, 'laser', disabled);
  
  // Adjust inner border radius to create a nested effect
  innerProps.style.borderRadius = "20px";
  const innerCardStyle = { borderRadius: 16 };

  return (
    <FumyBorder {...outerProps}>
      <WispyBorder {...innerProps}>
        <PricingCard plan={plan} style={innerCardStyle} />
      </WispyBorder>
    </FumyBorder>
  );
};

export default NestedBorderPricingCard; 