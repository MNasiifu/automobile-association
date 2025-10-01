import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { PageHeader, ContactButtons } from "../components/molecules";
import { SEO } from "../components/SEO";
import { membershipSEO } from "../data/seoData";
import { Card, CardContent, Chip } from "@mui/material";
import { styled } from "@mui/system";
import {
  Security as SecurityIcon,
  Speed as SpeedIcon,
  CardMembership,
  Phone as PhoneIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Heading } from "../components/atoms";
import { config } from "../utils/config/config";
import theme from "../theme";

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

  // Handler to scroll to contact section
  const handleCardClick = () => {
    const contactSection = document.getElementById('membership-contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const FeatureCard = styled(Card)(({ theme }) => ({
    height: "100%",
    transition: "all 0.3s ease-in-out",
    border: `1px solid ${theme.palette.divider}`,
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme?.shadows?.[8] ?? "0px 8px 16px rgba(0,0,0,0.12)",
      borderColor: theme.palette.primary.main,
      "&::after": {
        opacity: 1,
      },
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, rgba(2, 79, 49, 0.02) 0%, rgba(244, 214, 22, 0.02) 100%)",
      opacity: 0,
      transition: "opacity 0.3s ease-in-out",
      pointerEvents: "none",
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
        <Box sx={{ py: 6, backgroundColor: "grey.200", mb: 8, borderRadius: 2 }}>
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
                  <FeatureCard onClick={handleCardClick}>
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
                      <Typography
                        variant="caption"
                        sx={{ 
                          mt: 2, 
                          display: "block",
                          color: "primary.main",
                          fontWeight: 500,
                          opacity: 0.8,
                        }}
                      >
                        Click to join now →
                      </Typography>
                    </CardContent>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Enhanced Coming Soon Banner with Integrated Contact Section */}
        <Box
          id="membership-contact-section"
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            py: { xs: 6, md: 8 },
            px: { xs: 3, md: 4 },
            borderRadius: 2,
            textAlign: "center",
            mb: 8,
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              pointerEvents: "none",
            }
          }}
        >
          {/* Main Heading */}
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
            New Membership Portal Coming Soon
          </Typography>
          
          {/* Description */}
          <Typography sx={{ mb: 4, maxWidth: 700, mx: "auto", opacity: 0.95 }}>
            We're revamping our membership system to serve you better. Stay
            tuned for enhanced features and an improved user experience.
          </Typography>

          {/* Call to Action Subheading */}
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3, 
              fontWeight: 500, 
              color: "secondary.main",
              opacity: 0.9 
            }}
          >
            Ready to Join AA Uganda?
          </Typography>
          
          <Typography sx={{ mb: 4, maxWidth: 600, mx: "auto", opacity: 0.85 }}>
            In the meantime, our team is ready to process your membership application manually. 
            Take the first step towards exclusive benefits and premium services.
          </Typography>
          
          {/* Contact Buttons */}
          <ContactButtons
            phoneText="Talk to us"
            whatsappText="Chat with us"
            phoneContact={config.company.membership.primaryContact}
            whatsappContact={config.company.membership.primaryContact}
            whatsappMessage="Hello! I'm interested in becoming an AA Uganda member. Can you provide information about membership packages and benefits?"
            buttonSx={{
              px: { xs: 3, sm: 4 },
              py: 2,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              borderRadius: 3,
              bgcolor: "primary.contrastText",
              color: "primary.main",
              border: "2px solid transparent",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.9)",
                color: "primary.main",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                border: "2px solid rgba(255,255,255,0.3)",
              },
              '&.MuiButton-contained': {
                background: theme.palette.secondary.main,
                color: 'primary.main',
                '&:hover': {
                  background: theme.palette.secondary.light,
                },
              },
            }}
            spacing={3}
            justifyContent="center"
          />
          
          {/* Contact Information */}
          <Box sx={{ 
            mt: 4, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: { xs: 2, sm: 4 }, 
            flexWrap: "wrap", 
            opacity: 0.8,
            borderTop: "1px solid rgba(255,255,255,0.2)",
            pt: 3
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon fontSize="small" sx={{ color: "primary.contrastText" }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  color: "primary.contrastText"
                }}
              >
                {`${config.company.membership.primaryContact} | ${config.company.membership.secondaryContact}`}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MailOutlineIcon fontSize="small" sx={{ color: "primary.contrastText" }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  color: "primary.contrastText"
                }}
              >
                {config.company.email}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ChatIcon fontSize="small" sx={{ color: "primary.contrastText" }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  color: "primary.contrastText"
                }}
              >
                Available 24/7
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MembershipPage;
