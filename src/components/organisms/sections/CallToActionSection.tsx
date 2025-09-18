import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button } from '../../atoms';
import { ContactButtons } from '../../molecules';
import { 
  DirectionsCar,
  Security,
  School,
  Build,
  Phone,
  Chat
} from '@mui/icons-material';

const CTASection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z" fill-rule="nonzero"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    zIndex: 1,
  },
}));

const CTAContainer = styled(Container)(() => ({
  position: 'relative',
  zIndex: 2,
}));

const ActionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.text.primary,
  
  '&:hover': {
    transform: 'translateY(-8px)',
    background: 'rgba(255, 255, 255, 1)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    
    '& .action-icon': {
      transform: 'scale(1.1) rotate(5deg)',
      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    },
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px auto',
  transition: 'all 0.3s ease-in-out',
  boxShadow: '0 8px 32px rgba(2, 79, 49, 0.3)',
  
  '& .MuiSvgIcon-root': {
    fontSize: 36,
    color: theme.palette.primary.contrastText,
  },
}));

const MainCTABox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(6),
  border: '1px solid rgba(255, 255, 255, 0.2)',
  marginBottom: theme.spacing(8),
}));

const quickActions = [
  {
    icon: DirectionsCar,
    title: 'Emergency Rescue',
    description: 'Need immediate roadside assistance? Our rescue team is ready 24/7.',
    action: 'Call Now',
    href: 'tel:+256772366004',
    color: 'secondary',
  },
  {
    icon: School,
    title: 'Driving School',
    description: 'Learn to drive with professional instructors. Full package with license.',
    action: 'Enroll Today',
    href: '/driving-school/about',
    color: 'primary',
  },
  {
    icon: Security,
    title: 'Get Insurance',
    description: 'Protect your vehicle with comprehensive motor insurance coverage.',
    action: 'Get Quote',
    href: '/services/insurance-services',
    color: 'primary',
  },
  {
    icon: Build,
    title: 'Vehicle Service',
    description: 'Professional vehicle inspection and maintenance advisory services.',
    action: 'Book Service',
    href: '/services/vehicle-inspection',
    color: 'primary',
  },
];

const CallToActionSection: React.FC = () => {
  return (
    <CTASection>
      <CTAContainer maxWidth="lg">
        {/* Main CTA */}
        <MainCTABox>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800, 
              mb: 3,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' }
            }}
          >
            Ready to Experience the Difference?
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              opacity: 0.9,
              maxWidth: 700,
              mx: 'auto',
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
            }}
          >
            Join thousands of satisfied members who trust AA Uganda for their motoring needs
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 3, 
            flexWrap: 'wrap',
            mb: 4 
          }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              href="/membership"
              sx={{
                py: 2,
                px: 4,
                fontSize: '1.125rem',
                fontWeight: 700,
                minWidth: 200,
              }}
            >
              Become a Member
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              href="/contact"
              sx={{
                py: 2,
                px: 4,
                fontSize: '1.125rem',
                fontWeight: 600,
                borderColor: 'white',
                color: 'white',
                minWidth: 200,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
          
          <Typography 
            variant="body1" 
            sx={{ 
              opacity: 0.8,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' }
            }}
          >
            ✓ 24/7 Support • ✓ Nationwide Coverage • ✓ Trusted Since 1986
          </Typography>
        </MainCTABox>

        {/* Quick Actions */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
            }}
          >
            Need Help Now?
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              mb: 6, 
              opacity: 0.9,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
            }}
          >
            Quick access to our most popular services
          </Typography>
          
          <Grid container spacing={4}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ActionCard elevation={0}>
                  <IconWrapper className="action-icon">
                    <action.icon />
                  </IconWrapper>
                  
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 2,
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                    }}
                  >
                    {action.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      mb: 3, 
                      flexGrow: 1,
                      fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' }
                    }}
                  >
                    {action.description}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    color={action.color as 'primary' | 'secondary'}
                    fullWidth
                    href={action.href}
                    sx={{
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    {action.action}
                  </Button>
                </ActionCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Options */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
            }}
          >
            Have Questions? We're Here to Help
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4, 
              opacity: 0.9,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
            }}
          >
            Get in touch with our friendly team for personalized assistance
          </Typography>
          
          <ContactButtons 
            phoneText="Talk to Expert"
            whatsappText="Chat with Us"
            whatsappMessage="Hello! I have questions about AA Uganda services. Can you help me?"
            buttonSx={{
              '&.MuiButton-contained': {
                backgroundColor: '#fff',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'grey.100',
                },
              },
              '&.MuiButton-outlined': {
                borderColor: '#fff',
                color: '#fff',
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              },
            }}
          />
          
          <Box sx={{ 
            mt: 4, 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 4, 
            flexWrap: 'wrap',
            opacity: 0.8 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Phone fontSize="small" />
              <Typography 
                variant="body2"
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                +256 772 366004
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chat fontSize="small" />
              <Typography 
                variant="body2"
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                24/7 Support
              </Typography>
            </Box>
          </Box>
        </Box>
      </CTAContainer>
    </CTASection>
  );
};

export default CallToActionSection;
