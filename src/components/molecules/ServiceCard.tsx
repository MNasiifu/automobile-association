import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Card } from '../atoms';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  features?: string[];
  onClick?: () => void;
}

const StyledServiceCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  
  '&:hover': {
    '& .service-icon': {
      transform: 'scale(1.1)',
    },
  },
}));

const IconWrapper = styled(Avatar)(({ theme }) => ({
  width: 64,
  height: 64,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  margin: '0 auto 16px auto',
  transition: 'transform 0.2s ease-in-out',
}));

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  features,
  onClick,
}) => {
  // Get the icon component dynamically
  const IconComponent = (Icons as any)[icon] || Icons.Build;

  return (
    <StyledServiceCard hover onClick={onClick}>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <IconWrapper className="service-icon">
          <IconComponent sx={{ fontSize: 32 }} />
        </IconWrapper>
        
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      </Box>
      
      {features && features.length > 0 && (
        <Box sx={{ mt: 'auto' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Key Features:
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            {features.slice(0, 3).map((feature, index) => (
              <Typography
                key={index}
                component="li"
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                {feature}
              </Typography>
            ))}
            {features.length > 3 && (
              <Typography variant="body2" color="primary" sx={{ fontStyle: 'italic' }}>
                +{features.length - 3} more features
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </StyledServiceCard>
  );
};

export default ServiceCard;
