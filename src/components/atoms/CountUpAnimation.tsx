import React from 'react';
import { Typography, type TypographyProps } from '@mui/material';
import { useInView } from 'react-intersection-observer';

interface CountUpAnimationProps extends TypographyProps {
  value: string;
  duration?: number;
}

const CountUpAnimation: React.FC<CountUpAnimationProps> = ({ value, duration = 2000, ...typographyProps }) => {
  const [displayValue, setDisplayValue] = React.useState('0');
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  React.useEffect(() => {
    if (!inView) return;

    let startValue = 0;
    const endValue = parseInt(value.replace(/\D/g, ''), 10);
    const startTime = Date.now();
    
    const updateValue = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const currentValue = Math.floor(startValue + (endValue - startValue) * progress);
      
      setDisplayValue(value.replace(/\d+/, currentValue.toString()));

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  }, [value, duration, inView]);

  return (
    <Typography ref={ref} {...typographyProps}>
      {displayValue}
    </Typography>
  );
};

export default CountUpAnimation;