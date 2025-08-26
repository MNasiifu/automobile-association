import React from 'react';
import { Typography as MuiTypography } from '@mui/material';
import type { TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface HeadingProps extends Omit<TypographyProps, 'variant'> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'inherit';
  align?: 'left' | 'center' | 'right' | 'justify';
  gutterBottom?: boolean;
}

const StyledHeading = styled(MuiTypography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 1.2,
  
  '&.MuiTypography-h1': {
    fontSize: '2.5rem',
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.75rem',
    },
  },
  
  '&.MuiTypography-h2': {
    fontSize: '2rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.75rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  
  '&.MuiTypography-h3': {
    fontSize: '1.75rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
    },
  },
}));

const Heading: React.FC<HeadingProps> = ({
  children,
  variant = 'h2',
  color = 'textPrimary',
  align = 'left',
  gutterBottom = false,
  ...props
}) => {
  return (
    <StyledHeading
      variant={variant}
      color={color}
      align={align}
      gutterBottom={gutterBottom}
      {...props}
    >
      {children}
    </StyledHeading>
  );
};

export default Heading;
