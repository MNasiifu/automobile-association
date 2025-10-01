import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  Avatar,
  Button,
  Fade,
  Zoom,
  Chip,
  useTheme,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  IconButton,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import {
  Public,
  Search,
  FilterList,
  LocationOn,
  DateRange,
  ExpandMore,
  TravelExplore,
  CheckCircle,
  Info,
  Map,
  Clear,
  Visibility,
} from "@mui/icons-material";
import { PageHeader } from "../../components/molecules";
import { SEO } from "../../components/SEO";
import { eligibleCountriesData } from "../../data/eligibleCountriesData";
import { eligibleCountriesSEO } from "../../data/seoData";
import { useInView } from "react-intersection-observer";

// Enhanced animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Styled components
const SectionContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 20% 80%, ${alpha(
      theme.palette.secondary.main,
      0.05
    )} 0%, transparent 50%),
                 radial-gradient(circle at 80% 20%, ${alpha(
                   theme.palette.primary.main,
                   0.05
                 )} 0%, transparent 50%)`,
    zIndex: -1,
  },
}));

const StyledCountryCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: theme.spacing(2.5),
  overflow: "hidden",
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.background.paper,
    0.9
  )} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  position: "relative",

  "&:hover": {
    transform: "translateY(-12px) scale(1.02)",
    boxShadow: `
      0 20px 40px ${alpha(theme.palette.primary.main, 0.15)},
      0 10px 20px ${alpha(theme.palette.common.black, 0.1)}
    `,
    borderColor: theme.palette.secondary.main,
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.background.paper,
      0.95
    )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,

    "& .country-flag": {
      transform: "scale(1.1) rotate(5deg)",
      animation: `${pulse} 2s ease-in-out infinite`,
    },

    "& .country-name": {
      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    "& .shimmer-effect": {
      opacity: 1,
    },
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    opacity: 0,
    transition: "opacity 0.3s ease",
  },

  "&:hover::before": {
    opacity: 1,
  },
}));

const ContinentHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3, 4),
  borderRadius: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  position: "relative",
  overflow: "hidden",
  marginBottom: theme.spacing(3),
  boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.3)}`,

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, transparent 30%, ${alpha(
      theme.palette.common.white,
      0.1
    )} 50%, transparent 70%)`,
    animation: `${shimmer} 2s infinite`,
  },

  "& .MuiSvgIcon-root": {
    animation: `${float} 3s ease-in-out infinite`,
  },
}));

const SearchContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.background.paper,
    0.9
  )} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  marginBottom: theme.spacing(4),
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.08)}`,
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.background.paper,
    0.8
  )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
  textAlign: "center",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: `0 12px 40px ${alpha(theme.palette.secondary.main, 0.2)}`,
    borderColor: theme.palette.secondary.main,
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    opacity: 0,
    transition: "opacity 0.3s ease",
  },

  "&:hover::before": {
    opacity: 1,
  },
}));

const AnimatedSectionTitle = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textAlign: "center",
  marginBottom: theme.spacing(6),
  position: "relative",

  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -16,
    left: "50%",
    transform: "translateX(-50%)",
    width: 80,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: 2,
  },
}));

// Continent emoji mapping
const continentEmojis: Record<string, string> = {
  "Africa": "🌍",
  "Europe": "🇪🇺",
  "Asia and Middle East": "🌏",
  "America": "🌎",
  "Australasia": "🇦🇺",
};

interface CountryData {
  continent: string;
  country: string;
  years: number[];
  flag: string;
}

const CountryCard: React.FC<{
  country: CountryData;
  index: number;
  searchTerm: string;
}> = ({ country, index, searchTerm }) => {
  const theme = useTheme();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? (
        <Box
          key={i}
          component="span"
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.2)})`,
            padding: '2px 4px',
            borderRadius: 1,
            fontWeight: 700,
          }}
        >
          {part}
        </Box>
      ) : part
    );
  };

  return (
    <Zoom
      in={inView}
      timeout={600}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div ref={ref}>
        <StyledCountryCard>
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={2}>
              {/* Country Flag Icon */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar
                  className="country-flag"
                  sx={{
                    width: 56,
                    height: 56,
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette.background.paper,
                      0.1
                    )}, ${alpha(theme.palette.background.paper, 0.05)})`,
                    fontSize: "2.2rem",
                    transition: "all 0.3s ease",
                    border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    "&:hover": {
                      transform: "scale(1.1)",
                      borderColor: theme.palette.secondary.main,
                    },
                  }}
                >
                  {country.flag}
                </Avatar>
              </Box>

              {/* Country Name */}
              <Typography
                variant="h6"
                className="country-name"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                  fontSize: "1.1rem",
                  color: "text.primary",
                  transition: "all 0.3s ease",
                  minHeight: "3rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1.3,
                }}
              >
                {highlightText(country.country, searchTerm)}
              </Typography>

              {/* Valid Years */}
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mb: 1, fontWeight: 600 }}
                >
                  Valid Since
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  flexWrap="wrap"
                  sx={{ gap: 1 }}
                >
                  {country.years.map((year) => (
                    <Chip
                      key={year}
                      label={year}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        "& .MuiChip-label": {
                          px: 1,
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              {/* Status Badge */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                <Chip
                  icon={<CheckCircle fontSize="small" />}
                  label="IDP Valid"
                  color="success"
                  variant="outlined"
                  size="small"
                  sx={{
                    fontWeight: 600,
                    borderWidth: 2,
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.success.main, 0.1),
                    },
                  }}
                />
              </Box>

              {/* Shimmer Effect */}
              <Box
                className="shimmer-effect"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, transparent 40%, ${alpha(
                    theme.palette.common.white,
                    0.1
                  )} 50%, transparent 60%)`,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  pointerEvents: "none",
                }}
              />
            </Stack>
          </CardContent>
        </StyledCountryCard>
      </div>
    </Zoom>
  );
};

export const EligibleCountries: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinent, setSelectedContinent] = useState<string>("All");

  // Process countries data
  const { continents, totalCountries } = useMemo(() => {
    const continents = Array.from(
      new Set(eligibleCountriesData.map((item) => item.continent))
    ).sort();

    return {
      continents,
      totalCountries: eligibleCountriesData.length,
    };
  }, []);

  // Filter countries based on search and continent
  const filteredCountries = useMemo(() => {
    let filtered = eligibleCountriesData;

    if (selectedContinent !== "All") {
      filtered = filtered.filter((item) => item.continent === selectedContinent);
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => a.country.localeCompare(b.country));
  }, [searchTerm, selectedContinent]);

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedContinent("All");
  };

  return (
    <Box>
      <SEO seoData={eligibleCountriesSEO} />
      <PageHeader
        title="IDP Eligible Countries"
        subtitle="Discover the 150+ countries where our AAU International Driving Permit is recognized and valid"
      />

      {/* Introduction Section */}
      <SectionContainer
        sx={{
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.08
          )} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 50%, ${alpha(
            theme.palette.primary.light,
            0.06
          )} 100%)`,
        }}
        ref={heroRef}
      >
        <Container maxWidth="lg">
          <Fade in={heroInView} timeout={1000}>
            <Box>
              {/* Stats Overview */}
              <Grid container spacing={4} sx={{ mb: 6 }}>
                <Grid item xs={12} md={3}>
                  <StatCard>
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 60,
                        height: 60,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <Public fontSize="large" />
                    </Avatar>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                      {totalCountries}+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Valid Countries
                    </Typography>
                  </StatCard>
                </Grid>
                <Grid item xs={12} md={3}>
                  <StatCard>
                    <Avatar
                      sx={{
                        bgcolor: "secondary.main",
                        color: "primary.main",
                        width: 60,
                        height: 60,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <Map fontSize="large" />
                    </Avatar>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                      {continents.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Continents
                    </Typography>
                  </StatCard>
                </Grid>
                <Grid item xs={12} md={3}>
                  <StatCard>
                    <Avatar
                      sx={{
                        bgcolor: "info.main",
                        width: 60,
                        height: 60,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <DateRange fontSize="large" />
                    </Avatar>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                      1926
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Since Year
                    </Typography>
                  </StatCard>
                </Grid>
                <Grid item xs={12} md={3}>
                  <StatCard>
                    <Avatar
                      sx={{
                        bgcolor: "success.main",
                        width: 60,
                        height: 60,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <TravelExplore fontSize="large" />
                    </Avatar>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                      100%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Recognition
                    </Typography>
                  </StatCard>
                </Grid>
              </Grid>

              {/* Search and Filter Section */}
              <SearchContainer>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Search color="primary" />
                  Find Your Destination
                </Typography>

                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      placeholder="Search countries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search color="primary" />
                          </InputAdornment>
                        ),
                        endAdornment: searchTerm && (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setSearchTerm("")}
                              size="small"
                            >
                              <Clear />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&:hover": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "primary.main",
                            },
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Filter by Continent</InputLabel>
                      <Select
                        value={selectedContinent}
                        label="Filter by Continent"
                        onChange={(e) => setSelectedContinent(e.target.value)}
                        startAdornment={
                          <InputAdornment position="start">
                            <FilterList color="primary" />
                          </InputAdornment>
                        }
                        sx={{
                          borderRadius: 2,
                        }}
                      >
                        <MenuItem value="All">All Continents</MenuItem>
                        {continents.map((continent) => (
                          <MenuItem key={continent} value={continent}>
                            {continentEmojis[continent]} {continent}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Clear />}
                      onClick={clearFilters}
                      sx={{
                        borderRadius: 2,
                        height: 56,
                        borderColor: "error.main",
                        color: "error.main",
                        "&:hover": {
                          borderColor: "error.main",
                          bgcolor: alpha(theme.palette.error.main, 0.1),
                        },
                      }}
                    >
                      Clear
                    </Button>
                  </Grid>
                </Grid>

                {/* Results Count */}
                <Box sx={{ mt: 3, textAlign: "center" }}>
                  <Chip
                    icon={<Info />}
                    label={`Showing ${filteredCountries.length} countries`}
                    variant="outlined"
                    sx={{
                      borderColor: "primary.main",
                      color: "primary.main",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </SearchContainer>
            </Box>
          </Fade>
        </Container>
      </SectionContainer>

      {/* Countries Section */}
      <SectionContainer>
        <Container maxWidth="lg">
          {filteredCountries.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                  width: 80,
                  height: 80,
                  mx: "auto",
                  mb: 3,
                }}
              >
                <Search fontSize="large" />
              </Avatar>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                No countries found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your search criteria or clearing the filters
              </Typography>
              <Button
                variant="contained"
                startIcon={<Clear />}
                onClick={clearFilters}
                sx={{ borderRadius: 2 }}
              >
                Clear Filters
              </Button>
            </Box>
          ) : selectedContinent === "All" ? (
            // Show by continent when "All" is selected
            continents.map((continent) => {
              const continentCountries = filteredCountries.filter(
                (country) => country.continent === continent
              );

              if (continentCountries.length === 0) return null;

              return (
                <Box key={continent} sx={{ mb: 6 }}>
                  <ContinentHeader>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="h4" sx={{ fontSize: "2rem" }}>
                          {continentEmojis[continent]}
                        </Typography>
                        <Box>
                          <Typography
                            variant="h4"
                            sx={{ fontWeight: 800, fontSize: "1.8rem" }}
                          >
                            {continent}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                            {continentCountries.length} countries
                          </Typography>
                          {/* Flag Preview */}
                          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                            {continentCountries.slice(0, 8).map((country) => (
                              <Box
                                key={country.country}
                                sx={{
                                  fontSize: "1.2rem",
                                  opacity: 0.8,
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    opacity: 1,
                                    transform: "scale(1.2)",
                                  },
                                }}
                                title={country.country}
                              >
                                {country.flag}
                              </Box>
                            ))}
                            {continentCountries.length > 8 && (
                              <Box
                                sx={{
                                  fontSize: "1rem",
                                  opacity: 0.6,
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                +{continentCountries.length - 8}
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Stack>
                      <Badge
                        badgeContent={continentCountries.length}
                        color="secondary"
                        sx={{
                          "& .MuiBadge-badge": {
                            fontSize: "1rem",
                            fontWeight: 700,
                            minWidth: 28,
                            height: 28,
                          },
                        }}
                      >
                        <LocationOn fontSize="large" />
                      </Badge>
                    </Stack>
                  </ContinentHeader>

                  <Grid container spacing={3}>
                    {continentCountries.map((country, index) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={country.country}>
                        <CountryCard
                          country={country}
                          index={index}
                          searchTerm={searchTerm}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              );
            })
          ) : (
            // Show filtered results
            <Box>
              <AnimatedSectionTitle variant="h3" sx={{ mb: 4 }}>
                {continentEmojis[selectedContinent]} {selectedContinent}
              </AnimatedSectionTitle>

              <Grid container spacing={3}>
                {filteredCountries.map((country, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={country.country}>
                    <CountryCard
                      country={country}
                      index={index}
                      searchTerm={searchTerm}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Container>
      </SectionContainer>

      {/* Important Information Section */}
      <SectionContainer
        sx={{
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.grey[100],
            0.5
          )}, ${alpha(theme.palette.primary.main, 0.05)})`,
        }}
      >
        <Container maxWidth="lg">
          <AnimatedSectionTitle variant="h3" sx={{ mb: 4 }}>
            Important Information
          </AnimatedSectionTitle>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Accordion
                defaultExpanded
                sx={{
                  borderRadius: 2,
                  "&:before": { display: "none" },
                  boxShadow: `0 4px 20px ${alpha(
                    theme.palette.primary.main,
                    0.1
                  )}`,
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Info color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      IDP Requirements
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Valid Uganda driving license" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Passport-size photographs" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Copy of passport" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Application fees" />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12} md={6}>
              <Accordion
                sx={{
                  borderRadius: 2,
                  "&:before": { display: "none" },
                  boxShadow: `0 4px 20px ${alpha(
                    theme.palette.secondary.main,
                    0.1
                  )}`,
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    bgcolor: alpha(theme.palette.secondary.main, 0.05),
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Visibility color="secondary" />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Usage Guidelines
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Valid for one year from issue date" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Must carry both IDP and original license" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Check local driving laws in destination" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Some countries may require additional permits" />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>

          {/* Call to Action */}
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: "white",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(45deg, transparent 30%, ${alpha(
                    theme.palette.common.white,
                    0.1
                  )} 50%, transparent 70%)`,
                  animation: `${shimmer} 3s infinite`,
                }}
              />
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                Ready to Get Your IDP?
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                Start your application today and explore the world with confidence
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    fontWeight: 700,
                    borderRadius: 2,
                    px: 4,
                    "&:hover": {
                      bgcolor: alpha(theme.palette.common.white, 0.9),
                      transform: "translateY(-2px)",
                    },
                  }}
                  href="/idp/apply"
                >
                  Apply for IDP
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    fontWeight: 700,
                    borderRadius: 2,
                    px: 4,
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: alpha(theme.palette.common.white, 0.1),
                    },
                  }}
                  href="/idp/about"
                >
                  Learn More
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Container>
      </SectionContainer>
    </Box>
  );
};

export default EligibleCountries;
