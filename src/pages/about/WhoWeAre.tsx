import React from "react";
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
  Slide,
  Chip,
  useTheme,
} from "@mui/material";
import { alpha, styled, keyframes } from "@mui/material/styles";
import {
  Flag,
  Visibility,
  WorkspacePremium,
  StarOutline,
  VerifiedUser,
  TrendingUp,
  ThumbUpAlt,
  Security,
  ExpandMore,
  ExpandLess,
  Timeline,
  EmojiEvents,
  AutoAwesome,
} from "@mui/icons-material";
import { PageHeader } from "../../components/molecules";
import { SEO } from "../../components/SEO";
import { whoWeAreSEO } from "../../data/seoData";
import { companyInfo, milestones } from "../../data/companyData";
import { useInView } from "react-intersection-observer";

// Enhanced animations and styled components
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 4px 20px rgba(2, 79, 49, 0.2); }
  50% { box-shadow: 0 8px 30px rgba(2, 79, 49, 0.4); }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Enhanced Section Container with background effects
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

// Enhanced Mission/Vision card with glassmorphism
const StyledMissionVisionCard = styled(Paper)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  height: "100%",
  overflow: "hidden",
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  animation: `${slideInUp} 0.8s ease-out`,

  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    animation: `${glow} 2s ease-in-out infinite`,
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
    zIndex: -1,
  },

  "&::after": {
    content: '""',
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.light})`,
    borderRadius: theme.spacing(3),
    zIndex: -2,
    opacity: 0,
    transition: "opacity 0.3s ease",
  },

  "&:hover::after": {
    opacity: 0.7,
  },
}));

// Enhanced Value Card with modern design
const StyledValueCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3.5),
  borderRadius: theme.spacing(2.5),
  height: "100%",
  position: "relative",
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.background.paper,
    0.9
  )} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",

  "&:hover": {
    transform: "translateY(-12px) rotateX(5deg)",
    boxShadow: `
      0 20px 40px ${alpha(theme.palette.primary.main, 0.15)},
      0 10px 20px ${alpha(theme.palette.common.black, 0.1)}
    `,
    borderColor: theme.palette.secondary.main,
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.background.paper,
      0.95
    )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: `${theme.spacing(2.5)} ${theme.spacing(2.5)} 0 0`,
    opacity: 0,
  },
}));

// Enhanced Journey Timeline Container
const TimelineContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  maxWidth: "900px",
  margin: "0 auto",

  "&::before": {
    content: '""',
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: 0,
    bottom: 0,
    width: "4px",
    background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    borderRadius: "2px",
    zIndex: 1,

    [theme.breakpoints.down("md")]: {
      left: "30px",
    },
  },
}));

// Enhanced Timeline Item
const TimelineItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isLeft",
})<{ isLeft?: boolean }>(({ theme, isLeft = false }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(6),
  position: "relative",

  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
    textAlign: "left",
  },

  ...(isLeft
    ? {
        flexDirection: "row-reverse",
        textAlign: "right",

        [theme.breakpoints.down("md")]: {
          flexDirection: "row",
          textAlign: "left",
        },
      }
    : {
        flexDirection: "row",
        textAlign: "left",
      }),
}));

// Timeline Content Card
const TimelineCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  marginLeft: theme.spacing(2),
  position: "relative",
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.background.paper,
    0.95
  )} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
  border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
  backdropFilter: "blur(10px)",
  minHeight: "140px",

  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    borderColor: theme.palette.secondary.main,
    boxShadow: `
      0 20px 40px ${alpha(theme.palette.primary.main, 0.15)},
      0 0 0 4px ${alpha(theme.palette.secondary.main, 0.1)}
    `,
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.background.paper,
      1
    )} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: `${theme.spacing(3)} ${theme.spacing(3)} 0 0`,
    opacity: 0,
    transition: "opacity 0.3s ease",
  },

  "&:hover::before": {
    opacity: 1,
  },

  "&::after": {
    content: '""',
    position: "absolute",
    top: "50%",
    right: -20,
    transform: "translateY(-50%)",
    width: 0,
    height: 0,
    borderTop: "15px solid transparent",
    borderBottom: "15px solid transparent",
    borderLeft: `20px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    transition: "border-left-color 0.3s ease",

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  "&:hover::after": {
    borderLeftColor: alpha(theme.palette.secondary.main, 0.3),
  },
}));

// Timeline Year Badge
const TimelineYearBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "46%",
  top: "28%",
  transform: "translate(-50%, -50%)",
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `
    0 0 0 8px ${theme.palette.background.default},
    0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}
  `,
  zIndex: 3,
  transition: "all 0.3s ease",

  "&:hover": {
    transform: "translate(-50%, -50%) scale(1.1)",
    boxShadow: `
      0 0 0 8px ${theme.palette.background.default},
      0 12px 35px ${alpha(theme.palette.secondary.main, 0.4)}
    `,
  },

  [theme.breakpoints.down("md")]: {
    left: "30px",
    width: "60px",
    height: "60px",
  },
}));

// Timeline Content Wrapper
const TimelineContent = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: "400px",
  margin: theme.spacing(0, 4),

  [theme.breakpoints.down("md")]: {
    margin: theme.spacing(0, 0, 0, 6),
    maxWidth: "none",
  },
}));

// Floating Avatar for values
const FloatingAvatar = styled(Avatar)(({ theme }) => ({
  width: 64,
  height: 64,
  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
  boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
  animation: `${float} 3s ease-in-out infinite`,
  transition: "all 0.3s ease",

  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: `0 12px 35px ${alpha(theme.palette.secondary.main, 0.4)}`,
  },
}));

// Animated section title
const AnimatedSectionTitle = styled(Typography)(({ theme }) => ({
  background: theme.palette.primary.main,
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

const MissionVisionCard = ({
  icon,
  title,
  children,
  variant = "mission",
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  variant?: "mission" | "vision";
  delay?: number;
}) => {
  const theme = useTheme();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const isMission = variant === "mission";

  return (
    <Fade in={inView} timeout={800} style={{ transitionDelay: `${delay}ms` }}>
      <div ref={ref}>
        <StyledMissionVisionCard
          sx={{
            background: isMission
              ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
              : `linear-gradient(135deg, ${alpha(
                  theme.palette.secondary.main,
                  0.1
                )} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
            color: isMission ? "primary.contrastText" : "text.primary",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <FloatingAvatar
              sx={{
                bgcolor: isMission ? "secondary.main" : "primary.main",
                color: isMission ? "primary.main" : "primary.contrastText",
                width: 56,
                height: 56,
              }}
            >
              {icon}
            </FloatingAvatar>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  mb: 0.5,
                }}
              >
                {title}
              </Typography>
              <Chip
                icon={<AutoAwesome fontSize="small" />}
                label={isMission ? "Our Purpose" : "Our Future"}
                size="small"
                sx={{
                  bgcolor: isMission ? "secondary.main" : "primary.main",
                  color: isMission ? "primary.main" : "primary.contrastText",
                  fontSize: "0.75rem",
                }}
              />
            </Box>
          </Stack>

          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              fontSize: "1.1rem",
              fontWeight: 400,
              textAlign: "justify",
            }}
          >
            {children}
          </Typography>

          {/* Decorative elements */}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `linear-gradient(45deg, ${alpha(
                theme.palette.secondary.main,
                1
              )}, ${alpha(theme.palette.primary.main, 0.2)})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isMission ? (
              <Flag fontSize="small" />
            ) : (
              <Visibility fontSize="small" />
            )}
          </Box>
        </StyledMissionVisionCard>
      </div>
    </Fade>
  );
};

const ValueCard = ({
  icon,
  value,
  delay = 0,
}: {
  icon: React.ReactNode;
  value: string;
  delay?: number;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <Zoom in={inView} timeout={600} style={{ transitionDelay: `${delay}ms` }}>
      <div ref={ref}>
        <StyledValueCard>
          <Stack alignItems="center" spacing={3}>
            <FloatingAvatar>{icon}</FloatingAvatar>

            <Box textAlign="center">
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  fontSize: "1.2rem",
                  mb: 1,
                }}
              >
                {value}
              </Typography>

              <Box
                sx={{
                  width: 60,
                  height: 3,
                  borderRadius: 1.5,
                  mx: "auto",
                  opacity: 0.7,
                }}
              />
            </Box>
          </Stack>

          {/* Hover effect overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(135deg, rgba(244, 214, 22, 0.05), rgba(2, 79, 49, 0.05))",
              borderRadius: 2.5,
              opacity: 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
              ".MuiPaper-root:hover &": {
                opacity: 1,
              },
            }}
          />
        </StyledValueCard>
      </div>
    </Zoom>
  );
};

export const WhoWeAre: React.FC = () => {
  const theme = useTheme();
  const [journeyExpanded, setJourneyExpanded] = React.useState(false);
  const milestonesDesc = React.useMemo(
    () => [...milestones].sort((a, b) => b.year - a.year),
    []
  );
  const visibleMilestones = journeyExpanded
    ? milestonesDesc
    : milestonesDesc.slice(0, 4);

  // Enhanced value icons with better mapping
  const valueIcons = {
    "Excellence in Service": <StarOutline />,
    "Integrity and Trust": <VerifiedUser />,
    "Innovation and Growth": <TrendingUp />,
    "Customer Satisfaction": <ThumbUpAlt />,
    "Safety First": <Security />,
  };

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: valuesRef, inView: valuesInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: journeyRef, inView: journeyInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Box>
      <SEO seoData={whoWeAreSEO} />
      <PageHeader
        title="Who We Are"
        subtitle="Discover our mission, vision, values, and journey in serving Uganda's motoring community"
      />

      {/* About Introduction Section */}
      <SectionContainer
        sx={{
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.08
          )} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 50%, ${alpha(
            theme.palette.primary.light,
            0.06
          )} 100%)`,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 30% 20%, ${alpha(
              theme.palette.secondary.main,
              0.1
            )} 0%, transparent 40%),
                         radial-gradient(circle at 70% 80%, ${alpha(
                           theme.palette.primary.main,
                           0.08
                         )} 0%, transparent 40%)`,
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Fade in={heroInView} timeout={1200}>
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                sx={{ mb: 4 }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 4,
                    borderRadius: 2,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  }}
                />
                <Chip
                  label="Since 1986"
                  icon={<EmojiEvents />}
                  sx={{
                    bgcolor: "secondary.main",
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    py: 2,
                    px: 1,
                    "& .MuiChip-icon": {
                      color: "primary.main",
                    },
                  }}
                />
                <Box
                  sx={{
                    width: 60,
                    height: 4,
                    borderRadius: 2,
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  }}
                />
              </Stack>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
                  lineHeight: 1.2,
                }}
              >
                Uganda's Premier Automobile Association
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  maxWidth: "800px",
                  mx: "auto",
                  mb: 4,
                  lineHeight: 1.8,
                  fontSize: { xs: "1.1rem", md: "1.2rem" },
                  fontWeight: 400,
                }}
              >
                For nearly four decades, the Automobile Association of Uganda
                has been the trusted guardian of Uganda's motoring community.
                Born from a vision to transform road safety and automotive
                excellence across the Pearl of Africa, we've grown from humble
                beginnings to become the nation's most respected authority in
                automotive services.
              </Typography>

              <Grid container spacing={4} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0.05
                      )}, ${alpha(theme.palette.background.paper, 0.8)})`,
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.1
                      )}`,
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 12px 40px ${alpha(
                          theme.palette.primary.main,
                          0.15
                        )}`,
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 56,
                        height: 56,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <VerifiedUser />
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}
                    >
                      Trusted Excellence
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      Nearly 40 years of unwavering commitment to automotive
                      excellence and road safety in Uganda
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.secondary.main,
                        0.4
                      )}, ${alpha(theme.palette.background.paper, 0.8)})`,
                      border: `1px solid ${alpha(
                        theme.palette.secondary.main,
                        0.1
                      )}`,
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 12px 40px ${alpha(
                          theme.palette.secondary.main,
                          0.15
                        )}`,
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "secondary.main",
                        color: "primary.main",
                        width: 56,
                        height: 56,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <Security />
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}
                    >
                      National Impact
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      Leading Uganda's automotive industry transformation with
                      comprehensive motoring solutions
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.light,
                        0.05
                      )}, ${alpha(theme.palette.background.paper, 0.8)})`,
                      border: `1px solid ${alpha(
                        theme.palette.primary.light,
                        0.2
                      )}`,
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 12px 40px ${alpha(
                          theme.palette.primary.light,
                          0.2
                        )}`,
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "primary.light",
                        color: "primary.main",
                        width: 56,
                        height: 56,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <TrendingUp />
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}
                    >
                      Innovation Pioneer
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      Continuously evolving to meet modern automotive challenges
                      with cutting-edge solutions
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{ mt: 6 }}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    maxWidth: "700px",
                    mx: "auto",
                    fontStyle: "italic",
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                  }}
                >
                  From our headquarters in Kampala to every corner of Uganda,
                  we've been the steadfast companion of countless motorists,
                  ensuring safe journeys, reliable services, and peace of mind
                  on every road traveled.
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Container>
      </SectionContainer>

      {/* Mission & Vision Section */}
      <SectionContainer
        sx={{
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.light,
            0.5
          )}, ${alpha(theme.palette.primary.main, 0.05)})`,
        }}
        ref={heroRef}
      >
        <Container maxWidth="lg">
          <Fade in={heroInView} timeout={1000}>
            <Box sx={{ mb: 8 }}>
              <AnimatedSectionTitle variant="h2" sx={{ mb: 6 }}>
                Our Foundation
              </AnimatedSectionTitle>

              <Grid container spacing={4} alignItems="stretch">
                <Grid item xs={12} md={6}>
                  <MissionVisionCard
                    icon={<Flag />}
                    title="Our Mission"
                    variant="mission"
                    delay={200}
                  >
                    {companyInfo.mission}
                  </MissionVisionCard>
                </Grid>

                <Grid item xs={12} md={6}>
                  <MissionVisionCard
                    icon={<Visibility />}
                    title="Our Vision"
                    variant="vision"
                    delay={400}
                  >
                    {companyInfo.vision}
                  </MissionVisionCard>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      </SectionContainer>

      {/* Values Section */}
      <SectionContainer ref={valuesRef}>
        <Container maxWidth="lg">
          <Fade in={valuesInView} timeout={1000}>
            <Box sx={{ mb: 8 }}>
              <AnimatedSectionTitle variant="h2" sx={{ mb: 5 }}>
                Our Core Values
              </AnimatedSectionTitle>

              <Typography
                variant="h6"
                align="center"
                color="text.secondary"
                sx={{
                  mb: 6,
                  maxWidth: "600px",
                  mx: "auto",
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                The principles that guide everything we do at AA Uganda
              </Typography>

              <Grid container spacing={4}>
                {companyInfo.values.map((value, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={value}>
                    <ValueCard
                      icon={valueIcons[value as keyof typeof valueIcons]}
                      value={value}
                      delay={index * 150}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Container>
      </SectionContainer>

      {/* Journey Section */}
      <SectionContainer
        sx={{
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.grey[100],
            0.5
          )}, ${alpha(theme.palette.primary.main, 0.05)})`,
        }}
        ref={journeyRef}
      >
        <Container maxWidth="lg">
          <Fade in={journeyInView} timeout={1000}>
            <Box>
              <AnimatedSectionTitle variant="h2" sx={{ mb: 2 }}>
                Our Journey Through Time
              </AnimatedSectionTitle>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                sx={{ mb: 6, mt: 5 }}
              >
                <Timeline color="primary" />
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ fontWeight: 400 }}
                >
                  {milestones.length}+ Years of Excellence Since 1986
                </Typography>
                <EmojiEvents color="info" />
              </Stack>

              {/* Enhanced Vertical Timeline */}
              <TimelineContainer>
                {visibleMilestones.map((milestone, index) => (
                  <TimelineItem key={milestone.year} isLeft={index % 2 === 0}>
                    {/* Timeline Year Badge */}
                    <Zoom
                      in={journeyInView}
                      timeout={600}
                      style={{ transitionDelay: `${index * 200 + 300}ms` }}
                    >
                      <TimelineYearBadge>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "white",
                            fontWeight: 800,
                            fontSize: { xs: "0.9rem", md: "1.1rem" },
                          }}
                        >
                          {milestone.year}
                        </Typography>
                      </TimelineYearBadge>
                    </Zoom>

                    {/* Timeline Content */}
                    <TimelineContent>
                      <Slide
                        direction={index % 2 === 0 ? "right" : "left"}
                        in={journeyInView}
                        timeout={800}
                        style={{ transitionDelay: `${index * 200 + 500}ms` }}
                      >
                        <TimelineCard>
                          <Stack spacing={2}>
                            {/* Achievement Icon */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Avatar
                                sx={{
                                  bgcolor: alpha(
                                    theme.palette.secondary.main,
                                    0.1
                                  ),
                                  color: "primary.main",
                                  width: 56,
                                  height: 56,
                                  border: `2px solid ${alpha(
                                    theme.palette.secondary.main,
                                    0.3
                                  )}`,
                                }}
                              >
                                <WorkspacePremium fontSize="large" />
                              </Avatar>

                              <Box>
                                <Chip
                                  label="Milestone"
                                  size="small"
                                  sx={{
                                    bgcolor: alpha(
                                      theme.palette.primary.main,
                                      0.1
                                    ),
                                    color: "primary.main",
                                    fontWeight: 600,
                                    fontSize: "0.75rem",
                                  }}
                                />
                                <Typography
                                  variant="h4"
                                  sx={{
                                    fontWeight: 800,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    mt: 0.5,
                                  }}
                                >
                                  {milestone.year}
                                </Typography>
                              </Box>
                            </Box>

                            {/* Achievement Description */}
                            <Typography
                              variant="body1"
                              sx={{
                                lineHeight: 1.8,
                                fontSize: "1.1rem",
                                color: "text.primary",
                                fontWeight: 400,
                                textAlign: "justify",
                              }}
                            >
                              {milestone.text}
                            </Typography>

                            {/* Decorative Progress Indicator */}
                            <Box
                              sx={{
                                width: "100%",
                                height: "4px",
                                borderRadius: "2px",
                                background: `linear-gradient(90deg, ${alpha(
                                  theme.palette.primary.main,
                                  0.2
                                )} 0%, ${alpha(
                                  theme.palette.secondary.main,
                                  0.6
                                )} 100%)`,
                                mt: 2,
                              }}
                            />
                          </Stack>
                        </TimelineCard>
                      </Slide>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </TimelineContainer>

              <Box sx={{ textAlign: "center", mt: 6 }}>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={journeyExpanded ? <ExpandLess /> : <ExpandMore />}
                  onClick={() => setJourneyExpanded((v) => !v)}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    borderColor: "primary.main",
                    color: "primary.main",
                    borderWidth: 2,
                    fontWeight: 600,
                    "&:hover": {
                      borderWidth: 2,
                      bgcolor: "primary.main",
                      color: "white",
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 25px ${alpha(
                        theme.palette.primary.main,
                        0.3
                      )}`,
                    },
                  }}
                >
                  {journeyExpanded
                    ? "Show Less History"
                    : "Explore Full History"}
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>
      </SectionContainer>
    </Box>
  );
};

export default WhoWeAre;
