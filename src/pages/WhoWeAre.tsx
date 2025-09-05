import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  Avatar,
  Button,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Flag,
  Visibility,
  WorkspacePremium,
  StarOutline,
  VerifiedUser,
  TrendingUp,
  ThumbUpAlt,
  Security,
} from '@mui/icons-material';
import { PageHeader } from '../components/molecules';
import { SEO } from '../components/SEO';
import { whoWeAreSEO } from '../data/seoData';
import { companyInfo, milestones } from '../data/companyData';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import heroImg from '../assets/images/AA-rescue.jpg';
import stripeImg from '../assets/images/STRIPWEBSITE.png';
import { StripeDivider } from '../components/atoms';

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

const ValueCard = ({ icon, value }: { icon: React.ReactNode; value: string }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: 2,
      height: '100%',
      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
      border: '1px solid',
      borderColor: 'divider',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: (theme) => theme.shadows[4],
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
      },
    }}
  >
    <Stack alignItems="center" spacing={2}>
      <Avatar
        sx={{
          width: 56,
          height: 56,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        {icon}
      </Avatar>
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontWeight: 600,
          color: 'text.primary',
        }}
      >
        {value}
      </Typography>
    </Stack>
  </Paper>
);

export const WhoWeAre: React.FC = () => {
  const [journeyExpanded, setJourneyExpanded] = React.useState(false);
  const milestonesDesc = React.useMemo(
    () => [...milestones].sort((a, b) => b.year - a.year),
    []
  );
  const visibleMilestones = journeyExpanded
    ? milestonesDesc
    : milestonesDesc.slice(0, 4);

  // Map values to appropriate icons
  const valueIcons = {
    'Excellence in Service': <StarOutline />,
    'Integrity and Trust': <VerifiedUser />,
    'Innovation and Growth': <TrendingUp />,
    'Customer Satisfaction': <ThumbUpAlt />,
    'Safety First': <Security />,
  };

  return (
    <Box>
      <SEO seoData={whoWeAreSEO} />
      <PageHeader
        title="Who We Are"
        subtitle="Discover our mission, vision, values, and journey in serving Uganda's motoring community"
      />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Mission & Vision Section */}
        <Grid container spacing={3} alignItems="stretch" sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <MissionVisionCard
              icon={<Flag fontSize="small" />}
              title="Our Mission"
              variant="mission"
            >
              {companyInfo.mission}
            </MissionVisionCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <MissionVisionCard
              icon={<Visibility fontSize="small" />}
              title="Our Vision"
              variant="vision"
            >
              {companyInfo.vision}
            </MissionVisionCard>
          </Grid>
        </Grid>

        {/* Hero Image */}
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
            mb: 8,
          }}
        />

        {/* Values Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
            Our Values
          </Typography>
          <Grid container spacing={3}>
            {companyInfo.values.map((value) => (
              <Grid item xs={12} sm={6} md={4} key={value}>
                <ValueCard
                  icon={valueIcons[value as keyof typeof valueIcons]}
                  value={value}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <StripeDivider imageSrc={stripeImg} />

        {/* Journey Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h3" gutterBottom>
            Our Journey
          </Typography>

          <Grid container spacing={3}>
            {visibleMilestones.map((m) => (
              <Grid key={m.year} item xs={12} md={6}>
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

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="text"
              startIcon={journeyExpanded ? <ExpandLess /> : <ExpandMore />}
              onClick={() => setJourneyExpanded((v) => !v)}
              sx={{
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: 'primary.dark',
                  textDecoration: 'underline',
                },
              }}
            >
              {journeyExpanded ? 'Show less' : 'Show more'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WhoWeAre;