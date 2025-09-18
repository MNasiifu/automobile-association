import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button } from '../../atoms';
import { ContactButtons } from '../../molecules';
import { companyInfo, management } from '../../../data/companyData';
import { 
  Business,
  Visibility,
  EmojiObjects,
  Star
} from '@mui/icons-material';
import theme from '../../../theme';

const AboutSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: theme.palette.background.paper,
  position: 'relative',
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease-in-out',
  background: theme.palette.background.default,
  
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
    
    '& .feature-icon': {
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
  boxShadow: '0 8px 32px rgba(2, 79, 49, 0.2)',
  
  '& .MuiSvgIcon-root': {
    fontSize: 36,
    color: theme.palette.primary.contrastText,
  },
}));

const TeamPreview = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.background.default} 100%)`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  marginTop: theme.spacing(6),
}));

const TeamMemberCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  transition: 'all 0.3s ease-in-out',
  
  '&:hover': {
    transform: 'translateY(-4px)',
    background: theme.palette.background.default,
    boxShadow: theme.shadows[4],
    
    '& .member-avatar': {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 32px rgba(2, 79, 49, 0.2)',
    },
  },
}));

const MemberAvatar = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  margin: '0 auto 16px auto',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: `3px solid ${theme.palette.primary.main}`,
  transition: 'all 0.3s ease-in-out',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  
  [theme.breakpoints.down('sm')]: {
    width: 60,
    height: 60,
  },
}));

const features = [
  {
    icon: Business,
    title: 'Our Mission',
    description: companyInfo.mission,
  },
  {
    icon: Visibility,
    title: 'Our Vision',
    description: companyInfo.vision,
  },
  {
    icon: EmojiObjects,
    title: 'Our Values',
    description: companyInfo.values.slice(0, 3).join(', ') + ' and more...',
  },
  {
    icon: Star,
    title: 'Excellence',
    description: 'Committed to providing the highest quality motoring solutions and services across Uganda.',
  },
];

const AboutPreview: React.FC = () => {
  return (
    <AboutSection>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              color: theme.palette.primary.main
            }}
          >
            About AA Uganda
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              mb: 2,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
            }}
          >
            {companyInfo.description}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' }
            }}
          >
            Founded in {companyInfo.founded} • {companyInfo.phrase}
          </Typography>
        </Box>

        {/* Mission, Vision, Values */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard elevation={0}>
                <IconWrapper className="feature-icon">
                  <feature.icon />
                </IconWrapper>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                  }}
                >
                  {feature.title}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    lineHeight: 1.6,
                    fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' }
                  }}
                >
                  {feature.description}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography 
            variant="h4" 
            color="primary" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
            }}
          >
            Ready to Join AA Uganda?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4, 
              maxWidth: 500, 
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
            }}
          >
            Experience the peace of mind that comes with Uganda's most trusted motoring organization
          </Typography>
          
          <Grid item container justifyContent="center">
          <ContactButtons 
            phoneText="Talk to us"
            whatsappText="Chat with us"
            whatsappMessage="Hello! I'm interested in becoming an AA Uganda member. Can you provide more information?"
          />
          </Grid>
        </Box>
      </Container>
    </AboutSection>
  );
};

export default AboutPreview;
