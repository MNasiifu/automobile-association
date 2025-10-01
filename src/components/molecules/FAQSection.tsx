import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Paper
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  HelpOutline as HelpIcon,
  Lightbulb as LightbulbIcon 
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Heading } from '../atoms';
import { FormattedTypography } from '../../utils/textFormatter';
import theme from '../../theme';
import { config } from '../../utils/config/config';

// Enhanced FAQ Section Styled Components
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

// Types
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  showCTA?: boolean;
  ctaTitle?: string;
  ctaDescription?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  sx?: object;
}

const FAQSectionComponent: React.FC<FAQSectionProps> = ({
  title = "Frequently Asked Questions",
  subtitle = "Get instant answers to common questions",
  faqs,
  showCTA = true,
  ctaTitle = "Still have questions?",
  ctaDescription = "Our friendly customer service team is available 24/7 to help you with any questions about our services.",
  phoneNumber = config.company.contactNumber,
  whatsappNumber = config.company.whatsAppNumber,
  whatsappMessage = "Hello%20AA%20Uganda!%20I%20have%20a%20question%20about%20your%20services.",
  maxWidth = "lg",
  sx = {},
}) => {
  // State for controlling FAQ accordion expansion (only one can be open at a time)
  const [expandedFAQ, setExpandedFAQ] = useState<string | false>(false);

  // Handler for FAQ accordion expansion
  const handleFAQAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedFAQ(isExpanded ? panel : false);
  };

  return (
    <FAQSection sx={{ py: { xs: 6, md: 8 }, ...sx }}>
      <FAQContainer maxWidth={maxWidth}>
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
            {title}
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
            {subtitle}
          </Typography>
        </FAQHeader>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => {
              const panelId = `faq-left-${index}`;
              const isExpanded = expandedFAQ === panelId;
              
              return (
                <StyledAccordion 
                  key={index}
                  expanded={isExpanded}
                  onChange={handleFAQAccordionChange(panelId)}
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
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
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
                        variant="body2" 
                        sx={{
                          color: 'text.secondary',
                          fontSize: { xs: '0.85rem', sm: '0.9rem' },
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
          </Grid>
          <Grid item xs={12} md={6}>
            {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => {
              const panelId = `faq-right-${index}`;
              const isExpanded = expandedFAQ === panelId;
              
              return (
                <StyledAccordion 
                  key={index}
                  expanded={isExpanded}
                  onChange={handleFAQAccordionChange(panelId)}
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
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
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
                        variant="body2" 
                        sx={{
                          color: 'text.secondary',
                          fontSize: { xs: '0.85rem', sm: '0.9rem' },
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
          </Grid>
        </Grid>

        {/* FAQ CTA */}
        {showCTA && (
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
                {ctaTitle}
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ mb: 3, fontSize: { xs: '0.9rem', sm: '1rem' } }}
              >
                {ctaDescription}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Paper
                  elevation={2}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    background: theme.palette.primary.main,
                    color: theme.palette.secondary.main,
                    fontWeight: 600,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      color: 'white',
                      boxShadow: (theme) => `0 8px 24px ${theme.palette.primary.main}30`,
                    }
                  }}
                  component="a"
                  href={`tel:${phoneNumber}`}
                >
                  Talk to us: {phoneNumber}
                </Paper>
                <Paper
                  elevation={2}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    background: 'white',
                    color: theme.palette.secondary.dark,
                    fontWeight: 600,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: (theme) => `0 8px 24px ${theme.palette.success.main}30`,
                    }
                  }}
                  component="a"
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat with us
                </Paper>
              </Box>
            </Paper>
          </Box>
        )}
      </FAQContainer>
    </FAQSection>
  );
};

export default FAQSectionComponent;
