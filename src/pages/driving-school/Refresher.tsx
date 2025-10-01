import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  Divider
} from '@mui/material';
import { ContactButtons, PageHeader } from '../../components/molecules';
import { SEO } from '../../components/SEO';
import { drivingSchoolRefresherSEO } from '../../data/seoData';
import { 
  RefreshRounded,
  SchoolRounded,
  DriveEtaRounded,
  SecurityRounded,
  AccessTimeRounded,
  GroupRounded,
  CheckCircleRounded,
  TrendingUpRounded,
  LocalOfferRounded,
  StarRounded,
  AutoAwesomeRounded,
  SupportAgentRounded
} from '@mui/icons-material';
import { config } from '../../utils/config/config';

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  features, 
  highlight = false 
}) => {
  const theme = useTheme();
  
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 3,
        border: '1px solid',
        borderColor: highlight ? 'primary.main' : 'divider',
        background: highlight 
          ? `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}08)`
          : 'background.paper',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': highlight ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        } : {},
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
          borderColor: 'primary.main',
          '& .feature-icon': {
            transform: 'scale(1.1) rotate(5deg)',
          }
        },
      }}
    >
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Icon and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            className="feature-icon"
            sx={{
              width: 56,
              height: 56,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
              mr: 2,
              transition: 'transform 0.3s ease',
              '& svg': { fontSize: 28 },
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
            {title}
          </Typography>
        </Box>

        {/* Description */}
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ mb: 3, lineHeight: 1.6, flexGrow: 1 }}
        >
          {description}
        </Typography>

        {/* Features List */}
        <List dense sx={{ pt: 0 }}>
          {features.map((feature, index) => (
            <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleRounded sx={{ fontSize: 18, color: 'success.main' }} />
              </ListItemIcon>
              <ListItemText 
                primary={feature}
                primaryTypographyProps={{ 
                  variant: 'body2',
                  sx: { fontWeight: 500 }
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

// Stats Card Component
interface StatsCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, number, label, color }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      textAlign: 'center',
      borderRadius: 3,
      border: '1px solid',
      borderColor: 'divider',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      }
    }}
  >
    <Box
      sx={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: `${color}.light`,
        mx: 'auto',
        mb: 2,
        '& svg': { fontSize: 32, color: "white" },
      }}
    >
      {icon}
    </Box>
    <Typography variant="h4" sx={{ fontWeight: 800, color: `${color}.main`, mb: 1 }}>
      {number}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
      {label}
    </Typography>
  </Paper>
);

const RefresherCourses: React.FC = () => {
  const theme = useTheme();

  const courseFeatures = [
    {
      icon: <RefreshRounded />,
      title: 'Skill Refresher',
      description: 'Comprehensive review and improvement of fundamental driving skills with modern techniques and safety protocols.',
      features: [
        'Updated traffic rules and regulations',
        'Modern vehicle technology familiarization', 
        'Defensive driving techniques',
        'Emergency response procedures'
      ],
      highlight: true
    },
    {
      icon: <SecurityRounded />,
      title: 'Defensive Driving',
      description: 'Advanced safety techniques to help you anticipate and avoid potential hazards on Uganda\'s roads.',
      features: [
        'Hazard perception training',
        'Safe following distances',
        'Weather-specific techniques',
        'Night driving safety'
      ]
    },
    {
      icon: <DriveEtaRounded />,
      title: 'Practical Assessment',
      description: 'Hands-on evaluation and improvement of your current driving skills with certified instructors.',
      features: [
        'Personalized skill assessment',
        'Real-world scenario practice',
        'Parking and maneuvering',
        'Highway driving confidence'
      ]
    },
    {
      icon: <SchoolRounded />,
      title: 'Theory Updates',
      description: 'Stay current with the latest traffic laws, road signs, and regulations in Uganda.',
      features: [
        'New traffic law updates',
        'Road sign recognition',
        'Insurance and legal requirements',
        'Environmental awareness'
      ]
    }
  ];

  const stats = [
    { icon: <GroupRounded />, number: '500+', label: 'Students Trained', color: 'primary' },
    { icon: <TrendingUpRounded />, number: '95%', label: 'Success Rate', color: 'success' },
    { icon: <AccessTimeRounded />, number: '2-4', label: 'Weeks Duration', color: 'info' },
    { icon: <StarRounded />, number: '4.9/5', label: 'Student Rating', color: 'warning' }
  ];

  return (
    <Box>
      <SEO seoData={drivingSchoolRefresherSEO} />
      <PageHeader
        title="Refresher Driving Courses"
        subtitle="Enhance your driving skills with professional refresher training programs"
        description="Stay confident and safe on Uganda's roads with our comprehensive refresher courses designed for experienced drivers."
      />

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            icon={<AutoAwesomeRounded />}
            label="Professional Training Programs"
            sx={{
              mb: 3,
              px: 2,
              py: 1,
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              '& .MuiChip-icon': { color: 'white' }
            }}
          />
          
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              color: 'primary.main',
              mb: 3,
              fontSize: { xs: '2rem', md: '3rem' },
              lineHeight: 1.2
            }}
          >
            Refresh & Improve Your{' '}
            <Box component="span" sx={{ color: 'secondary.dark' }}>
              Driving Skills
            </Box>
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              mb: 4,
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Whether you're returning to driving after a break or looking to improve your skills, 
            our refresher courses provide personalized training to boost your confidence and safety on the road.
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <StatsCard {...stat} />
            </Grid>
          ))}
        </Grid>

        {/* Course Features */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              color: 'primary.main',
              mb: 2
            }}
          >
            Our Refresher Programs
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              maxWidth: '600px',
              mx: 'auto',
              mb: 6,
              fontSize: '1.1rem'
            }}
          >
            Comprehensive training modules designed to address all aspects of modern driving
          </Typography>

          <Grid container spacing={4}>
            {courseFeatures.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <FeatureCard {...feature} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: 'white',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.05"%3E%3Cpath d="M20 20c0 11.046-8.954 20-20 20v20h20V20zM0 20v20h20c-11.046 0-20-8.954-20-20z"/%3E%3C/g%3E%3C/svg%3E")',
              opacity: 0.1,
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <SupportAgentRounded sx={{ fontSize: 64, mb: 3, opacity: 0.9 }} />
            
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Ready to Refresh Your Skills?
            </Typography>
            
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '500px', mx: 'auto' }}>
              Contact our expert driving instructors to discuss your training needs and schedule your refresher course
            </Typography>

            <Divider sx={{ bgcolor: 'white', opacity: 0.2, mb: 4, maxWidth: '200px', mx: 'auto' }} />

            <Grid item container justifyContent="center">
              <ContactButtons
              size="large"
              whatsappText="Chat About Courses"
              phoneText="Call for Info"
              phoneContact={config.company.drivingSchool.primaryContact}
              whatsappContact={config.company.drivingSchool.primaryContact}
              whatsappMessage="Hello! I'm interested in learning more about your refresher driving courses. Could you provide me with details about schedules, pricing, and enrollment?"
              buttonSx={{
                '&.MuiButton-contained': {
                  background: theme.palette.secondary.main,
                  borderColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'white',
                    color: 'secondary.dark',
                  }
                },
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                },
                '&.MuiButton-outlined': {
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'white',
                    color: 'primary.main',
                  }
                }
              }}
            />
            </Grid>
          </Box>
        </Paper>

        {/* Additional Info Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              border: '1px dashed',
              borderColor: 'secondary.main',
              bgcolor: 'secondary.light',
            }}
          >
            <LocalOfferRounded sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
              Special Enrollment Offer
            </Typography>
            <Typography variant="body1" color="primary.dark" sx={{ maxWidth: '600px', mx: 'auto' }}>
              Enroll now and receive a complimentary vehicle safety inspection with your refresher course. 
              Limited time offer for serious learners committed to road safety excellence.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default RefresherCourses;