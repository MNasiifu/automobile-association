import React from 'react';
import { Card as MuiCard, CardContent } from '@mui/material';
import type { CardProps as MuiCardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CardProps extends MuiCardProps {
  children: React.ReactNode;
  hover?: boolean;
  padding?: number;
}

const StyledCard = styled(MuiCard)<{ hover?: boolean }>(({ theme, hover }) => ({
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  border: `1px solid ${theme.palette.grey[200]}`,
  transition: 'all 0.3s ease-in-out',
  
  ...(hover && {
    '&:hover': {
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-4px)',
    },
  }),
}));

const Card: React.FC<CardProps> = ({
  children,
  hover = false,
  padding = 3,
  ...props
}) => {
  return (
    <StyledCard hover={hover} {...props}>
      <CardContent sx={{ p: padding }}>
        {children}
      </CardContent>
    </StyledCard>
  );
};

export default Card;
