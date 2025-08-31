import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from './Card';
import { keyframes } from '@mui/system';
import { useInView } from 'react-intersection-observer';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StatCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  height: '100%',
  padding: theme.spacing(3.5),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  wordBreak: 'break-word',
  opacity: 0,
  transform: 'translateY(20px)',
  animation: `${fadeIn} 0.6s ease-out forwards`,
  '&:nth-of-type(1)': { animationDelay: '0.2s' },
  '&:nth-of-type(2)': { animationDelay: '0.4s' },
  '&:nth-of-type(3)': { animationDelay: '0.6s' },
  '&:nth-of-type(4)': { animationDelay: '0.8s' },
}));

interface CounterProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  description: string;
  delay?: number;
}

const Counter: React.FC<CounterProps> = ({ icon, number, label, description, delay = 2000 }) => {
  const [displayValue, setDisplayValue] = React.useState('0');
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  React.useEffect(() => {
    if (!inView) return;

    let startValue = 0;
    const endValue = parseInt(number.replace(/\D/g, ''), 10);
    const startTime = Date.now();
    
    const updateValue = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / delay, 1);
      const currentValue = Math.floor(startValue + (endValue - startValue) * progress);
      
      setDisplayValue(number.replace(/\d+/, currentValue.toString()));

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  }, [number, delay, inView]);

  return (
    <StatCard ref={ref}>
      <Box
        sx={{
          width: 80,
          height: 80,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 1.5,
          '& .MuiSvgIcon-root': {
            fontSize: 36,
          },
        }}
      >
        {icon}
      </Box>
      <Typography variant="h3" color="primary" sx={{ fontWeight: 800, mb: 0.5 }}>
        {displayValue}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </StatCard>
  );
};

export default Counter;