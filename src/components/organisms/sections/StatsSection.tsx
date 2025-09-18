import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CountUpAnimation } from '../../atoms';
import { 
  DirectionsCar, 
  School, 
  Security, 
  SupportAgent,
  Group,
  Timeline
} from '@mui/icons-material';
import theme from '../../../theme';

const StatsSection = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
  padding: theme.spacing(12, 0),
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: [
      `radial-gradient(circle at 20% 20%, ${theme.palette.grey[700]}40 0%, transparent 50%)`,
      `radial-gradient(circle at 80% 80%, ${theme.palette.grey[700]}40 0%, transparent 50%)`,
      `radial-gradient(circle, ${theme.palette.secondary.main}70 3px, transparent 3px)`
    ].join(', '),
    backgroundSize: '100% 100%, 100% 100%, 50px 50px',
    backgroundPosition: '0 0, 0 0, 0 0',
    zIndex: 1,
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
}));

const StatsContainer = styled(Container)(() => ({
  position: 'relative',
  zIndex: 3,
}));

const StatCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.light} 100%)`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${theme.palette.grey[600]}30`,
  boxShadow: `0 8px 32px ${theme.palette.grey[900]}50`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  zIndex: 3,
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.spacing(3),
    background: `linear-gradient(145deg, transparent 0%, ${theme.palette.common.white}05 50%, transparent 100%)`,
    opacity: 0,
    transition: 'opacity 0.4s ease-in-out',
    zIndex: -1,
  },
  
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    background: `linear-gradient(145deg, ${theme.palette.primary.light}60 0%, ${theme.palette.primary.dark} 100%)`,
    border: `1px solid ${theme.palette.grey[500]}50`,
    boxShadow: `0 24px 48px ${theme.palette.grey[900]}60, 0 0 0 1px ${theme.palette.grey[600]}20`,
    
    '&::before': {
      opacity: 1,
    },
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 88,
  height: 88,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.grey[100]} 0%, ${theme.palette.common.white} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px auto',
  boxShadow: `0 12px 40px ${theme.palette.grey[900]}40, 0 0 0 1px ${theme.palette.grey[600]}20`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${theme.palette.secondary.main}60 0%, ${theme.palette.primary.main}40 100%)`,
    opacity: 0,
    transition: 'opacity 0.4s ease-in-out',
    zIndex: -1,
  },
  
  '& .MuiSvgIcon-root': {
    fontSize: 40,
    color: theme.palette.grey[700],
    transition: 'all 0.4s ease-in-out',
  },
  
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
    
    '&::before': {
      opacity: 1,
    },
    
    '& .MuiSvgIcon-root': {
      color: theme.palette.grey[800],
      transform: 'scale(1.1)',
    },
  },
}));

const statsData = [
  {
    icon: Timeline,
    value: 37,
    suffix: '+',
    label: 'Years of Excellence',
    description: 'Serving Uganda since 1986',
  },
  {
    icon: DirectionsCar,
    value: 30,
    suffix: '+',
    label: 'Rescue Vehicles',
    description: 'Nationwide coverage',
  },
  {
    icon: Group,
    value: 12000,
    suffix: '+',
    label: 'Happy Members',
    description: 'Trust our services',
  },
  {
    icon: School,
    value: 1000,
    suffix: '+',
    label: 'Drivers Trained',
    description: 'Professional instruction',
  },
  {
    icon: Security,
    value: 24,
    suffix: '/7',
    label: 'Emergency Support',
    description: 'Always available',
  },
  {
    icon: SupportAgent,
    value: 99,
    suffix: '%',
    label: 'Satisfaction Rate',
    description: 'Customer approved',
  },
];

const StatsOverview: React.FC = () => {
  return (
    <StatsSection>
      <StatsContainer maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              color: theme.palette.primary.main,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            Trusted by Thousands
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: 0.9, 
              maxWidth: 600, 
              color: theme.palette.grey[800],
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
            }}
          >
            Our commitment to excellence has made us Uganda's leading motoring organization
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {statsData.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StatCard>
                <IconWrapper>
                  <stat.icon />
                </IconWrapper>
                
                <Box sx={{ mb: 2 }}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 800, 
                      mb: 0.5,
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                    }}
                  >
                    <CountUpAnimation value={`${stat.value}${stat.suffix}`} />
                  </Typography>
                  
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 1,
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                    }}
                  >
                    {stat.label}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      opacity: 0.8,
                      fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' }
                    }}
                  >
                    {stat.description}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
          ))}
        </Grid>
      </StatsContainer>
    </StatsSection>
  );
};

export default StatsOverview;
