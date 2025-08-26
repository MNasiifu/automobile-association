import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Heading } from '../components/atoms';
import { MembershipCard } from '../components/molecules';
import { membershipPlans, membershipBenefits, membershipFAQs } from '../data/membershipData';

const MembershipSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

const BenefitsSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(8, 0),
}));

const FAQSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

const BenefitCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
}));

const Membership: React.FC = () => {
  const handlePlanSelect = (planId: string) => {
    // Handle membership plan selection
    console.log('Selected plan:', planId);
    // In a real app, this would redirect to payment or signup
  };

  return (
    <Box>
      {/* Hero Section */}
      <MembershipSection>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Heading variant="h1" gutterBottom>
              Membership Plans
            </Heading>
            
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Choose the membership plan that best fits your needs and enjoy 
              comprehensive automotive services with exclusive benefits.
            </Typography>
          </Box>
          
          <Grid container spacing={4} justifyContent="center">
            {membershipPlans.map((plan) => (
              <Grid item xs={12} sm={6} lg={4} key={plan.id}>
                <MembershipCard 
                  plan={plan} 
                  onSelect={handlePlanSelect}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </MembershipSection>

      {/* Benefits Section */}
      <BenefitsSection>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Heading variant="h2" gutterBottom>
              Why Choose AA Uganda Membership?
            </Heading>
            
            <Typography variant="h6" color="text.secondary">
              Experience the benefits that come with being part of Uganda's 
              premier automotive association
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {membershipBenefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <BenefitCard>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'primary.main',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px auto',
                      color: 'primary.contrastText',
                    }}
                  >
                    {/* Icon placeholder - in real app, use benefit.icon */}
                    <Typography variant="h4">★</Typography>
                  </Box>
                  
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {benefit.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </BenefitCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </BenefitsSection>

      {/* FAQ Section */}
      <FAQSection>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Heading variant="h2" gutterBottom>
              Frequently Asked Questions
            </Heading>
            
            <Typography variant="h6" color="text.secondary">
              Find answers to common questions about our membership services
            </Typography>
          </Box>
          
          <Box>
            {membershipFAQs.map((faq, index) => (
              <Box key={index} sx={{ mb: 4, pb: 3, borderBottom: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {faq.question}
                </Typography>
                
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                  {faq.answer}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </FAQSection>
    </Box>
  );
};

export default Membership;
