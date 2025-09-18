import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button } from '../../atoms';
import { affiliates } from '../../../data/companyData';
import { 
  Public,
  Handshake,
  Security,
  EmojiEvents
} from '@mui/icons-material';

const PartnershipSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  backgroundColor: theme.palette.background.default,
  position: 'relative',
}));

const LogoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
    
    '& .partner-logo': {
      transform: 'scale(1.05)',
    },
  },
}));

const LogoImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  maxHeight: 120,
  width: 'auto',
  height: 'auto',
  objectFit: 'contain',
  transition: 'all 0.3s ease-in-out',
  filter: 'grayscale(20%)',
  
  '&:hover': {
    filter: 'grayscale(0%)',
  },
  
  [theme.breakpoints.down('sm')]: {
    maxHeight: 80,
  },
}));

const BenefitCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease-in-out',
  height: '100%',
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[50]} 100%)`,
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.secondary.main,
    
    '& .benefit-icon': {
      transform: 'scale(1.1)',
      background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
    },
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px auto',
  transition: 'all 0.3s ease-in-out',
  
  '& .MuiSvgIcon-root': {
    fontSize: 28,
    color: theme.palette.primary.contrastText,
  },
}));

const benefits = [
  {
    icon: Public,
    title: 'Global Network',
    description: 'Access to worldwide motoring services through FIA\'s global network of 246 organizations.',
  },
  {
    icon: Handshake,
    title: 'Best Practices',
    description: 'Learning and implementing international best practices from leading motoring organizations.',
  },
  {
    icon: Security,
    title: 'Quality Assurance',
    description: 'Meeting international standards for service quality and customer satisfaction.',
  },
  {
    icon: EmojiEvents,
    title: 'Continuous Improvement',
    description: 'Regular knowledge exchange and capacity building with global partners.',
  },
];

const PartnershipsSection: React.FC = () => {
  return (
    <PartnershipSection>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            Global Partnerships
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
            }}
          >
            We're proud members of international motoring organizations, bringing global standards to Uganda
          </Typography>
        </Box>

        {/* Affiliations */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {affiliates.map((affiliate, index) => (
            <Grid item xs={12} md={6} key={index}>
              <LogoCard elevation={0}>
                <Box sx={{ mb: 3 }}>
                  <LogoImage 
                    src={affiliate.img} 
                    alt={affiliate.name}
                    className="partner-logo"
                  />
                </Box>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                  }}
                >
                  {affiliate.name}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ 
                    lineHeight: 1.7,
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem' }
                  }}
                >
                  {affiliate.description.substring(0, 200)}...
                </Typography>
              </LogoCard>
            </Grid>
          ))}
        </Grid>

        {/* Benefits of Partnership */}
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
            Benefits of Our Global Membership
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            align="center"
            sx={{ 
              mb: 6, 
              maxWidth: 600, 
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
            }}
          >
            Our international partnerships translate to better services for you
          </Typography>
          
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <BenefitCard elevation={0}>
                  <IconWrapper className="benefit-icon">
                    <benefit.icon />
                  </IconWrapper>
                  
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 2,
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                    }}
                  >
                    {benefit.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.6,
                      fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' }
                    }}
                  >
                    {benefit.description}
                  </Typography>
                </BenefitCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* International Recognition */}
        <Box 
          sx={{ 
            textAlign: 'center',
            background: `linear-gradient(135deg, rgba(2, 79, 49, 0.05) 0%, rgba(244, 214, 22, 0.05) 100%)`,
            borderRadius: 3,
            p: 6,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
            }}
          >
            Internationally Recognized Standards
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              mb: 4, 
              maxWidth: 600, 
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
            }}
          >
            Our membership with FIA ensures we meet the highest international standards for motoring services
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 4, mb: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h3" 
                color="primary" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                246
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' } }}
              >
                Partner Organizations
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h3" 
                color="primary" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                145
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' } }}
              >
                Countries Worldwide
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h3" 
                color="primary" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                100M+
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' } }}
              >
                Motorists Served
              </Typography>
            </Box>
          </Box>
          
          <Button
            variant="outlined"
            size="large"
            href="/about/affiliation"
            sx={{ 
              px: 4, 
              py: 1.5,
            }}
          >
            Learn More About Our Partnerships
          </Button>
        </Box>
      </Container>
    </PartnershipSection>
  );
};

export default PartnershipsSection;
