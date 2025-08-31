import React from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 10,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  
  '& .page-header-content': {
    background: theme.palette.primary.main,
    backdropFilter: 'blur(20px)',
    borderTopLeftRadius: theme.spacing(12),
    borderBottomRightRadius: theme.spacing(12),
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    position: 'relative',
    
    // Progressive spacing system
    padding: theme.spacing(6, 0),
    
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)',
    },
    
    // Enhanced responsive spacing
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(5, 5),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(4, 4),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2.5, 3),
      borderRadius: theme.spacing(5),
      border: 'none',
      background: '#6d6e702e',
    },
    
    // Inner content wrapper for better organization
    '& .content-inner': {
      maxWidth: '900px',
      margin: '0 auto',
      textAlign: 'center',
    },
    
    // Main content positioning
    '& .main-content': {
      position: 'relative',
      zIndex: 2,
    },
    
    // Subtle background pattern
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
      pointerEvents: 'none',
      zIndex: 1,
    },
  },
}));

interface ContentContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  className?: string;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  maxWidth = 'md',
  className
}) => {
  return (
    <StyledContentContainer 
      maxWidth={maxWidth}
      className={className}
    >
      {children}
    </StyledContentContainer>
  );
};

export default ContentContainer;
