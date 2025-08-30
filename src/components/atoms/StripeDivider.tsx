import React from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';
import { useInView } from 'react-intersection-observer';

const slideInLeft = keyframes`
  0% { transform: translateX(-120%); opacity: .25; }
  100% { transform: translateX(0); opacity: 1; }
`;

const slideInRight = keyframes`
  0% { transform: translateX(120%); opacity: .25; }
  100% { transform: translateX(0); opacity: 1; }
`;

interface StripeDividerProps {
  imageSrc: string;
  height?: number | string;
  gap?: number;
  reverse?: boolean;
}

const StripeDivider: React.FC<StripeDividerProps> = ({
  imageSrc,
  height = 40,
  gap = 40,
  reverse = false,
}) => {
  const { ref, inView } = useInView();
  const leftAnim = reverse ? slideInRight : slideInLeft;
  const rightAnim = reverse ? slideInLeft : slideInRight;

  return (
    <Box ref={ref} aria-hidden sx={{ py: 1.5, bgcolor: 'background.default', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap, px: 0 }}>
        <Box
          sx={{
              flex: 1,
              height,
              backgroundImage: `url(${imageSrc})`,
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
              backgroundPosition: 'left center',
              animation: inView
                ? `${leftAnim} 600ms cubic-bezier(.2,.8,.2,1) both`
                : 'none',
              opacity: inView ? 1 : 0.25,
            }}
          />
          <Box
            sx={{
              flex: 1,
              height,
              backgroundImage: `url(${imageSrc})`,
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
              backgroundPosition: 'right center',
              animation: inView
                ? `${rightAnim} 640ms cubic-bezier(.2,.8,.2,1) both`
                : 'none',
              opacity: inView ? 1 : 0.25,
            }}
          />
      </Box>
    </Box>
  );
};

export default StripeDivider;