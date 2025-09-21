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
import { useNavigate } from 'react-router-dom';

const PartnershipSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  backgroundColor: theme.palette.background.default,
  position: 'relative',
}));

const LogoCard = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, rgba(244, 244, 244, 0.3) 100%)`,
  overflow: 'hidden',
  position: 'relative',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.08)`,
    borderColor: theme.palette.primary.light,
    
    '&::before': {
      transform: 'scaleX(1)',
    },
    
    '& .partner-logo': {
      transform: 'scale(1.02)',
    },
  },
  
  [theme.breakpoints.down('lg')]: {
    textAlign: 'center',
  },
}));

const LogoImage = styled('img')(() => ({
  maxWidth: '100%',
  width: 'auto',
  height: 'auto',
  objectFit: 'contain',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  filter: 'grayscale(10%) brightness(1.05)',
  
  '&:hover': {
    filter: 'grayscale(0%) brightness(1.1)',
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
  const navigate = useNavigate();
  const handleLearnMore = () => {
    navigate("/about/affiliation")
  }
  return (
    <PartnershipSection>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, sm: 8, md: 10 } }}>
          <Typography 
            variant="h2" 
            color='primary'
            sx={{ 
              fontWeight: 800, 
              mb: 3,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Global Partnerships
          </Typography>
          <Box 
            sx={{ 
              width: 80, 
              height: 4, 
              background: `linear-gradient(135deg, #024F31 0%, #F4D616 100%)`,
              mx: 'auto', 
              mb: 3,
              borderRadius: 2,
            }} 
          />
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              maxWidth: 800, 
              mx: 'auto',
              fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            We're proud members of prestigious international motoring organizations, bringing world-class standards and global expertise to Uganda's automotive landscape
          </Typography>
        </Box>

        {/* Affiliations */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {affiliates.map((affiliate, index) => (
            <Grid item xs={12} key={index}>
              <LogoCard 
                elevation={0}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', lg: 'row' },
                  alignItems: { xs: 'center', lg: 'flex-start' },
                  textAlign: { xs: 'center', lg: 'left' },
                  p: { xs: 4, sm: 5, md: 6 },
                  gap: { xs: 3, sm: 4, lg: 6 },
                }}
              >
                {/* Logo Section */}
                <Box 
                  sx={{ 
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: { lg: 280 },
                    width: { xs: '100%', sm: 'auto', lg: 280 },
                  }}
                >
                  <Box 
                    sx={{
                      position: 'relative',
                      mb: 3,
                      p: 3,
                      borderRadius: 3,
                      background: `linear-gradient(135deg, rgba(2, 79, 49, 0.08) 0%, rgba(244, 214, 22, 0.08) 100%)`,
                      border: '2px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease-in-out',
                      
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'scale(1.02)',
                        boxShadow: 4,
                      }
                    }}
                  >
                    <LogoImage 
                      src={affiliate.img} 
                      alt={affiliate.name}
                      className="partner-logo"
                      sx={{
                        maxHeight: { xs: 100, sm: 120, md: 140 },
                        width: 'auto',
                        display: 'block',
                        margin: '0 auto',
                      }}
                    />
                  </Box>
                  
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 800, 
                      mb: 1,
                      fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem' },
                      background: `linear-gradient(135deg, #024F31 0%, #F4D616 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {affiliate.name}
                  </Typography>
                  
                  <Typography 
                    variant="subtitle1" 
                    color="text.secondary"
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      mb: { xs: 2, lg: 0 },
                    }}
                  >
                    Global Partnership
                  </Typography>
                </Box>

                {/* Content Section */}
                <Box 
                  sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    maxWidth: { lg: '100%' },
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 3,
                      fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.35rem' },
                      background: `linear-gradient(135deg, #024F31 0%, #F4D616 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.02em',
                      lineHeight: 1.4,
                    }}
                  >
                    Federation Internationale de l'Automobile
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.8,
                      fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                      textAlign: 'justify',
                      mb: 3,
                      '& strong': {
                        color: 'text.primary',
                        fontWeight: 600,
                      }
                    }}
                  >
                    <strong>AA Uganda</strong> is proudly affiliated with the <strong>Federation Internationale de l'Automobile (FIA)</strong>, 
                    the world's leading motoring organization representing over <strong>100 million motorists</strong> and their families globally. 
                    FIA unites <strong>246 international motoring and sports organizations</strong> from <strong>145 countries</strong> across 
                    <strong>5 continents</strong>.
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.8,
                      fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                      textAlign: 'justify',
                      mb: 3,
                    }}
                  >
                    Through this prestigious membership, AA Uganda has continuously learned and implemented international best practices 
                    from leading automobile associations worldwide, enhancing our service delivery and operational excellence.
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.8,
                      fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                      textAlign: 'justify',
                      mb: 4,
                    }}
                  >
                    We are also active members of the <strong>Alliance Internationale de Tourisme (AIT)</strong> and hold leadership 
                    positions within the <strong>African Council of Touring and Automobile Clubs (ACTA)</strong>, with our CEO and 
                    Governing Council President serving as Treasurer and Vice President respectively.
                  </Typography>

                  {/* Key Stats */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: { xs: 2, sm: 3, md: 4 },
                      justifyContent: { xs: 'center', lg: 'flex-start' },
                      mt: 2,
                    }}
                  >
                    <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                      <Typography 
                        variant="h5" 
                        color="primary" 
                        sx={{ 
                          fontWeight: 800,
                          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                        }}
                      >
                        246
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        Organizations
                      </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                      <Typography 
                        variant="h5" 
                        color="primary" 
                        sx={{ 
                          fontWeight: 800,
                          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                        }}
                      >
                        145
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        Countries
                      </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                      <Typography 
                        variant="h5" 
                        color="primary" 
                        sx={{ 
                          fontWeight: 800,
                          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                        }}
                      >
                        100M+
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        Motorists
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </LogoCard>
            </Grid>
          ))}
        </Grid>

        {/* Benefits of Partnership */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            align="center" 
            color="primary"
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
          
          <Grid item container justifyContent={"center"} xs={12}>
          <Button
            variant="outlined"
            onClick={handleLearnMore}
            sx={{ 
              px: 4, 
              py: 1.5,
            }}
          >
            Learn More About Our Partnerships
          </Button>
            </Grid>
        </Box>
      </Container>
    </PartnershipSection>
  );
};

export default PartnershipsSection;
