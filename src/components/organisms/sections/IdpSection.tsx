import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Button } from "../../atoms";
import {
  DriveEta,
  Public,
  Verified,
  FlightTakeoff,
  Security,
  Speed,
  CardMembership,
  Search,
} from "@mui/icons-material";
import { idpBenefits } from "../../../data/idpData";
import theme from "../../../theme";

const IdpSectionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: `linear-gradient(135deg, #dff4f9 0%, rgb(241 252 248) 50%, #bfcfd7 100%)`,
  position: "relative",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: "-50%",
    right: "-20%",
    width: "40%",
    height: "200%",
    background: `linear-gradient(45deg, transparent 0%, rgb(225 217 167) 20%, rgb(244 231 189 / 55%) 40%, transparent 60%)`,
    transform: "rotate(-15deg)",
    zIndex: 1,
  },

  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-50%",
    left: "-20%",
    width: "40%",
    height: "200%",
    background: `linear-gradient(-45deg, 
      transparent 0%, 
      rgb(225 217 167) 20%, 
      rgb(244 231 189 / 55%) 40%, 
      transparent 60%)`,
    transform: "rotate(15deg)",
    zIndex: 1,
  },
}));

const IdpContainer = styled(Container)(() => ({
  position: "relative",
  zIndex: 2,
}));

const HeroCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.spacing(3),
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%, 
    ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  marginBottom: theme.spacing(8),
  border: "none",
  boxShadow: "0 20px 60px rgba(2, 79, 49, 0.15)",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20S-10 18.954-10 30s8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    zIndex: 1,
  },

  "& > *": {
    position: "relative",
    zIndex: 2,
  },

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(4),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const BenefitCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: "100%",
  borderRadius: theme.spacing(2),
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(2, 79, 49, 0.1)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, 
      ${theme.palette.primary.main} 0%, 
      ${theme.palette.secondary.main} 100%)`,
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.3s ease-in-out",
  },

  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 20px 40px rgba(2, 79, 49, 0.15)",
    background: "rgba(255, 255, 255, 1)",

    "&::before": {
      transform: "scaleX(1)",
    },

    "& .benefit-icon": {
      transform: "scale(1.1) rotate(5deg)",
      background: `linear-gradient(135deg, 
        ${theme.palette.primary.main} 0%, 
        ${theme.palette.secondary.main} 100%)`,
    },
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 70,
  height: 70,
  borderRadius: "50%",
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.light} 0%, 
    ${theme.palette.primary.main} 100%)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 24px auto",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0 8px 32px rgba(2, 79, 49, 0.2)",

  "& .MuiSvgIcon-root": {
    fontSize: 32,
    color: theme.palette.primary.contrastText,
  },

  [theme.breakpoints.down("sm")]: {
    width: 60,
    height: 60,
    "& .MuiSvgIcon-root": {
      fontSize: 28,
    },
  },
}));

const ActionButtonsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(3),
  flexWrap: "wrap",
  marginTop: theme.spacing(4),

  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(2),
    "& .MuiButton-root": {
      minWidth: "160px",
      width: "100%",
      maxWidth: "200px",
    },
  },
}));

const StatsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
  flexWrap: "wrap",

  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(2),
  },
}));

const StatItem = styled(Box)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.primary.contrastText,

  "& .stat-number": {
    fontSize: "2rem",
    fontWeight: 800,
    lineHeight: 1,
    marginBottom: theme.spacing(0.5),

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },

  "& .stat-label": {
    fontSize: "0.875rem",
    opacity: 0.9,
    fontWeight: 500,

    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem",
    },
  },
}));

const AdditionalFeaturesCard = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  background: "#e3f3eefc",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(2, 79, 49, 0.1)",
  textAlign: "center",
  position: "relative",
  transition: "all 0.3s ease-in-out",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, 
      ${theme.palette.primary.main} 0%, 
      ${theme.palette.secondary.main} 100%)`,
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.3s ease-in-out",
  },

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 32px rgba(2, 79, 49, 0.1)",
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

// Map icon names to actual icons
const iconMap: { [key: string]: React.ElementType } = {
  Public,
  Gavel: Security,
  Security,
  Verified,
};

const IdpSection: React.FC = () => {
  const navigate = useNavigate();

  // Navigation functions for better SPA performance
  const handleApplyIdp = () => {
    navigate('/idp/apply');
  };

  const handleVerifyIdp = () => {
    navigate('/idp/verify');
  };

  const handleLearnMore = () => {
    navigate('/idp/about');
  };

  const handleContact = () => {
    navigate('/contact');
  };

  return (
    <IdpSectionWrapper>
      <IdpContainer maxWidth="lg">
        {/* Hero Section */}
        <HeroCard elevation={0}>
          <Box sx={{ mb: 4 }}>
            <DriveEta
              sx={{
                fontSize: { xs: 60, sm: 70, md: 80 },
                mb: 2,
                opacity: 0.9,
              }}
            />
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 3,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.2,
            }}
          >
            International Driving Permit
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              opacity: 0.95,
              maxWidth: 800,
              mx: "auto",
              fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.4rem" },
              lineHeight: 1.5,
            }}
          >
            Drive confidently across 150+ countries worldwide with your official
            International Driving Permit from AA Uganda
          </Typography>

          <StatsBox>
            <StatItem>
              <Typography className="stat-number">150+</Typography>
              <Typography className="stat-label">Countries</Typography>
            </StatItem>
            <StatItem>
              <Typography className="stat-number">2-3</Typography>
              <Typography className="stat-label">Working Days</Typography>
            </StatItem>
            <StatItem>
              <Typography className="stat-number">1 Year</Typography>
              <Typography className="stat-label">Validity</Typography>
            </StatItem>
            <StatItem>
              <Typography className="stat-number">24/7</Typography>
              <Typography className="stat-label">Support</Typography>
            </StatItem>
          </StatsBox>

          <ActionButtonsBox>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleApplyIdp}
              startIcon={<CardMembership />}
              sx={{
                py: 2,
                px: 4,
                fontSize: { xs: "1rem", sm: "1.125rem" },
                fontWeight: 700,
                minWidth: { xs: 160, sm: 180 },
                boxShadow: "0 8px 32px rgba(255, 193, 7, 0.3)",
                "&:hover": {
                  boxShadow: "0 12px 40px rgba(255, 193, 7, 0.4)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Apply for IDP
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={handleVerifyIdp}
              startIcon={<Search />}
              sx={{
                py: 2,
                px: 4,
                fontSize: { xs: "1rem", sm: "1.125rem" },
                fontWeight: 600,
                borderColor: "white",
                color: "white",
                minWidth: { xs: 160, sm: 180 },
                borderWidth: 2,
                "&:hover": {
                  borderColor: "white",
                  borderWidth: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Verify IDP
            </Button>
          </ActionButtonsBox>

          <Typography
            variant="body1"
            sx={{
              mt: 4,
              opacity: 0.9,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              fontWeight: 500,
            }}
          >
            ✓ Official AA Uganda Issue • ✓ Globally Recognized • ✓ Same Day
            Available
          </Typography>
        </HeroCard>

        {/* Benefits Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
              color: "primary.main",
            }}
          >
            Why Choose Our IDP Service?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              mb: 2,
              maxWidth: 600,
              mx: "auto",
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            }}
          >
            Experience hassle-free international driving with our comprehensive
            IDP solutions
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {idpBenefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon];

            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <BenefitCard elevation={0}>
                  <IconWrapper className="benefit-icon">
                    {IconComponent && <IconComponent />}
                  </IconWrapper>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: "primary.main",
                      fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                    }}
                  >
                    {benefit.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                      fontSize: { xs: "0.875rem", sm: "0.9rem", md: "1rem" },
                    }}
                  >
                    {benefit.description}
                  </Typography>
                </BenefitCard>
              </Grid>
            );
          })}
        </Grid>

        {/* Additional Features */}
        <AdditionalFeaturesCard elevation={1}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <FlightTakeoff
              sx={{
                fontSize: 48,
                color: "primary.main",
                mr: 2,
              }}
            />
            <Speed
              sx={{
                fontSize: 48,
                color: "secondary.main",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "primary.main",
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
            }}
          >
            Fast, Reliable, Trusted
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              maxWidth: 600,
              mx: "auto",
              fontSize: { xs: "1rem", sm: "1.1rem" },
              lineHeight: 1.6,
            }}
          >
            From application to approval, we make getting your International
            Driving Permit simple and straightforward. Join thousands of
            satisfied travelers who trust AA Uganda for their international
            driving documentation.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleLearnMore}
              sx={{
                px: 3,
                py: 1.5,
                fontWeight: 600,
                "&:hover": {
                  color: theme.palette.secondary.main,
                }
              }}
            >
              Learn More
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleContact}
              sx={{
                px: 3,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Contact Us
            </Button>
          </Box>
        </AdditionalFeaturesCard>
      </IdpContainer>
    </IdpSectionWrapper>
  );
};

export default IdpSection;
