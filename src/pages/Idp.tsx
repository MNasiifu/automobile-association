import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Paper,
  Alert,
  Snackbar,
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon, 
  Verified as VerifiedIcon,
  Search as SearchIcon,
  PostAdd as PostAddIcon
} from '@mui/icons-material';
import { SEO } from '../components/SEO';
import { idpSEO } from '../data/seoData';
import { styled } from '@mui/material/styles';
import { Heading, Button } from '../components/atoms';
import { IDPCard, PageHeader } from '../components/molecules';
import { 
  idpApplicationTypes, 
  idpBenefits, 
  idpRequirements, 
  idpFAQs, 
  verificationInfo 
} from '../data/idpData';

const IDPSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

const BenefitsSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(8, 0),
}));

const RequirementsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

const VerificationSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(8, 0),
}));

const FAQSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.grey[50],
}));

const BenefitCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
}));

const RequirementCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  backgroundColor: theme.palette.background.paper,
}));

const VerificationCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
}));

const InternationalDrivingPermit: React.FC = () => {
  const navigate = useNavigate();
  const [verificationNumber, setVerificationNumber] = useState<string>('');
  const [verificationResult, setVerificationResult] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleApplicationSelect = (applicationId: string) => {
    console.log('Selected application:', applicationId);
    // Navigate to the apply page
    navigate('/idp/apply');
  };

  const handleVerification = () => {
    if (!verificationNumber.trim()) {
      setVerificationResult('Please enter a valid IDP number');
      setShowAlert(true);
      return;
    }

    // Navigate to verify page with the number
    navigate(`/idp/verify?number=${encodeURIComponent(verificationNumber)}`);
  };

  return (
    <Box>
      <SEO seoData={idpSEO} />
      <PageHeader
        title="International Driving Permit"
        subtitle="Get your IDP through AAU - your gateway to driving internationally with confidence and legal compliance."
      />

      {/* Application Types Section */}
      <IDPSection>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<PostAddIcon />}
                onClick={() => navigate('/idp/apply')}
              >
                Apply for IDP
              </Button>
              
              <Button
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<VerifiedIcon />}
                onClick={() => navigate('/idp/verify')}
              >
                Verify IDP
              </Button>
            </Box>
          </Box>
          
          <Grid container spacing={4} justifyContent="center" id="applications">
            {idpApplicationTypes.map((application) => (
              <Grid item xs={12} sm={6} lg={4} key={application.id}>
                <IDPCard 
                  application={application} 
                  onSelect={handleApplicationSelect}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </IDPSection>

      {/* Benefits Section */}
      <BenefitsSection>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Heading variant="h2" gutterBottom>
              Why Get an International Driving Permit?
            </Heading>
            
            <Typography variant="h6" color="text.secondary">
              Essential for international travel and driving abroad
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {idpBenefits.map((benefit, index) => (
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
                    <Typography variant="h4">🌍</Typography>
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

      {/* Requirements Section */}
      <RequirementsSection>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Heading variant="h2" gutterBottom>
              Application Requirements
            </Heading>
            
            <Typography variant="h6" color="text.secondary">
              Everything you need to know to apply for your IDP
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <RequirementCard>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Eligibility Criteria
                </Typography>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {idpRequirements.eligibility.map((requirement, index) => (
                    <Typography component="li" variant="body2" key={index} sx={{ mb: 1 }}>
                      {requirement}
                    </Typography>
                  ))}
                </Box>
              </RequirementCard>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <RequirementCard>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Required Documents
                </Typography>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {idpRequirements.documentation.map((doc, index) => (
                    <Typography component="li" variant="body2" key={index} sx={{ mb: 1 }}>
                      {doc}
                    </Typography>
                  ))}
                </Box>
              </RequirementCard>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <RequirementCard>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Application Process
                </Typography>
                <Box component="ol" sx={{ pl: 2, m: 0 }}>
                  {idpRequirements.process.map((step, index) => (
                    <Typography component="li" variant="body2" key={index} sx={{ mb: 1 }}>
                      {step}
                    </Typography>
                  ))}
                </Box>
              </RequirementCard>
            </Grid>
          </Grid>
        </Container>
      </RequirementsSection>

      {/* IDP Verification Section */}
      <VerificationSection id="verification">
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Heading variant="h2" gutterBottom sx={{ color: 'inherit' }}>
              {verificationInfo.title}
            </Heading>
            
            <Typography variant="h6" sx={{ color: 'inherit', opacity: 0.9 }}>
              {verificationInfo.description}
            </Typography>
          </Box>
          
          <VerificationCard>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Verify IDP Online
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Enter your IDP number below to verify its authenticity
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, maxWidth: 400, mx: 'auto' }}>
                <TextField
                  fullWidth
                  placeholder="Enter IDP Number (e.g., UG123456789)"
                  value={verificationNumber}
                  onChange={(e) => setVerificationNumber(e.target.value)}
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  onClick={handleVerification}
                  sx={{ minWidth: 120 }}
                >
                  Verify
                </Button>
              </Box>
            </Box>
            
            <Grid container spacing={3}>
              {verificationInfo.features.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <VerifiedIcon sx={{ mr: 1, color: 'success.main' }} />
                    <Typography variant="body2">{feature}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </VerificationCard>
        </Container>
      </VerificationSection>

      {/* FAQ Section */}
      <FAQSection>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Heading variant="h2" gutterBottom>
              Frequently Asked Questions
            </Heading>
            
            <Typography variant="h6" color="text.secondary">
              Get answers to common questions about International Driving Permits
            </Typography>
          </Box>
          
          <Box>
            {idpFAQs.map((faq, index) => (
              <Accordion key={index} sx={{ mb: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}a-content`}
                  id={`panel${index}a-header`}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </FAQSection>

      {/* Alert Snackbar */}
      <Snackbar
        open={showAlert}
        autoHideDuration={4000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity={verificationResult.includes('✅') ? 'success' : verificationResult.includes('❌') ? 'error' : 'info'}
          sx={{ width: '100%' }}
        >
          {verificationResult}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InternationalDrivingPermit;
