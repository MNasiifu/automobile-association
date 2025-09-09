import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { PageHeader } from '../components/molecules';
import { SEO } from '../components/SEO';
import { membershipSEO } from '../data/seoData';
import { Card, CardContent, Chip } from '@mui/material';
import { styled } from '@mui/system';
import { Security as SecurityIcon, Speed as SpeedIcon, CardMembership } from '@mui/icons-material';
import { Heading } from '../components/atoms';

const MembershipPage: React.FC = () => {
  const membershipBenefits = [
    {
      icon: <CardMembership sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "AA Member Rate",
      description: "Pay only UGX 250,000 instead of UGX 350,000",
      savings: "Save UGX 100,000",
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Priority Processing",
      description: "Faster processing times for AA members",
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Additional Support",
      description: "Access to AA roadside assistance and travel support",
    },
  ];

  const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s ease-in-out",
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme?.shadows?.[8] ?? "0px 8px 16px rgba(0,0,0,0.12)",
    borderColor: theme.palette.primary.main,
  },
}));

  return (
    <Box>
      <SEO seoData={membershipSEO} />
      <PageHeader 
        title="AA Uganda Membership"
        subtitle="Join Us Today"
        description="Experience exclusive benefits and premium services with AA Uganda membership."
      />

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
         {/* Membership Benefits Section */}
                <Box sx={{ py: 6, backgroundColor: "grey.50" }}>
                  <Container maxWidth="lg">
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                      <Heading variant="h3" align="center" gutterBottom>
                        Why Join AA Uganda?
                      </Heading>
                      <Typography variant="h6" color="text.secondary">
                        Enjoy exclusive benefits and significant savings as an AA member
                      </Typography>
                    </Box>
        
                    <Grid container spacing={3}>
                      {membershipBenefits.map((benefit, index) => (
                        <Grid item xs={12} md={4} key={index}>
                          <FeatureCard>
                            <CardContent sx={{ textAlign: "center", p: 3 }}>
                              {benefit.icon}
                              <Typography
                                variant="h6"
                                sx={{ mt: 2, mb: 1, fontWeight: 600 }}
                              >
                                {benefit.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 2 }}
                              >
                                {benefit.description}
                              </Typography>
                              {"savings" in benefit && (
                                <Chip
                                  label={benefit.savings}
                                  color="secondary"
                                  variant="filled"
                                  sx={{ fontWeight: 600 }}
                                />
                              )}
                            </CardContent>
                          </FeatureCard>
                        </Grid>
                      ))}
                    </Grid>
                  </Container>
                </Box>

        {/* Coming Soon Banner */}
        <Box 
          sx={{ 
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            py: 6,
            px: 4,
            borderRadius: 2,
            textAlign: 'center',
            mb: 8
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            New Membership Portal Coming Soon
          </Typography>
          <Typography>
            We're revamping our membership system to serve you better. 
            Stay tuned for enhanced features and an improved user experience.
          </Typography>
        </Box>

        {/* Contact Information */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Want to Know More?
          </Typography>
          <Typography color="text.secondary">
            Visit our office or call us at +256752760252 | +256776760252
          </Typography>
          <Typography color="text.secondary">
            Email: odongkara@aau.co.ug
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default MembershipPage;
