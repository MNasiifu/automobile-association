import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram, Phone, Email, LocationOn } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { companyInfo, navigationItems } from '../../data/companyData';
import AAULogo from '../../assets/images/aau-logo.png';

const animationKeyframes = {
  fadeIn: keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  `,
};

const FooterSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(6, 0, 2),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
  },
}));

const FooterContent = styled(Container)(({ theme }) => ({
  paddingBottom: theme.spacing(4),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: theme.spacing(2),
    right: theme.spacing(2),
    height: 1,
    background: `linear-gradient(90deg, transparent, ${theme.palette.grey[600]}, transparent)`,
  },
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  textAlign: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    height: 1,
    background: theme.palette.divider,
  },
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  justifyContent: 'flex-start',
  '& a': {
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
    },
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateX(8px)',
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    color: theme.palette.secondary.main,
    transition: 'transform 0.3s ease',
  },
  '&:hover .MuiSvgIcon-root': {
    transform: 'scale(1.2)',
  },
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  '& img': {
    height: 50,
    width: 'auto',
    marginRight: theme.spacing(2),
    transition: 'transform 0.3s ease',
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  },
}));

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterSection>
      <FooterContent maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <LogoSection>
              <img src={AAULogo} alt="AA Uganda Logo" />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'inherit' }}>
                {companyInfo.shortName}
              </Typography>
            </LogoSection>
            
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.6 }}>
              {companyInfo.mission}
            </Typography>
            
            <SocialLinks>
              {[
                { Icon: Facebook, href: companyInfo.social.facebook },
                { Icon: Twitter, href: companyInfo.social.twitter },
                { Icon: LinkedIn, href: companyInfo.social.linkedin },
                { Icon: Instagram, href: companyInfo.social.instagram }
              ].map(({ Icon, href }, index) => (
                <Box
                  key={href}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `${animationKeyframes.fadeIn} 0.6s ease-out forwards`,
                    animationDelay: `${index * 0.15}s`,
                    opacity: 0,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: -1,
                      borderRadius: '50%',
                      padding: 1,
                      background: (theme) => `linear-gradient(45deg, transparent 30%, ${theme.palette.secondary.main})`,
                      mask: 'linear-gradient(#fff 0 0) content-box',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      transform: 'translateY(-4px)',
                      '& .MuiSvgIcon-root': {
                        transform: 'scale(1.15)',
                      },
                      '&::before': {
                        opacity: 1,
                      },
                    },
                    '& .MuiSvgIcon-root': {
                      transition: 'transform 0.3s ease',
                      fontSize: 22,
                    },
                  }}
                >
                  <Icon />
                </Box>
              ))}
            </SocialLinks>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Quick Links
            </Typography>
            
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {navigationItems.map((item, index) => (
                <Box 
                  component="li" 
                  key={item.path} 
                  sx={{ 
                    mb: 1,
                    opacity: 0,
                    animation: `${animationKeyframes.fadeIn} 0.5s ease-out forwards`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <Typography
                    component="a"
                    href={item.path}
                    variant="body2"
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                      opacity: 0.8,
                      display: 'inline-block',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      pl: 1,
                      '&:hover': {
                        color: 'grey.50',
                        transform: 'translateX(8px)',
                        fontWeight: 600,
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: -4,
                        top: '50%',
                        width: 4,
                        height: 4,
                        backgroundColor: 'secondary.main',
                        borderRadius: '50%',
                        transform: 'translateY(-50%) scale(0)',
                        transition: 'transform 0.3s ease',
                      },
                      '&:hover::before': {
                        transform: 'translateY(-50%) scale(1)',
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          
          {/* Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Our Services
            </Typography>
            
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {[
                'Emergency Rescue',
                'Driving School',
                'Vehicle Inspection',
                'Insurance Services',
                'Automotive Advisory',
              ].map((service, index) => (
                <Box 
                  component="li" 
                  key={service} 
                  sx={{ 
                    mb: 1,
                    opacity: 0,
                    animation: `${animationKeyframes.fadeIn} 0.5s ease-out forwards`,
                    animationDelay: `${index * 0.1 + 0.3}s`,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ 
                      opacity: 0.8, 
                      lineHeight: 1.6,
                      pl: 1,
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: -4,
                        top: '50%',
                        width: 4,
                        height: 4,
                        backgroundColor: 'secondary.light',
                        borderRadius: '50%',
                        transform: 'translateY(-50%) scale(0)',
                        transition: 'transform 0.3s ease',
                      },
                      '&:hover': {
                        pl: 2,
                        color: 'secondary.light',
                      },
                      '&:hover::before': {
                        transform: 'translateY(-50%) scale(1)',
                      },
                    }}
                  >
                    {service}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          
          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Contact Info
            </Typography>
            
            {[
              {
                Icon: LocationOn,
                content: (
                  <>
                    {companyInfo.address.street}<br />
                    {companyInfo.address.city}, {companyInfo.address.country}
                  </>
                ),
              },
              {
                Icon: Phone,
                content: companyInfo.contact.phone,
              },
              {
                Icon: Email,
                content: companyInfo.contact.email,
              },
            ].map(({ Icon, content }, index) => (
              <ContactItem
                key={index}
                sx={{
                  opacity: 0,
                  animation: `${animationKeyframes.fadeIn} 0.5s ease-out forwards`,
                  animationDelay: `${index * 0.2 + 0.5}s`,
                }}
              >
                <Icon sx={{ 
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.2) rotate(8deg)',
                  },
                }} />
                <Typography variant="body2" sx={{ 
                  opacity: 0.9,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                  },
                }}>
                  {content}
                </Typography>
              </ContactItem>
            ))}
          </Grid>
        </Grid>
      </FooterContent>
      
      <FooterBottom>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          © {currentYear} {companyInfo.name}. All rights reserved.
        </Typography>
      </FooterBottom>
    </FooterSection>
  );
};

export default Footer;
