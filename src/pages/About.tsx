import * as React from 'react';
import Grid from '@mui/material/Grid';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Paper,
  Stack,
  Button,
  ImageList,
  ImageListItem,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import {
  Timeline as TimelineIcon,
  People,
  EmojiEvents,
  Security,
  WorkspacePremium,
  Flag,
  Visibility,
} from '@mui/icons-material';
import { Heading, Card, CountUpAnimation, StripeDivider } from '../components/atoms';
import { PageHeader } from '../components/molecules';
import { useLocation } from 'react-router-dom';
import {
  companyInfo,
  affiliates,
  board,
  management,
  milestones,
} from '../data/companyData';



import stripeImg from '../assets/images/STRIPWEBSITE.png';
import heroImg from '../assets/images/AA-rescue.jpg';

import g1 from '../assets/images/AA-rescue.jpg';
import g2 from '../assets/images/rescue.jpg';
import g3 from '../assets/images/car1.jpeg';
import g4 from '../assets/images/defensive-driving.jpeg';
import g5 from '../assets/images/driving-school.jpg';
import g6 from '../assets/images/road.jpg';
import g7 from '../assets/images/TOWINGANDRECOVERYFRESHCAR.jpeg';
import fiaLogo from '../assets/images/FIA.jpeg';

function useHashScroll() {
  const location = useLocation();
  React.useEffect(() => {
    const hash = location.hash?.replace('#', '');
    if (!hash) return;
    const el = document.getElementById(decodeURIComponent(hash));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.pathname, location.hash]);
}

const animationKeyframes = {
  fadeIn: keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  `,
  slideInRight: keyframes`
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  `,
  countUp: keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  `,
};

const Section = styled('section')(({ theme }) => ({
  padding: theme.spacing(6, 0),
  scrollMarginTop: theme.spacing(12),
  opacity: 0,
  animation: `${animationKeyframes.fadeIn} 0.8s ease-out forwards`,
  '&:nth-of-type(even)': {
    animation: `${animationKeyframes.slideInRight} 0.8s ease-out forwards`,
  },
  [theme.breakpoints.up('md')]: { 
    scrollMarginTop: theme.spacing(14),
  },
}));

const StatsSectionRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(5, 0),
}));

const StatCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  height: '100%',
  padding: theme.spacing(3.5),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  wordBreak: 'break-word',
  opacity: 0,
  transform: 'translateY(20px)',
  animation: `${animationKeyframes.fadeIn} 0.6s ease-out forwards`,
  '&:nth-of-type(1)': { animationDelay: '0.2s' },
  '&:nth-of-type(2)': { animationDelay: '0.4s' },
  '&:nth-of-type(3)': { animationDelay: '0.6s' },
  '&:nth-of-type(4)': { animationDelay: '0.8s' },
}));

const IconWrapper = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  margin: '0 auto 12px auto',
}));

const MissionVisionCard = ({
  icon,
  title,
  children,
  variant = 'mission',
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  variant?: 'mission' | 'vision';
}) => {
  const isMission = variant === 'mission';
  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 2,
        height: '100%',
        bgcolor: (t) =>
          isMission
            ? t.palette.primary.main
            : alpha(t.palette.secondary.main, 0.08),
        color: isMission ? 'primary.contrastText' : 'text.primary',
        borderColor: (t) =>
          isMission
            ? alpha(t.palette.primary.contrastText, 0.18)
            : t.palette.divider,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
        <Avatar
          sx={{
            bgcolor: isMission ? 'secondary.main' : 'primary.main',
            color: isMission ? 'primary.main' : 'primary.contrastText',
            width: 36,
            height: 36,
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
        {children}
      </Typography>
    </Paper>
  );
};

const PersonCard: React.FC<{ name: string; role: string }> = ({
  name,
  role,
}) => (
  <Paper
    variant="outlined"
    sx={{
      p: 3,
      textAlign: 'center',
      borderRadius: 2,
      minHeight: { xs: 260, sm: 280 }, // ↑ taller
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 1.25,
      bgcolor: 'grey.50',
    }}
  >
    <Avatar
      sx={{
        width: 110,
        height: 110,
        mb: 1,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        fontWeight: 900,
        fontSize: 30,
      }}
    >
      {name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()}
    </Avatar>
    <Typography variant="h6" sx={{ fontWeight: 800 }}>
      {name}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {role}
    </Typography>
  </Paper>
);

const About: React.FC = () => {
  useHashScroll();
  const [journeyExpanded, setJourneyExpanded] = React.useState(false);

  const milestonesDesc = React.useMemo(
    () => [...milestones].sort((a, b) => b.year - a.year),
    []
  );
  const visibleMilestones = journeyExpanded
    ? milestonesDesc
    : milestonesDesc.slice(0, 4);
  const stats = [
    {
      icon: <TimelineIcon sx={{ fontSize: 36 }} />,
      number: '65+',
      label: 'Years of Service',
      description: 'Serving Uganda since 1955',
    },
    {
      icon: <People sx={{ fontSize: 36 }} />,
      number: '10,000+',
      label: 'Active Members',
      description: 'Trusted by thousands',
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 36 }} />,
      number: '30+',
      label: 'Rescue Vehicles',
      description: 'Nationwide coverage',
    },
    {
      icon: <Security sx={{ fontSize: 36 }} />,
      number: '99%',
      label: 'Customer Satisfaction',
      description: 'Excellence in service',
    },
  ];

  const gallery = [g1, g2, g3, g4, g5, g6, g7];

  return (
    <Box>
      <PageHeader
        title="About AAU"
        subtitle="Uganda's trusted partner for road safety, training, inspections, insurance and roadside assistance."
      />

      <Section id="mission-vision" aria-labelledby="mission-vision-heading">
        <Container maxWidth="lg">
          <Heading id="mission-vision-heading" variant="h2" gutterBottom>
            Mission & Vision
          </Heading>

          <Grid container spacing={3} alignItems="stretch">
            <Grid xs={12} md={6}>
              <MissionVisionCard
                icon={<Flag fontSize="small" />}
                title="Our Mission"
                variant="mission"
              >
                {companyInfo.mission}
              </MissionVisionCard>
            </Grid>

            <Grid xs={12} md={6}>
              <MissionVisionCard
                icon={<Visibility fontSize="small" />}
                title="Our Vision"
                variant="vision"
              >
                {companyInfo.vision}
              </MissionVisionCard>
            </Grid>
          </Grid>

          <Box
            component="img"
            src={heroImg}
            alt="AA Uganda Team"
            sx={{
              width: '100%',
              height: { xs: 240, sm: 300, md: 380 },
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 3,
              mt: 3,
            }}
          />
        </Container>
      </Section>

      <StripeDivider imageSrc={stripeImg} />

      <Section id="impact" aria-labelledby="impact-heading" sx={{ p: 0 }}>
        <StatsSectionRoot>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Heading id="impact-heading" variant="h2" gutterBottom>
                Our Impact
              </Heading>
              <Typography variant="h6" color="text.secondary">
                Decades of excellence in automotive services
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {stats.map((s, i) => (
                <Grid key={i} xs={12} sm={6} md={3}>
                  <StatCard>
                    <IconWrapper>{s.icon}</IconWrapper>
                    <CountUpAnimation
                      value={s.number}
                      variant="h3"
                      color="primary"
                      sx={{ fontWeight: 800, mb: 0.5 }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, mb: 0.5 }}
                    >
                      {s.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {s.description}
                    </Typography>
                  </StatCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </StatsSectionRoot>
      </Section>

      <Section id="journey" aria-labelledby="journey-heading">
        <Container maxWidth="lg">
          <Heading id="journey-heading" variant="h3" gutterBottom>
            Our Journey
          </Heading>

          <Grid id="journey-list" container spacing={{ xs: 2, md: 2.5 }}>
            {visibleMilestones.map((m) => (
              <Grid key={m.year} xs={12} md={6}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'flex-start',
                  }}
                >
                  <WorkspacePremium color="secondary" fontSize="small" />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {m.year}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {m.text}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 1.5 }}>
            <Button
              variant="text"
              disableRipple
              disableFocusRipple
              disableElevation
              startIcon={journeyExpanded ? <ExpandLess /> : <ExpandMore />}
              onClick={() => setJourneyExpanded((v) => !v)}
              aria-expanded={journeyExpanded ? 'true' : 'false'}
              aria-controls="journey-list"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                textTransform: 'none',
                p: 0,
                minWidth: 0,
                m: 0,
                bgcolor: 'transparent !important',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: 'primary.dark',
                  textDecoration: 'underline',
                },
                '&:focus,&:focus-visible': { outline: 'none' },
                boxShadow: 'none',
              }}
            >
              {journeyExpanded ? 'Show less' : 'Show more'}
            </Button>
          </Box>
        </Container>
      </Section>

      <StripeDivider imageSrc={stripeImg} />

      <Section id="board" aria-labelledby="board-heading">
        <Container maxWidth="lg">
          <Heading id="board-heading" variant="h3" gutterBottom>
            Board of Directors
          </Heading>
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 3.5, lg: 4 }}
            sx={{ justifyContent: 'center' }}
          >
            {board.map((p) => (
              <Grid key={p.name} xs={12} sm={6} md={4} lg={3}>
                <PersonCard name={p.name} role={p.role} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section id="management" aria-labelledby="management-heading">
        <Container maxWidth="lg">
          <Heading id="management-heading" variant="h3" gutterBottom>
            Management
          </Heading>

          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 3.5, lg: 4 }}
            sx={{ justifyContent: 'center' }}
          >
            {management.map((p) => (
              <Grid key={p.name} xs={12} sm={6} md={4} lg={3}>
                <PersonCard name={p.name} role={p.role} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      <StripeDivider imageSrc={stripeImg} />

      <Section id="affiliation" aria-labelledby="affiliation-heading">
        <Container maxWidth="lg">
          <Heading id="affiliation-heading" variant="h3" gutterBottom>
            Affiliation & Partners
          </Heading>

          <Grid container spacing={3} alignItems="center">
            {/* Big logo */}
            <Grid xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: { xs: 2, md: 3 },
                  minHeight: { xs: 220, md: 300 },
                }}
              >
                <Box
                  component="img"
                  src={affiliates?.[0]?.img ?? fiaLogo}
                  alt={affiliates?.[0]?.name ?? 'FIA'}
                  sx={{
                    width: '100%',
                    maxWidth: 420,
                    maxHeight: 300,
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 24px rgba(0,0,0,.15))',
                  }}
                />
              </Box>
            </Grid>

            {/* Text panel */}
            <Grid xs={12} md={6}>
              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderRadius: 2,
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
                  borderColor: (t) => alpha(t.palette.primary.main, 0.18),
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 1.5 }}>
                  FIA Membership
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                  {affiliates?.[0]?.description || 'FIA description'}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Section>

      <StripeDivider imageSrc={stripeImg} reverse />

      <Box component="section" sx={{ mb: 6 }}>
        <Container maxWidth="lg">
          <Heading id="gallery-heading" variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
            Gallery
          </Heading>
          <ImageList 
            variant="quilted" 
            cols={3} 
            gap={16} 
            sx={{ 
              overflow: 'hidden',
              '& .MuiImageListItem-root': {
                height: '240px !important'
              }
            }}
            rowHeight={240}
          >
            {gallery.map((src, index) => (
              <ImageListItem key={index}>
                <Box
                  component="img"
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 1,
                    transition: 'transform 0.3s ease-in-out',
                    display: 'block',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
