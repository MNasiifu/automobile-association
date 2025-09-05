import React from "react";
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
  Stack,
  Chip,
} from "@mui/material";
import {
  SupportAgent as AdvisoryIcon,
  DirectionsCar as VehicleIcon,
  Build as MaintenanceIcon,
  Engineering as TechnicalIcon,
  Assessment as AnalysisIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  LocalGasStation as FuelIcon,
  Security as SafetyIcon,
  Speed as PerformanceIcon,
  MonetizationOn as CostIcon,
  CalendarToday as CalendarIcon,
  Description as ReportIcon,
  Timeline as TimelineIcon,
  AutoAwesome as StarIcon,
  ContactSupport as ContactIcon,
  AccessTime as ClockIcon,
  TrendingUp as TrendingIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { ContactButtons, PageHeader } from "../../components/molecules";
import { Heading } from "../../components/atoms";
import { SEO } from "../../components/SEO";
import { automotiveAdvisorySEO } from "../../data/seoData";
import { config } from "../../utils/config/config";

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}10 100%)`,
  padding: theme.spacing(8, 0),
  position: "relative",
  overflow: "hidden",
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
  borderRadius: theme.spacing(2),
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

const ProcessCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  height: "100%",
  borderRadius: theme.spacing(3),
  position: "relative",
  transition: "all 0.4s ease-in-out",
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
  border: `2px solid transparent`,
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  },
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: `0 20px 40px ${theme.palette.primary.main}20`,
    borderColor: theme.palette.primary.main,
    "& .process-icon": {
      transform: "scale(1.15) rotate(5deg)",
      background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    },
    "& .process-timeline": {
      "&::after": {
        transform: "scaleX(1)",
      },
    },
  },
}));

const ProcessIconWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: -30,
  left: "50%",
  transform: "translateX(-50%)",
  width: 60,
  height: 60,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.5rem",
  fontWeight: "bold",
  boxShadow: `0 8px 20px ${theme.palette.primary.main}40`,
  transition: "all 0.3s ease-in-out",
  border: `3px solid ${theme.palette.background.paper}`,
  zIndex: 2,
}));

const ProcessTimeline = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: -20,
  width: 40,
  height: 2,
  background: theme.palette.grey[300],
  transform: "translateY(-50%)",
  zIndex: 1,
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.6s ease-in-out",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const ProcessContent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(5),
  position: "relative",
  zIndex: 1,
}));

const ProcessBenefitCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.spacing(2),
  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)`,
  border: `2px solid transparent`,
  borderImage: `linear-gradient(45deg, ${theme.palette.primary.light}30, ${theme.palette.secondary.light}30) 1`,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.4s ease-out",
  },
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: `0 12px 32px ${theme.palette.primary.main}20`,
    borderColor: theme.palette.primary.light,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
    "&::before": {
      transform: "scaleX(1)",
    },
    "& .benefit-icon": {
      transform: "scale(1.15)",
      color: theme.palette.primary.main,
    },
    "& .benefit-text": {
      color: theme.palette.primary.main,
      fontWeight: 700,
    },
  },
}));

const ProcessBenefitIcon = styled(Box)(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(1.5),
  transition: "all 0.3s ease-in-out",
  border: `1px solid ${theme.palette.primary.light}40`,
  "& svg": {
    fontSize: "0.875rem",
    color: theme.palette.primary.main,
    transition: "all 0.3s ease-in-out",
  },
}));

const AutomotiveAdvisory: React.FC = () => {
  // Handler for phone consultation booking
  const handleBookConsultation = () => {
    try {
      window.location.href = `tel:${config.company.contactNumber}`;
    } catch (error) {
      console.error("Error initiating phone call:", error);
      // Fallback: copy number to clipboard if possible
      if (navigator.clipboard) {
        navigator.clipboard.writeText(config.company.contactNumber);
        alert(
          `Phone number copied to clipboard: ${config.company.contactNumber}`
        );
      } else {
        alert(`Please call us at: ${config.company.contactNumber}`);
      }
    }
  };

  // Handler for email consultation request
  const handleEmailConsultation = () => {
    try {
      const subject = encodeURIComponent("Automotive Consultation Request");
      const body = encodeURIComponent(
        "Hello AA Uganda,\n\nI would like to request an automotive consultation. Please contact me to schedule an appointment.\n\nBest regards,"
      );
      const emailUrl = `mailto:advisory@aauganda.co.ug?subject=${subject}&body=${body}`;
      window.location.href = emailUrl;
    } catch (error) {
      console.error("Error opening email client:", error);
      // Fallback: copy email to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText("advisory@aauganda.co.ug");
        alert("Email address copied to clipboard: advisory@aauganda.co.ug");
      } else {
        alert("Please email us at: advisory@aauganda.co.ug");
      }
    }
  };

  const advisoryServices = [
    {
      title: "Vehicle Purchase Guidance",
      description: "Independent advice on buying new or used cars in Uganda",
      icon: <VehicleIcon />,
      features: [
        "Market valuation assessment",
        "Red flags identification",
        "Negotiation strategy support",
        "Documentation guidance",
        "Inspection recommendations",
        "Financing advice",
      ],
      benefits: ["Save money", "Avoid pitfalls", "Make confident decisions"],
    },
    {
      title: "Tailored Maintenance Plans",
      description:
        "Localized service plans and preventative maintenance schedules",
      icon: <MaintenanceIcon />,
      features: [
        "Customized service schedules",
        "Climate-specific recommendations",
        "Cost-effective maintenance plans",
        "Quality parts sourcing",
        "Trusted mechanic network",
        "Maintenance tracking",
      ],
      benefits: [
        "Extend vehicle life",
        "Reduce repair costs",
        "Maintain reliability",
      ],
    },
    {
      title: "Technical Consultations",
      description: "One-to-one time with experienced automotive technicians",
      icon: <TechnicalIcon />,
      features: [
        "Fault diagnosis assistance",
        "Performance optimization",
        "Upgrade recommendations",
        "Repair options analysis",
        "Technology explanations",
        "Problem-solving guidance",
      ],
      benefits: ["Expert insights", "Informed decisions", "Technical clarity"],
    },
    {
      title: "Pre-purchase Vehicle Checks",
      description: "Practical vehicle history and inspection briefs for Uganda",
      icon: <AnalysisIcon />,
      features: [
        "Comprehensive history checks",
        "Market analysis reports",
        "Condition assessments",
        "Value comparisons",
        "Risk evaluations",
        "Purchase recommendations",
      ],
      benefits: ["Risk mitigation", "Value assurance", "Peace of mind"],
    },
  ];

  const expertiseAreas = [
    {
      title: "Fuel Efficiency Optimization",
      description: "Maximize your vehicle's fuel economy",
      icon: <FuelIcon />,
      tips: [
        "Driving techniques",
        "Vehicle maintenance",
        "Route planning",
        "Technology usage",
      ],
    },
    {
      title: "Safety Enhancement",
      description: "Improve your vehicle's safety features",
      icon: <SafetyIcon />,
      tips: [
        "Safety system upgrades",
        "Defensive driving",
        "Emergency preparedness",
        "Regular inspections",
      ],
    },
    {
      title: "Performance Tuning",
      description: "Optimize your vehicle's performance",
      icon: <PerformanceIcon />,
      tips: [
        "Engine optimization",
        "Suspension tuning",
        "Tire selection",
        "Aerodynamics",
      ],
    },
    {
      title: "Cost Management",
      description: "Reduce your vehicle ownership costs",
      icon: <CostIcon />,
      tips: [
        "Maintenance planning",
        "Insurance optimization",
        "Resale value protection",
        "Efficiency improvements",
      ],
    },
  ];

  const consultationProcess = [
    {
      step: 1,
      title: "Book Consultation",
      description: "Choose phone, online, or on-site consultation",
      details:
        "Schedule a convenient time for your consultation via phone, video call, or in-person meeting.",
      icon: <CalendarIcon />,
      duration: "5-10 mins",
      features: [
        "Flexible scheduling",
        "Multiple contact options",
        "Instant confirmation",
        "Free initial consultation",
      ],
      keyBenefits: [
        { text: "Convenient timing", icon: <ClockIcon /> },
        { text: "No upfront costs", icon: <CostIcon /> },
        { text: "Expert availability", icon: <PersonIcon /> },
      ],
    },
    {
      step: 2,
      title: "Expert Assessment",
      description: "Comprehensive review and hands-on checks",
      details:
        "Our automotive experts will assess your needs and provide detailed analysis.",
      icon: <TechnicalIcon />,
      duration: "30-60 mins",
      features: [
        "Thorough vehicle inspection",
        "Market analysis",
        "Technical evaluation",
        "Cost-benefit analysis",
      ],
      keyBenefits: [
        { text: "Professional insights", icon: <StarIcon /> },
        { text: "Unbiased evaluation", icon: <AnalysisIcon /> },
        { text: "Local expertise", icon: <CheckIcon /> },
      ],
    },
    {
      step: 3,
      title: "Actionable Report",
      description: "Receive detailed recommendations and maintenance plan",
      details:
        "Get a comprehensive report with clear recommendations and next steps.",
      icon: <ReportIcon />,
      duration: "24-48 hrs",
      features: [
        "Detailed written report",
        "Priority recommendations",
        "Cost estimates",
        "Follow-up support",
      ],
      keyBenefits: [
        { text: "Clear action plan", icon: <TimelineIcon /> },
        { text: "Informed decisions", icon: <TrendingIcon /> },
        { text: "Ongoing support", icon: <ContactIcon /> },
      ],
    },
  ];

  const whyChooseUs = [
    "Deep local knowledge of Uganda's vehicle market",
    "Independent, customer-first advice",
    "Trained technical advisors",
    "Nationwide access to follow-up support",
    "Proven track record with satisfied customers",
    "Cost-effective consultation rates",
    "Flexible consultation formats",
    "Ongoing relationship and support",
  ];

  return (
    <Box>
      <SEO seoData={automotiveAdvisorySEO} />
      <PageHeader
        title="Automotive Advisory Services"
        subtitle="Expert guidance for every motorist in Uganda - buy smarter, maintain cheaper, drive safer"
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
                Expert Automotive Advice You Can Trust
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.6 }}
              >
                Whether you're buying your first car, managing a fleet, or
                maintaining a family vehicle, our advisors deliver practical,
                locally-tested recommendations tailored to Uganda's unique
                conditions.
              </Typography>
              <ContactButtons whatsappMessage="Hello! I would like to inquire about your services." />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Box sx={{ textAlign: "center" }}>
                <AdvisoryIcon
                  sx={{ fontSize: 200, color: "primary.main", opacity: 0.1 }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Advisory Services */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Our Advisory Services
        </Heading>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 800, mx: "auto" }}
        >
          Comprehensive automotive consultation services designed to help you
          make informed decisions.
        </Typography>

        <Grid container spacing={4}>
          {advisoryServices.map((service, index) => (
            <Grid item xs={12} md={6} key={index}>
              <FeatureCard>
                <CardContent sx={{ p: 4 }}>
                  <IconWrapper>{service.icon}</IconWrapper>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {service.description}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
                  >
                    What's Included:
                  </Typography>
                  <List dense>
                    {service.features.map((feature, idx) => (
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

                  <Typography
                    variant="h6"
                    sx={{
                      mt: 3,
                      mb: 2,
                      fontWeight: 600,
                      color: "primary.main",
                    }}
                  >
                    Key Benefits:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      mb: 3,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: "rgba(33, 150, 243, 0.02)",
                      border: "1px dashed",
                      borderColor: "info.light",
                      borderOpacity: 0.3,
                    }}
                  >
                    {service.benefits.map((benefit, idx) => (
                      <Chip
                        key={idx}
                        label={benefit}
                        size="small"
                        sx={{
                          backgroundColor: "info.light",
                          color: "white",
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          height: 26,
                          borderRadius: 1.5,
                          boxShadow: "0 2px 4px rgba(33, 150, 243, 0.2)",
                          transition: "all 0.2s ease-in-out",
                          border: "none",
                          "&:hover": {
                            backgroundColor: "info.main",
                            transform: "scale(1.05)",
                            boxShadow: "0 4px 8px rgba(33, 150, 243, 0.3)",
                          },
                          "& .MuiChip-label": {
                            px: 1.5,
                          },
                        }}
                        variant="filled"
                      />
                    ))}
                  </Box>

                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ScheduleIcon />}
                    onClick={handleBookConsultation}
                  >
                    Book Consultation
                  </Button>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Expertise Areas */}
      <Box sx={{ backgroundColor: "grey.50", py: 8 }}>
        <Container maxWidth="lg">
          <Heading variant="h2" align="center" gutterBottom>
            Our Areas of Expertise
          </Heading>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 800, mx: "auto" }}
          >
            Specialized knowledge across all aspects of vehicle ownership and
            operation.
          </Typography>

          <Grid container spacing={4}>
            {expertiseAreas.map((area, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    height: "100%",
                    borderRadius: 2,
                  }}
                >
                  <IconWrapper sx={{ mx: "auto" }}>{area.icon}</IconWrapper>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {area.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {area.description}
                  </Typography>

                  <Box
                    sx={{
                      background:
                        "linear-gradient(135deg, rgba(2, 79, 49, 0.03) 0%, rgba(241, 197, 14, 0.03) 100%)",
                      borderRadius: 2,
                      p: 2.5,
                      border: "1px solid",
                      borderColor: "primary.light",
                      borderOpacity: 0.1,
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background:
                          "linear-gradient(90deg, primary.main 0%, secondary.main 100%)",
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontSize: "0.85rem",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        "&::before": {
                          content: '""',
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: "secondary.main",
                          display: "block",
                        },
                      }}
                    >
                      Key Focus Areas
                    </Typography>

                    <List dense sx={{ p: 0 }}>
                      {area.tips.map((tip, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <CheckIcon
                              sx={{ fontSize: "1rem", color: "success.main" }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={tip}
                            primaryTypographyProps={{
                              variant: "body2",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              color: "text.primary",
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Consultation Process */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, rgba(2, 79, 49, 0.02) 0%, rgba(241, 197, 14, 0.02) 100%)",
          py: 10,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23024f31" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.5,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 2,
                mb: 3,
                px: 3,
                py: 1.5,
                borderRadius: 50,
                background:
                  "linear-gradient(135deg, rgba(2, 79, 49, 0.1) 0%, rgba(241, 197, 14, 0.1) 100%)",
                border: "1px solid",
                borderColor: "primary.light",
                borderOpacity: 0.2,
              }}
            >
              <TimelineIcon
                sx={{ color: "primary.main", fontSize: "1.5rem" }}
              />
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontSize: "0.875rem",
                }}
              >
                Our Process
              </Typography>
            </Box>

            <Heading
              variant="h2"
              align="center"
              gutterBottom
              sx={{
                background: "linear-gradient(135deg, #024f31 0%, #f1c50e 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 800,
                mb: 3,
              }}
            >
              How Our Consultation Works
            </Heading>

            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{
                mb: 6,
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.7,
                fontSize: "1.25rem",
              }}
            >
              Simple, professional process designed to deliver expert automotive
              advice tailored to your needs
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                flexWrap: "wrap",
                mb: 6,
              }}
            >
              {[
                {
                  icon: <StarIcon />,
                  label: "Expert Advisors",
                  value: "10+ Years",
                },
                {
                  icon: <ClockIcon />,
                  label: "Response Time",
                  value: "<24 Hours",
                },
                { icon: <TrendingIcon />, label: "Success Rate", value: "98%" },
              ].map((stat, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 2.5,
                    py: 1,
                    borderRadius: 3,
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid",
                    borderColor: "primary.light",
                    borderOpacity: 0.2,
                    boxShadow: "0 4px 20px rgba(2, 79, 49, 0.1)",
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #024f31, #f1c50e)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      "& svg": { fontSize: "1rem" },
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "primary.main" }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Grid container spacing={4} sx={{ position: "relative" }}>
            {consultationProcess.map((step, index) => (
              <Grid
                item
                xs={12}
                md={4}
                key={index}
                sx={{ position: "relative" }}
              >
                {index < consultationProcess.length - 1 && (
                  <ProcessTimeline className="process-timeline" />
                )}

                <ProcessCard className="process-card">
                  <ProcessIconWrapper className="process-icon">
                    {step.icon}
                  </ProcessIconWrapper>

                  <ProcessContent>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                        px: 2,
                        py: 0.5,
                        borderRadius: 50,
                        background:
                          "linear-gradient(135deg, rgba(2, 79, 49, 0.08) 0%, rgba(241, 197, 14, 0.08) 100%)",
                        border: "1px solid",
                        borderColor: "primary.light",
                        borderOpacity: 0.3,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: "primary.main",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Step {step.step}
                      </Typography>
                      <Chip
                        label={step.duration}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          backgroundColor: "secondary.dark",
                          color: "white",
                          border: "none",
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        mb: 2,
                        lineHeight: 1.3,
                      }}
                    >
                      {step.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        lineHeight: 1.6,
                        fontSize: "1rem",
                      }}
                    >
                      {step.description}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontStyle: "italic",
                        mb: 4,
                        lineHeight: 1.7,
                        px: 2,
                        py: 2,
                        borderRadius: 2,
                        background: "rgba(2, 79, 49, 0.02)",
                        border: "1px dashed",
                        borderColor: "primary.light",
                        borderOpacity: 0.3,
                      }}
                    >
                      {step.details}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          mb: 1.5,
                          color: "primary.main",
                          textAlign: "left",
                        }}
                      >
                        What's Included:
                      </Typography>
                      <List dense sx={{ p: 0 }}>
                        {step.features.map((feature, idx) => (
                          <ListItem key={idx} sx={{ py: 0.25, px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 20 }}>
                              <CheckIcon
                                sx={{
                                  fontSize: "0.875rem",
                                  color: "success.main",
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              primaryTypographyProps={{
                                variant: "body2",
                                fontSize: "0.875rem",
                                fontWeight: 500,
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: "primary.main",
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          "&::before": {
                            content: '""',
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            backgroundColor: "secondary.main",
                            display: "block",
                          },
                        }}
                      >
                        Key Benefits
                      </Typography>
                      <Grid container spacing={1.5}>
                        {step.keyBenefits.map((benefit, idx) => (
                          <Grid item xs={12} key={idx}>
                            <ProcessBenefitCard elevation={0}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                              >
                                <ProcessBenefitIcon className="benefit-icon">
                                  {benefit.icon}
                                </ProcessBenefitIcon>
                                <Typography
                                  variant="body2"
                                  className="benefit-text"
                                  sx={{
                                    fontWeight: 600,
                                    fontSize: "0.875rem",
                                    lineHeight: 1.3,
                                    transition: "all 0.3s ease-in-out",
                                    color: "text.primary",
                                    letterSpacing: "0.25px",
                                  }}
                                >
                                  {benefit.text}
                                </Typography>
                              </Box>
                            </ProcessBenefitCard>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </ProcessContent>
                </ProcessCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Container maxWidth="lg" sx={{ py: {xs: 4, sm: 8} }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Why Choose AA Uganda Advisory
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
              Our automotive advisory services combine decades of experience
              with deep understanding of Uganda's unique motoring environment.
            </Typography>

            <List>
              {whyChooseUs.map((reason, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemIcon>
                    <CheckIcon sx={{ color: "success.main" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={reason}
                    primaryTypographyProps={{ fontSize: "1rem" }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 600, color: "primary.main" }}
              >
                Start Your Free Consultation
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Get expert automotive advice tailored to your specific needs and
                budget.
              </Typography>

              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <PhoneIcon sx={{ color: "primary.main" }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Call for Consultation
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary.main"
                      sx={{
                        cursor: "pointer",
                        textDecoration: "underline",
                        "&:hover": { color: "primary.dark" },
                      }}
                      onClick={handleBookConsultation}
                    >
                      {config.company.contactNumber}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <EmailIcon sx={{ color: "primary.main" }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Email Us
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary.main"
                      sx={{
                        cursor: "pointer",
                        textDecoration: "underline",
                        "&:hover": { color: "primary.dark" },
                      }}
                      onClick={handleEmailConsultation}
                    >
                      {config.company.email}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <ScheduleIcon sx={{ color: "primary.main" }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Business Hours
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mon - Fri: 8AM - 6PM, Sat: 8AM - 2PM
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: {xs: 4, sm: 8} }}>
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
            Get Expert Automotive Advice Today
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
          >
            Make informed decisions about your vehicle with trusted advice from
            Uganda's automotive experts.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ContactButtons
              phoneText="Book Customised Consultation"
              whatsappMessage="Hello! I would like to inquire about your services."
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AutomotiveAdvisory;
