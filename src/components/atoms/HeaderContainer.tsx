import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled HeaderContainer component
const StyledHeaderContainer = styled(Box)<{ $backgroundImage?: string }>(({ theme, $backgroundImage }) => ({
  position: 'relative',
  minHeight: '40vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  background: $backgroundImage 
    ? `linear-gradient(135deg, rgba(2, 121, 63, 0.9) 0%, rgba(2, 121, 63, 0.7) 100%), url(${$backgroundImage})`
    : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  
  [theme.breakpoints.down('md')]: {
    minHeight: '35vh',
    backgroundAttachment: 'scroll',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '30vh',
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
    pointerEvents: 'none',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100px',
    background: 'linear-gradient(to top, rgba(255,255,255,0.1) 0%, transparent 100%)',
    pointerEvents: 'none',
  },
}));

interface HeaderContainerProps {
  children: React.ReactNode;
  backgroundImage?: string;
  className?: string;
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({
  children,
  backgroundImage,
  className
}) => {
  return (
    <StyledHeaderContainer 
      $backgroundImage={backgroundImage}
      className={className}
    >
      {children}
    </StyledHeaderContainer>
  );
};

export default HeaderContainer;
