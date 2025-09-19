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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
} from "@mui/material";
import {
  Search as InspectionIcon,
  CheckCircle as CheckIcon,
  Assignment as ReportIcon,
  Schedule as ScheduleIcon,
  Build as MechanicalIcon,
  ElectricBolt as ElectricalIcon,
  Security as SecurityIcon,
  DirectionsCar as CarIcon,
  LocalShipping as TruckIcon,
  Star as PremiumIcon,
  Download as DownloadIcon,
  Camera as PhotoIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { ContactButtons, PageHeader } from "../../components/molecules";
import { Heading } from "../../components/atoms";
import { SEO } from "../../components/SEO";
import { vehicleInspectionSEO } from "../../data/seoData";
import { config } from "../../utils/config/config";
import { useNavigate } from "react-router-dom";

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

const PremiumBadge = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: 16,
  right: 16,
  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
  color: "white",
  fontWeight: "bold",
}));

const VehicleInspection: React.FC = () => {
  const navigate = useNavigate();
  // Handler for booking inspection call functionality
  const handleBookInspection = () => {
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

  // Handler for membership inquiry - benchmarked from handleTalkToUs in ContactButtons.tsx
  const handleNavigateToMembershipPage = () => {
    navigate("/membership");
  };

  const inspectionTypes = [
    {
      title: "Pre-Purchase Inspection",
      description: "Comprehensive evaluation before buying a used vehicle",
      icon: <CarIcon />,
      features: [
        "Mechanical assessment",
        "Bodywork evaluation",
        "Mileage verification",
        "Ownership checks",
        "Condition report",
        "Negotiation support",
      ],
      price: "From UGX 150,000",
      premium: false,
    },
    {
      title: "Annual Safety Inspection",
      description: "Regular safety checks to maintain roadworthiness",
      icon: <SecurityIcon />,
      features: [
        "Brake system check",
        "Steering inspection",
        "Suspension review",
        "Tire condition",
        "Lights & signals",
        "Safety certification",
      ],
      price: "From UGX 80,000",
      premium: false,
    },
    {
      title: "Insurance Claim Inspection",
      description: "Independent assessment for insurance claims",
      icon: <ReportIcon />,
      features: [
        "Damage assessment",
        "Repair estimates",
        "Photo documentation",
        "Insurance liaison",
        "Claims support",
        "Expert testimony",
      ],
      price: "From UGX 120,000",
      premium: true,
    },
    {
      title: "Commercial Vehicle Inspection",
      description: "Specialized inspection for trucks and commercial vehicles",
      icon: <TruckIcon />,
      features: [
        "Heavy-duty systems",
        "Load capacity check",
        "Commercial compliance",
        "Fleet documentation",
        "Operating permits",
        "Safety standards",
      ],
      price: "From UGX 250,000",
      premium: true,
    },
  ];

  const inspectionProcess = [
    {
      title: "Book Your Inspection",
      description: "Schedule online, by phone, or at any AA Uganda branch",
      details: [
        "Choose inspection type",
        "Select preferred date & time",
        "Provide vehicle details",
        "Choose location (mobile or center)",
      ],
    },
    {
      title: "Professional Inspection",
      description: "AA technician performs comprehensive vehicle assessment",
      details: [
        "Visual inspection of all systems",
        "Diagnostic testing where needed",
        "Photo documentation",
        "Short road test (where applicable)",
      ],
    },
    {
      title: "Detailed Digital Report",
      description:
        "Receive comprehensive inspection report with recommendations",
      details: [
        "Condition assessment with ratings",
        "Photo evidence included",
        "Immediate safety concerns highlighted",
        "Repair recommendations with cost estimates",
      ],
    },
    {
      title: "Expert Follow-up",
      description: "Ongoing support and guidance from our technical team",
      details: [
        "Report explanation and guidance",
        "Repair shop recommendations",
        "Insurance claim assistance",
        "Follow-up inspection scheduling",
      ],
    },
  ];

  const whatWeInspect = [
    {
      category: "Engine & Mechanical",
      icon: <MechanicalIcon />,
      items: [
        "Engine condition & performance",
        "Transmission operation",
        "Cooling system",
        "Exhaust system",
        "Belts & hoses",
        "Fluid levels & leaks",
      ],
    },
    {
      category: "Safety Systems",
      icon: <SecurityIcon />,
      items: [
        "Brake system (discs, pads, fluid)",
        "Steering & suspension",
        "Tire condition & alignment",
        "Lights & indicators",
        "Horn & wipers",
        "Safety equipment",
      ],
    },
    {
      category: "Electrical Systems",
      icon: <ElectricalIcon />,
      items: [
        "Battery & charging system",
        "Starter motor",
        "Alternator",
        "Wiring condition",
        "Electronic systems",
        "Dashboard functions",
      ],
    },
    {
      category: "Body & Interior",
      icon: <PhotoIcon />,
      items: [
        "Body panels & paintwork",
        "Rust & corrosion",
        "Glass condition",
        "Seat condition & operation",
        "Interior components",
        "Accident damage history",
      ],
    },
  ];

  const memberBenefits = [
    "Priority booking and scheduling",
    "Discounted inspection rates",
    "Free follow-up consultations",
    "Complimentary basic vehicle checks",
    "Extended warranty on findings",
    "Priority technical support",
    "Annual inspection reminders",
    "Multi-vehicle discount packages",
  ];

  return (
    <Box>
      <SEO seoData={vehicleInspectionSEO} />
      <PageHeader
        title="Professional Vehicle Inspection"
        subtitle="Comprehensive vehicle assessments to ensure safety and compliance"
      />

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontWeight: 700, mb: 3 }}
              >
                Keep Your Vehicle Safe & Roadworthy
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.6 }}
              >
                At AA Uganda, we provide professional vehicle inspections
                designed to protect your safety and investment. Our experienced
                technicians perform comprehensive assessments using standardized
                AA checklists.
              </Typography>
              <ContactButtons
                phoneText="Book Inspection"
                whatsappMessage="Hello! I would like to inquire about your vehicle inspection services."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <InspectionIcon
                  sx={{
                    fontSize: 200,
                    color: "primary.main",
                    opacity: 0.1,
                    display: { xs: "none", md: "block" },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Inspection Types */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Our Inspection Services
        </Heading>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 800, mx: "auto" }}
        >
          Comprehensive vehicle inspection services tailored to your specific
          needs and requirements.
        </Typography>

        <Grid container spacing={4}>
          {inspectionTypes.map((inspection, index) => (
            <Grid item xs={12} md={6} key={index}>
              <FeatureCard sx={{ position: "relative" }}>
                {inspection.premium && (
                  <PremiumBadge
                    icon={<PremiumIcon />}
                    label="Premium Service"
                    size="small"
                  />
                )}
                <CardContent sx={{ p: 4 }}>
                  <IconWrapper>{inspection.icon}</IconWrapper>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {inspection.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {inspection.description}
                  </Typography>

                  <Typography
                    variant="h6"
                    color="primary.main"
                    sx={{ mb: 2, fontWeight: 600 }}
                  >
                    {inspection.price}
                  </Typography>

                  <List dense>
                    {inspection.features.map((feature, idx) => (
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
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                    startIcon={<ScheduleIcon />}
                    onClick={handleBookInspection}
                  >
                    Book This Inspection
                  </Button>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* What We Inspect */}
      <Box sx={{ backgroundColor: "grey.50", py: 8 }}>
        <Container maxWidth="lg">
          <Heading variant="h2" align="center" gutterBottom>
            What We Inspect
          </Heading>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 800, mx: "auto" }}
          >
            Our comprehensive inspection covers all critical vehicle systems and
            components.
          </Typography>

          <Grid container spacing={4}>
            {whatWeInspect.map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    height: "100%",
                    borderRadius: 2,
                  }}
                >
                  <IconWrapper sx={{ mx: "auto" }}>{category.icon}</IconWrapper>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {category.category}
                  </Typography>
                  <List dense>
                    {category.items.map((item, idx) => (
                      <ListItem key={idx} sx={{ pl: 0, py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <CheckIcon
                            sx={{
                              fontSize: "1rem",
                              color: "primary.main",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ variant: "body2" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Inspection Process */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          How Our Inspection Process Works
        </Heading>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Simple, thorough, and transparent process from booking to final report
        </Typography>

        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Stepper orientation="vertical">
            {inspectionProcess.map((step, index) => (
              <Step key={index} active={true}>
                <StepLabel>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {step.title}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {step.description}
                  </Typography>
                  <List dense>
                    {step.details.map((detail, idx) => (
                      <ListItem key={idx} sx={{ pl: 0, py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <CheckIcon
                            sx={{ fontSize: "1rem", color: "success.main" }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={detail}
                          primaryTypographyProps={{ variant: "body2" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Container>

      {/* Member Benefits */}
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                AA Uganda Member Benefits
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                Enjoy exclusive benefits and priority service as an AA Uganda
                member, including discounted rates and premium support services.
              </Typography>

              <Button
                size="large"
                startIcon={<PremiumIcon />}
                onClick={handleNavigateToMembershipPage}
                sx={{
                  backgroundColor: "secondary.main",
                  color: "secondary.contrastText",
                  "&:hover": { backgroundColor: "secondary.light" },
                  px: 4,
                  py: 1.5,
                }}
              >
                Become a Member
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  color="primary.main"
                  sx={{ fontWeight: 600 }}
                >
                  Member Exclusive Benefits
                </Typography>
                <Grid container spacing={1}>
                  {memberBenefits.map((benefit, index) => (
                    <Grid item xs={12} key={index}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <CheckIcon
                          sx={{
                            color: "success.main",
                            mr: 1,
                            fontSize: "1rem",
                          }}
                        />
                        <Typography variant="body2">{benefit}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Digital Report Features */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Heading variant="h2" align="center" gutterBottom>
          Digital Inspection Report
        </Heading>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Comprehensive digital reports with photo evidence and expert
          recommendations
        </Typography>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: 3, height: "100%" }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                What Your Report Includes
              </Typography>
              <List>
                {[
                  "Executive summary with safety ratings",
                  "Detailed condition assessment with photos",
                  "Immediate safety concerns highlighted",
                  "Repair recommendations with cost estimates",
                  "Vehicle identification verification",
                  "Compliance certification where applicable",
                  "Expert recommendations and next steps",
                  "Digital format for easy sharing",
                ].map((item, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: "success.main" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ fontSize: "1rem" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
                <ReportIcon
                  sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Detailed Documentation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Comprehensive reports with technical findings and
                  recommendations
                </Typography>
              </Paper>
              <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
                <PhotoIcon
                  sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Photo Evidence
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Visual documentation of all inspection findings
                </Typography>
              </Paper>
              <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
                <DownloadIcon
                  sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Digital Delivery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Instant PDF delivery via email for immediate access
                </Typography>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>

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
            Ready for Professional Vehicle Inspection?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
          >
            Book your inspection today and drive with confidence knowing your
            vehicle meets the highest safety standards.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ContactButtons
              whatsappText="Chat with us"
              phoneText="Book Inspection"
              whatsappMessage="Hello! I would like to inquire about your vehicle inspection services."
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default VehicleInspection;
