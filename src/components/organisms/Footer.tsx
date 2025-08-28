import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram, Phone, Email, LocationOn } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { companyInfo, navigationItems } from '../../data/companyData';
import AAULogo from '../../assets/images/aau-logo.png';

const FooterSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(6, 0, 2),
}));

const FooterContent = styled(Container)(({ theme }) => ({
  paddingBottom: theme.spacing(4),
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  borderTop: `1px solid rgba(255, 255, 255, 0.3)`,
  paddingTop: theme.spacing(3),
  textAlign: 'center',
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    color: theme.palette.grey[300],
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
              <Box
                component="a"
                href={companyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: 'secondary.main',
                    transform: 'translateY(-2px)',
                    color: 'grey.100',
                  },
                }}
              >
                <Facebook />
              </Box>
              <Box
                component="a"
                href={companyInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: 'secondary.main',
                    transform: 'translateY(-2px)',
                    color: 'grey.100',
                  },
                }}
              >
                <Twitter />
              </Box>
              <Box
                component="a"
                href={companyInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: 'secondary.main',
                    transform: 'translateY(-2px)',
                    color: 'grey.100',
                  },
                }}
              >
                <LinkedIn />
              </Box>
              <Box
                component="a"
                href={companyInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: 'secondary.main',
                    transform: 'translateY(-2px)',
                    color: 'grey.100',
                  },
                }}
              >
                <Instagram />
              </Box>
            </SocialLinks>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Quick Links
            </Typography>
            
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {navigationItems.map((item) => (
                <Box component="li" key={item.path} sx={{ mb: 1 }}>
                  <Typography
                    component="a"
                    href={item.path}
                    variant="body2"
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                      opacity: 0.8,
                      '&:hover': {
                        color: 'grey.50',
                        fontWeight: 600,
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
              ].map((service) => (
                <Box component="li" key={service} sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.8, lineHeight: 1.6 }}
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
            
            <ContactItem>
              <LocationOn />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {companyInfo.address.street}<br />
                {companyInfo.address.city}, {companyInfo.address.country}
              </Typography>
            </ContactItem>
            
            <ContactItem>
              <Phone />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {companyInfo.contact.phone}
              </Typography>
            </ContactItem>
            
            <ContactItem>
              <Email />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {companyInfo.contact.email}
              </Typography>
            </ContactItem>
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
