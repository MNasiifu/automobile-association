import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Paper,
  Chip,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import {
  Security as InsuranceIcon,
  DirectionsCar as CarIcon,
  CheckCircle as CheckIcon,
  AccountBalance as BankIcon,
  Speed as FastIcon,
  Support as SupportIcon,
  ExpandMore as ExpandMoreIcon,
  MonetizationOn as MoneyIcon,
  HelpOutline as HelpIcon,
  Lightbulb as LightbulbIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { ContactButtons, PageHeader } from "../../components/molecules";
import { Heading } from "../../components/atoms";
import { SEO } from "../../components/SEO";
import { insuranceServicesSEO } from "../../data/seoData";
import { config } from "../../utils/config/config";
import { FormattedTypography } from "../../utils/textFormatter";

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}10 100%)`,
  padding: theme.spacing(8, 0),
  position: "relative",
  overflow: "hidden",
}));

const PricingCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s ease-in-out",
  borderRadius: theme.spacing(2),
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[12],
  },
}));

const PremiumCard = styled(PricingCard)(({ theme }) => ({
  border: `3px solid ${theme.palette.secondary.main}`,
  background: `linear-gradient(135deg, ${theme.palette.secondary.light}10 0%, ${theme.palette.primary.light}05 100%)`,
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  "& svg": {
    color: "white",
    fontSize: "2rem",
  },
}));

const ProcessStep = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  height: "100%",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const FAQSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[100]} 100%)`,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(circle at 20% 80%, ${theme.palette.primary.main}08 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, ${theme.palette.secondary.main}08 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, ${theme.palette.primary.main}05 0%, transparent 50%)`,
    pointerEvents: "none",
  },
}));

const FAQContainer = styled(Container)(() => ({
  position: "relative",
  zIndex: 1,
}));

const FAQHeader = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(6),
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: theme.spacing(-2),
    left: "50%",
    transform: "translateX(-50%)",
    width: 80,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: 2,
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: `${theme.spacing(2)} !important`,
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
    transform: "translateY(-2px)",
  },
  "&.Mui-expanded": {
    margin: `${theme.spacing(2)} 0 !important`,
    boxShadow: `0 8px 32px ${theme.palette.primary.main}15`,
    border: `1px solid ${theme.palette.primary.light}`,
  },
  "&::before": {
    display: "none",
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  transition: "all 0.3s ease",
  "&:hover": {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}05 0%, ${theme.palette.secondary.main}05 100%)`,
  },
  "&.Mui-expanded": {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}10 100%)`,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: theme.palette.primary.main,
    transition: "all 0.3s ease",
    "&.Mui-expanded": {
      transform: "rotate(180deg)",
      color: theme.palette.secondary.main,
    },
  },
  "& .MuiAccordionSummary-content": {
    margin: `${theme.spacing(1)} 0`,
    alignItems: "center",
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.default,
  borderTop: "none",
  "& .MuiTypography-root": {
    lineHeight: 1.7,
  },
}));

const QuestionIcon = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(2),
  flexShrink: 0,
  "& svg": {
    color: "white",
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: 28,
    height: 28,
    marginRight: theme.spacing(1.5),
    "& svg": {
      fontSize: "1rem",
    },
  },
}));

const InsuranceServices: React.FC = () => {
  // State for managing which FAQ accordion is expanded
  const [expandedFaq, setExpandedFaq] = useState<string | false>(false);

  // Handler for FAQ accordion expansion
  const handleFaqChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedFaq(isExpanded ? panel : false);
  };

  // Handler for getting insurance quote - benchmarked from handleTalkToUs in ContactButtons.tsx
  const handleGetQuote = () => {
    try {
      window.location.href = `tel:${config.company.contactNumber}`;
    } catch (error) {
      console.error('Error initiating phone call for insurance quote:', error);
      // Fallback: copy number to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(config.company.contactNumber);
        alert(`Phone number copied to clipboard: ${config.company.contactNumber}`);
      } else {
        alert(`Please call us at: ${config.company.contactNumber}`);
      }
    }
  };

  const insurancePlans = [
    {
      title: "Third Party",
      price: "From UGX 180,000",
      period: "per year",
      description: "Basic legal requirement coverage",
      icon: <CarIcon />,
      features: [
        "Third party liability coverage",
        "Legal requirement compliance",
        "Basic roadside assistance",
        "Certificate issuance",
        "Quick processing",
        "Nationwide acceptance",
      ],
      popular: false,
    },
    {
      title: "Comprehensive",
      price: "From UGX 450,000",
      period: "per year",
      description: "Complete protection package",
      icon: <InsuranceIcon />,
      features: [
        "All Third Party benefits",
        "Own damage coverage",
        "Theft protection",
        "Fire & flood coverage",
        "Windscreen replacement",
        "Emergency rescue priority",
        "Rental car provision",
        "Personal accident cover",
      ],
      popular: true,
    },
    {
      title: "Commercial Fleet",
      price: "Custom Pricing",
      period: "contact us",
      description: "Tailored business solutions",
      icon: <BankIcon />,
      features: [
        "Fleet management coverage",
        "Multiple vehicle discounts",
        "Driver protection",
        "Business interruption",
        "Goods in transit",
        "Public liability",
        "Dedicated claims handler",
        "Risk management support",
      ],
      popular: false,
    },
  ];

  const claimsProcess = [
    {
      title: "Report the Incident",
      description: "Call our 24/7 hotline immediately after any incident",
      details: "Contact us on 0800-100-100 or report online",
    },
    {
      title: "Document Everything",
      description: "Take photos and gather relevant information",
      details: "Photos, police report, witness details if applicable",
    },
    {
      title: "Submit Your Claim",
      description: "Complete claim forms with required documentation",
      details: "Online submission or visit our offices",
    },
    {
      title: "Assessment & Approval",
      description: "Our team reviews and processes your claim",
      details: "Typically completed within 48-72 hours",
    },
    {
      title: "Receive Payment",
      description: "Get your settlement or vehicle repairs",
      details: "Direct payment or approved garage repairs",
    },
  ];

  const insuranceFeatures = [
    {
      title: "Quick Claims Processing",
      description: "48-hour claim processing with minimal paperwork",
      icon: <FastIcon />,
    },
    {
      title: "24/7 Support Hotline",
      description: "Round-the-clock assistance for emergencies",
      icon: <SupportIcon />,
    },
    {
      title: "Nationwide Coverage",
      description: "Protected anywhere in Uganda and East Africa",
      icon: <CheckIcon />,
    },
    {
      title: "Flexible Payment Plans",
      description: "Monthly, quarterly, or annual payment options",
      icon: <MoneyIcon />,
    },
  ];

  const faqData = [
    {
      question: "What does comprehensive motor insurance cover?",
      answer:
        "Our **comprehensive insurance** provides complete protection for your vehicle and peace of mind on the road. Coverage includes: damage to your own vehicle from accidents, theft, fire, flood, and vandalism, plus full third-party liability protection. Additional benefits include **windscreen replacement**, **24/7 emergency roadside assistance**, and **personal accident cover** for you and your passengers.",
    },
    {
      question: "How quickly are claims processed?",
      answer:
        "We pride ourselves on **fast claim processing**. Most claims are processed within **48-72 hours** of receiving complete documentation. For emergency situations and minor claims, we often provide approval within **24 hours**. Our streamlined digital process ensures you get back on the road quickly.",
    },
    {
      question: "Can I get insurance for an imported vehicle?",
      answer:
        "**Absolutely yes!** We provide comprehensive coverage for both locally assembled and imported vehicles. For imported vehicles, we may require an additional inspection to determine current market value, ensuring you get the right coverage at the best price. Our expertise covers all vehicle types and origins.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We offer **flexible payment options** to suit your convenience: **Mobile Money** (MTN Mobile Money, Airtel Money), **bank transfers**, **cash payments** at our offices, and **credit/debit cards**. We also provide convenient **payment plans** for annual premiums, making insurance affordable for everyone.",
    },
    {
      question: "Do you offer discounts for multiple vehicles?",
      answer:
        "Yes! We offer **attractive fleet discounts** for multiple vehicles. The more vehicles you insure with us, the greater your savings. Our fleet insurance packages are perfect for families with multiple cars or businesses managing vehicle fleets. **Contact us** for a personalized quote and discover your potential savings.",
    },
  ];

  return (
    <Box>
      <SEO seoData={insuranceServicesSEO} />
      <PageHeader
        title="Motor Insurance Services"
        subtitle="Comprehensive vehicle protection and peace of mind on Uganda's roads"
      />

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontWeight: 700, mb: 3 }}
              >
                Protect Your Vehicle Investment
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.6 }}
              >
                Get comprehensive motor insurance coverage with AA Uganda. From
                basic third-party to full comprehensive protection, we've got
                your vehicle covered with competitive rates and excellent
                customer service.
              </Typography>
              <Alert sx={{ mb: 4, backgroundColor: "#bedaf0" }}>
                <Typography variant="body1">
                  <strong>Special Offer:</strong> Get 10% off your first year
                  premium when you combine with AA Membership!
                </Typography>
              </Alert>
              <ContactButtons whatsappMessage="Hello! I would like to inquire about your insurance services." />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "center", display: { xs: "none", md: "block" } }}>
                <InsuranceIcon
                  sx={{ fontSize: 200, color: "primary.main", opacity: 0.1 }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Insurance Plans */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Choose Your Coverage Plan
        </Heading>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 800, mx: "auto" }}
        >
          Flexible insurance options to suit every budget and protection need.
        </Typography>

        <Grid container spacing={4}>
          {insurancePlans.map((plan, index) => {
            const CardComponent = plan.popular ? PremiumCard : PricingCard;
            return (
              <Grid item xs={12} md={4} key={index}>
                <CardComponent>
                  {plan.popular && (
                    <Chip
                      label="Most Popular"
                      color="secondary"
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <IconWrapper sx={{ mx: "auto" }}>{plan.icon}</IconWrapper>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {plan.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      {plan.description}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h4"
                        color="primary.main"
                        sx={{ fontWeight: "bold" }}
                      >
                        {plan.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {plan.period}
                      </Typography>
                    </Box>

                    <List>
                      {plan.features.map((feature, idx) => (
                        <ListItem key={idx} sx={{ pl: 0, py: 0.25 }}>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <CheckIcon
                              sx={{ fontSize: "1rem", color: "success.main" }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{ variant: "body2" }}
                          />
                        </ListItem>
                      ))}
                    </List>

                    <Button
                      variant={plan.popular ? "contained" : "outlined"}
                      fullWidth
                      size="large"
                      onClick={handleGetQuote}
                      sx={{ mt: 3 }}
                    >
                      Contact Support
                    </Button>
                  </CardContent>
                </CardComponent>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Insurance Features */}
      <Box sx={{ backgroundColor: "grey.50", py: 8 }}>
        <Container maxWidth="lg">
          <Heading variant="h2" align="center" gutterBottom>
            Why Choose AA Uganda Insurance?
          </Heading>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Experience the difference with our customer-focused approach
          </Typography>

          <Grid container spacing={4}>
            {insuranceFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ProcessStep>
                  <IconWrapper sx={{ mx: "auto" }}>{feature.icon}</IconWrapper>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </ProcessStep>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Claims Process */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Simple Claims Process
        </Heading>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Filing a claim is easy with our streamlined process
        </Typography>

        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Stepper orientation="vertical">
            {claimsProcess.map((step, index) => (
              <Step key={index} active>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    },
                  }}
                >
                  {step.title}
                </StepLabel>
                <StepContent>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {step.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontStyle: "italic" }}
                  >
                    {step.details}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Alert severity="success" sx={{ mb: 3, maxWidth: 600, mx: "auto" }}>
            <Typography variant="body1">
              <strong>Emergency Hotline:</strong> {config.company.emergencyHotline} (Available 24/7)
            </Typography>
          </Alert>
          <ContactButtons 
            phoneText="Talk To Customer Support"
            whatsappMessage="Hello! I would like to start claim process."
            justifyContent="center"
            spacing={3}
            buttonSx={{ px: {xs: 1, sm: 4}, py: 2 }}
          />
        </Box>
      </Container>

      {/* FAQ Section */}
      <FAQSection sx={{ py: { xs: 6, md: 8 } }}>
        <FAQContainer maxWidth="lg">
          <FAQHeader>
            <Box sx={{ mb: 2 }}>
              <LightbulbIcon 
                sx={{ 
                  fontSize: { xs: 48, md: 56 }, 
                  color: 'primary.main',
                  mb: 2,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                }} 
              />
            </Box>
            <Heading 
              variant="h2" 
              align="center" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 2
              }}
            >
              Frequently Asked Questions
            </Heading>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{ 
                maxWidth: 600, 
                mx: 'auto',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                lineHeight: 1.6
              }}
            >
              Get instant answers to common questions about our comprehensive motor insurance services
            </Typography>
          </FAQHeader>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box sx={{ maxWidth: { xs: '100%', md: 900 }, mx: "auto" }}>
                {faqData.map((faq, index) => {
                  const panelId = `panel${index}`;
                  const isExpanded = expandedFaq === panelId;
                  
                  return (
                    <StyledAccordion 
                      key={index}
                      expanded={isExpanded}
                      onChange={handleFaqChange(panelId)}
                      elevation={0}
                    >
                      <StyledAccordionSummary 
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${panelId}-content`}
                        id={`${panelId}-header`}
                      >
                        <QuestionIcon>
                          <HelpIcon />
                        </QuestionIcon>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                            color: isExpanded ? 'primary.main' : 'text.primary',
                            transition: 'color 0.3s ease',
                            pr: 1
                          }}
                        >
                          {faq.question}
                        </Typography>
                      </StyledAccordionSummary>
                      <StyledAccordionDetails>
                        <Box sx={{ pl: { xs: 0, sm: 6 } }}>
                          <FormattedTypography 
                            variant="body1" 
                            sx={{
                              color: 'text.secondary',
                              fontSize: { xs: '0.9rem', sm: '1rem' },
                              lineHeight: 1.7,
                              '& strong': {
                                color: 'primary.main',
                                fontWeight: 600
                              }
                            }}
                          >
                            {faq.answer}
                          </FormattedTypography>
                        </Box>
                      </StyledAccordionDetails>
                    </StyledAccordion>
                  );
                })}
              </Box>
            </Grid>
          </Grid>

          {/* FAQ CTA */}
          <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 6 } }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: 3,
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
                border: (theme) => `1px solid ${theme.palette.primary.light}30`,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem' },
                  color: 'primary.main'
                }}
              >
                Still have questions?
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ mb: 3, fontSize: { xs: '0.9rem', sm: '1rem' } }}
              >
                Our expert insurance advisors are here to help you find the perfect coverage for your needs.
              </Typography>
              <ContactButtons 
                phoneText="Speak with Expert"
                whatsappMessage="Hello! I have questions about your insurance services and would like to speak with an expert."
                justifyContent="center"
                spacing={2}
                buttonSx={{ 
                  px: { xs: 2, sm: 3 }, 
                  py: 1.5,
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                  fontWeight: 600
                }}
              />
            </Paper>
          </Box>
        </FAQContainer>
      </FAQSection>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
            backgroundImage: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.secondary.light}20 100%)`,
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to Protect Your Vehicle?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
          >
            Get an instant quote and enjoy peace of mind on every journey with
            AA Uganda motor insurance.
          </Typography>
          <ContactButtons 
            phoneText="Call Support Agent"
            whatsappMessage="Hello! I would like to inquire about AA Insurance."
            justifyContent="center"
            spacing={3}
            buttonSx={{ px: {xs: 1, sm: 4}, py: 2 }}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default InsuranceServices;
