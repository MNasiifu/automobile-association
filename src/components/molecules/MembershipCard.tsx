import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Card, Button } from '../atoms';
interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
  color: 'primary' | 'secondary' | 'info';
}

interface MembershipCardProps {
  plan: MembershipPlan;
  onSelect?: (planId: string) => void;
}

const StyledMembershipCard = styled(Card)<{ popular?: boolean }>(({ theme, popular }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  border: popular ? `2px solid ${theme.palette.primary.main}` : undefined,
  transform: popular ? 'scale(1.05)' : 'scale(1)',
  
  '&:hover': {
    transform: popular ? 'scale(1.08)' : 'scale(1.02)',
  },
}));

const PriceSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3, 2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
}));

const PopularBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: -10,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  fontWeight: 600,
  zIndex: 1,
}));

const MembershipCard: React.FC<MembershipCardProps> = ({ plan, onSelect }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <StyledMembershipCard popular={plan.popular} hover>
      {plan.popular && <PopularBadge label="Most Popular" />}
      
      <PriceSection>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
          {plan.name}
        </Typography>
        
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 0.5 }}>
          {formatPrice(plan.price)}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          {plan.duration}
        </Typography>
      </PriceSection>
      
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {plan.description}
        </Typography>
        
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Features Included:
        </Typography>
        
        <Box component="ul" sx={{ pl: 0, listStyle: 'none', m: 0 }}>
          {plan.features.map((feature, index) => (
            <Typography
              key={index}
              component="li"
              variant="body2"
              sx={{
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                '&:before': {
                  content: '"✓"',
                  color: 'primary.main',
                  fontWeight: 600,
                  marginRight: 1,
                },
              }}
            >
              {feature}
            </Typography>
          ))}
        </Box>
      </Box>
      
      <Box sx={{ p: 3, pt: 0 }}>
        <Button
          fullWidth
          size="large"
          color={plan.color}
          onClick={() => onSelect?.(plan.id)}
        >
          Choose {plan.name}
        </Button>
      </Box>
    </StyledMembershipCard>
  );
};

export default MembershipCard;
