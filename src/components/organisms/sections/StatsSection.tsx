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

const StatsSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
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
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    zIndex: 1,
  },
}));

const StatsContainer = styled(Container)(() => ({
  position: 'relative',
  zIndex: 2,
}));

const StatCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease-in-out',
  
  '&:hover': {
    transform: 'translateY(-8px)',
    background: 'rgba(255, 255, 255, 0.12)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px auto',
  boxShadow: '0 8px 32px rgba(244, 214, 22, 0.3)',
  
  '& .MuiSvgIcon-root': {
    fontSize: 36,
    color: theme.palette.primary.main,
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
