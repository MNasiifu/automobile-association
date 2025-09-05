import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
} from '@mui/material';
import {
  Construction as ConstructionIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { PageHeader } from '../../components/molecules';
import { SEO } from '../../components/SEO';
import { membershipSEO } from '../../data/seoData';

const ComingSoonSection = styled(Box)(({ theme }) => ({
  minHeight: '60vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}05 100%)`,
}));

const ComingSoonCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: 'center',
  borderRadius: theme.spacing(3),
  maxWidth: 600,
  margin: '0 auto',
  boxShadow: theme.shadows[8],
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  '& svg': {
    color: 'white',
    fontSize: '4rem',
  },
}));

const MembershipPage: React.FC = () => {
  return (
    <Box>
      <SEO seoData={membershipSEO} />
      <PageHeader
        title="AA Uganda Membership"
        subtitle="Trusted roadside support and exclusive benefits across Uganda"
      />

      {/* Coming Soon Section */}
      <ComingSoonSection>
        <Container maxWidth="md">
          <ComingSoonCard>
            <IconWrapper>
              <ConstructionIcon />
            </IconWrapper>
            <Typography 
              variant="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                color: 'primary.main',
                mb: 3 
              }}
            >
              Coming Soon
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary" 
              sx={{ 
                mb: 4,
                fontWeight: 400,
                lineHeight: 1.6 
              }}
            >
              Page Under Development
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 480,
                mx: 'auto',
                lineHeight: 1.8 
              }}
            >
              We're working hard to bring you a comprehensive membership experience. 
              Our team is developing exciting features and benefits that will make your 
              journey with AA Uganda even better. Stay tuned for updates!
            </Typography>
          </ComingSoonCard>
        </Container>
      </ComingSoonSection>
    </Box>
  );
};

export default MembershipPage;
