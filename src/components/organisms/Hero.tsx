import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { Button, Heading } from "../atoms";
import { ContactButtons } from "../molecules";
import { heroContent } from "../../data/companyData";
import HeroImage from "../../assets/images/TOWINGANDRECOVERYFRESHCAR.jpeg";
import { Star, Security, Speed, Groups } from "@mui/icons-material";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  minHeight: "calc(100vh - 7vh)",
  display: "flex",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${HeroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.3,
    zIndex: 1,
  },

  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
}));

const HeroContent = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 3,
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
}));

const StatsBox = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.12)",
  backdropFilter: "blur(20px)",
  borderRadius: theme.spacing(2.5),
  padding: theme.spacing(2.5),
  textAlign: "center",
  border: "1px solid rgba(255, 255, 255, 0.25)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  position: "relative",
  overflow: "hidden",
  animation: `${slideInRight} 1s ease-out 0.5s backwards`,

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
    transition: "left 0.8s",
  },

  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
    transform: "translateY(-8px) scale(1.05)",
    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(244, 214, 22, 0.5)",

    "&::before": {
      left: "100%",
    },
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  textTransform: "none",
  fontWeight: 700,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
    transition: "left 0.6s",
  },

  "&:hover::before": {
    left: "100%",
  },
}));

const ContactButtonsWrapper = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(15px)",
  borderRadius: theme.spacing(2.5),
  padding: theme.spacing(2.5),
  border: "1px solid rgba(255, 255, 255, 0.15)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  animation: `${fadeInUp} 1s ease-out 0.7s backwards`,

  "&:hover": {
    background: "rgba(255, 255, 255, 0.12)",
    transform: "translateY(-2px)",
  },
}));

const AnimatedBox = styled(Box)(() => ({
  animation: `${fadeInUp} 1s ease-out`,
}));

const Hero: React.FC = () => {
  return (
    <HeroSection>
      <HeroContent maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} lg={7}>
            <AnimatedBox>
              {/* Trust Badge */}
              <Box sx={{ mb: 3, textAlign: { xs: "center", lg: "left" } }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Star sx={{ color: "secondary.main", fontSize: 20 }} />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, opacity: 0.9 }}
                  >
                    Uganda's #1 Motoring Organization
                  </Typography>
                </Box>
              </Box>

              <Heading
                variant="h1"
                sx={{
                  color: "inherit",
                  mb: 3,
                  fontWeight: 800,
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3rem",
                    md: "3.5rem",
                    lg: "4rem",
                  },
                  textAlign: { xs: "center", lg: "left" },
                  lineHeight: 1.1,
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                {heroContent.title}
              </Heading>

              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.95,
                  lineHeight: 1.6,
                  fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.375rem" },
                  textAlign: { xs: "center", lg: "left" },
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                {heroContent.subtitle}
              </Typography>

              {/* Action Buttons */}
              <Box
                sx={{
                  mb: 4,
                  textAlign: { xs: "center", lg: "left" },
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  alignItems: "center",
                  justifyContent: { xs: "center", lg: "flex-start" },
                }}
              >
                <ActionButton
                  variant="contained"
                  color="secondary"
                  size="large"
                  href={heroContent.ctaLink}
                  sx={{
                    py: 3,
                    px: 6,
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    borderRadius: 4,
                    minWidth: 200,
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                    "&:hover": {
                      transform: "translateY(-4px) scale(1.05)",
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
                    },
                    "&:active": {
                      transform: "translateY(-2px) scale(1.02)",
                    },
                  }}
                >
                  {heroContent.ctaText}
                </ActionButton>

                <ActionButton
                  variant="outlined"
                  size="large"
                  href="/services"
                  sx={{
                    py: 3,
                    px: 6,
                    fontSize: "1.2rem",
                    borderColor: "rgba(255,255,255,0.9)",
                    color: "white",
                    fontWeight: 600,
                    borderRadius: 4,
                    minWidth: 200,
                    borderWidth: 2,
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderWidth: 2,
                      color: "secondary.main",
                      transform: "translateY(-4px) scale(1.05)",
                      boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2)",
                    },
                    "&:active": {
                      transform: "translateY(-2px) scale(1.02)",
                    },
                  }}
                >
                  Our Services
                </ActionButton>
              </Box>

              {/* Contact Options */}
              <ContactButtonsWrapper
                sx={{
                  textAlign: { xs: "center", lg: "left" },
                  width: { xs: "100%", md: "55%" },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    color: "rgba(255, 255, 255, 0.8)",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                >
                  🚨 Need immediate assistance? We're here to help 24/7
                </Typography>
                <ContactButtons
                  phoneText="Emergency Help"
                  whatsappText="Get Info"
                  whatsappMessage="Hello! I'm interested in AA Uganda services. Can you provide more information?"
                  buttonSx={{
                    borderRadius: 3,
                    fontWeight: 600,
                    transition:
                      "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                      transition: "left 0.6s",
                    },
                    "&:hover::before": {
                      left: "100%",
                    },
                    "&.MuiButton-contained": {
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      color: "grey[100]",
                      boxShadow: "0 6px 24px rgba(255, 255, 255, 0.3)",
                      "&:hover": {
                        backgroundColor: "white",
                        transform: "translateY(-4px) scale(1.05)",
                        boxShadow: "0 12px 40px rgba(255, 255, 255, 0.4)",
                      },
                    },
                    "&.MuiButton-outlined": {
                      borderColor: "rgba(255,255,255,0.8)",
                      color: "white",
                      borderWidth: 2,
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        transform: "translateY(-4px) scale(1.05)",
                        boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2)",
                        borderWidth: 2,
                      },
                    },
                  }}
                  sx={{ display: "flex", justifyContent: "center"}}
                />
              </ContactButtonsWrapper>

              {/* Mobile responsive stats for smaller screens */}
              <Box
                sx={{
                  display: { xs: "flex", lg: "none" },
                  justifyContent: "center",
                  gap: 2,
                  mt: 4,
                  mb: 4,
                }}
              >
                <StatsBox
                  sx={{
                    position: "relative",
                    animationDelay: "0.5s",
                    minWidth: 100,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: "secondary.main" }}
                  >
                    37+
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.9, color: "white" }}
                  >
                    Years
                  </Typography>
                </StatsBox>

                <StatsBox sx={{ animationDelay: "0.9s" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    <Speed
                      sx={{ color: "secondary.main", fontSize: 24, mr: 1 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        color: "secondary.main",
                        textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      24/7
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.95, fontWeight: 600, color: "white" }}
                  >
                    Emergency Response
                  </Typography>
                </StatsBox>

                <StatsBox
                  sx={{
                    position: "relative",
                    animationDelay: "0.7s",
                    minWidth: 100,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: "secondary.main" }}
                  >
                    5K+
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.9, color: "white" }}
                  >
                    Members
                  </Typography>
                </StatsBox>
              </Box>
            </AnimatedBox>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                textAlign: "center",
                position: "relative",
                minHeight: "400px",
              }}
            >
              {/* Stats Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <StatsBox sx={{ animationDelay: "0.5s" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    <Security
                      sx={{ color: "secondary.main", fontSize: 24, mr: 1 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        color: "secondary.main",
                        textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      37+
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.95, fontWeight: 600, color: "white" }}
                  >
                    Years of Trust
                  </Typography>
                </StatsBox>

                <StatsBox sx={{ animationDelay: "0.7s" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    <Groups
                      sx={{ color: "secondary.main", fontSize: 24, mr: 1 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        color: "secondary.main",
                        textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      5K+
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.95, fontWeight: 600, color: "white" }}
                  >
                    Happy Members
                  </Typography>
                </StatsBox>

                <StatsBox sx={{ animationDelay: "0.9s" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    <Speed
                      sx={{ color: "secondary.main", fontSize: 24, mr: 1 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        color: "secondary.main",
                        textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      24/7
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.95, fontWeight: 600, color: "white" }}
                  >
                    Emergency Response
                  </Typography>
                </StatsBox>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
