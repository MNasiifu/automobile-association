import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Heading } from "../atoms";
import { ServiceCard } from "../molecules";
import { services } from "../../data/servicesData";
import theme from "../../theme";

const ServicesSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[50]} 100%)`,
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23024f31" fill-opacity="0.02"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    zIndex: 1,
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(8),
  position: "relative",
  zIndex: 2,
}));

const ServicesGrid = styled(Grid)(() => ({
  position: "relative",
  zIndex: 2,
  "& .MuiGrid-item": {
    display: "flex",
  },
}));

interface ServicesOverviewProps {
  maxServices?: number;
  showAll?: boolean;
}

const ServicesOverview: React.FC<ServicesOverviewProps> = ({
  maxServices = 8,
  showAll = false,
}) => {
  const navigate = useNavigate();
  const displayedServices = showAll ? services : services.slice(0, maxServices);

  const handleServiceClick = (route: string) => {
    // Navigate to service detail page using the route
    navigate(route);
  };

  const handleReadMore = (route: string) => {
    // Handle read more functionality - navigate to detailed service page
    navigate(route);
  };

  return (
    <ServicesSection>
      <Container maxWidth="xl">
        <SectionHeader>
          <Heading
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: 700,
              mb: 2,
              color: theme.palette.primary.main,
            }}
          >
            Our Services
          </Heading>

          <Typography
            variant="h6"
            align="center"
            sx={{
              maxWidth: 700,
              mx: "auto",
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            Comprehensive automotive solutions designed to keep you safe and
            confident on Uganda's roads
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.125rem" },
            }}
          >
            ✓ Professional Service • ✓ 24/7 Support • ✓ Nationwide Coverage
          </Typography>
        </SectionHeader>

        <ServicesGrid
          container
          spacing={3}
          sx={{ maxWidth: "1200px", marginLeft: "auto", marginRight: "auto" }}
        >
          {displayedServices.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Box
                sx={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  "@keyframes fadeInUp": {
                    "0%": {
                      opacity: 0,
                      transform: "translateY(30px)",
                    },
                    "100%": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  },
                }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  features={service.features}
                  onClick={() => handleServiceClick(service.route)}
                  onReadMore={() => handleReadMore(service.route)}
                  showReadMore={true}
                  readMoreText="Learn More"
                />
              </Box>
            </Grid>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
};

export default ServicesOverview;
