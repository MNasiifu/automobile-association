import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Fab,
} from '@mui/material';
import {
  CheckCircle,
  ArrowUpward,
  Navigation as NavigationIcon,
  Speed,
  Accessibility,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { PageHeader } from '../components/molecules';
import { SEO } from '../components/SEO';
import { Heading } from '../components/atoms';
import { scrollToTop } from '../utils/performance';

const DemoSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(1),
}));

const FeatureList = styled(List)(() => ({
  '& .MuiListItem-root': {
    paddingLeft: 0,
  },
}));

const TestContent = styled(Box)(({ theme }) => ({
  height: '200vh', // Make the page very tall for scroll testing
  background: `linear-gradient(180deg, 
    ${theme.palette.background.paper} 0%, 
    ${theme.palette.grey[50]} 50%, 
    ${theme.palette.background.paper} 100%)`,
  padding: theme.spacing(4, 0),
}));

const ScrollToTopDemo: React.FC = () => {
  const [manualScrollBehavior, setManualScrollBehavior] = useState<ScrollBehavior>('smooth');
  
  const features = [
    {
      icon: <CheckCircle color="success" />,
      title: 'Automatic Scroll on Route Change',
      description: 'Pages automatically scroll to top when navigating between routes',
    },
    {
      icon: <NavigationIcon color="primary" />,
      title: 'Smart Hash Navigation',
      description: 'Hash-based navigation (e.g., #section) works independently without triggering scroll-to-top',
    },
    {
      icon: <Speed color="secondary" />,
      title: 'Configurable Behavior',
      description: 'Choose between instant, smooth, or auto scroll behaviors',
    },
    {
      icon: <Accessibility color="info" />,
      title: 'Accessibility Friendly',
      description: 'Respects user preferences and provides consistent navigation experience',
    },
  ];

  const implementationSteps = [
    'Created useScrollToTop hook for automatic scroll behavior',
    'Added ScrollToTop component for declarative usage',
    'Integrated useHashScroll hook for hash-based navigation',
    'Applied ScrollToTop component in main App.tsx Router',
    'Configured to exclude hash navigation from scroll-to-top',
    'Added manual scroll utilities for custom implementations',
  ];

  const handleManualScroll = () => {
    scrollToTop(manualScrollBehavior);
  };

  return (
    <Box>
      <SEO seoData={{
        title: 'Scroll to Top Implementation - AA Uganda',
        description: 'Demonstration of scroll-to-top functionality implementation across the AA Uganda website',
        keywords: 'scroll to top, navigation, user experience, react, router',
      }} />
      
      <PageHeader
        title="Scroll to Top Implementation"
        subtitle="Comprehensive scroll-to-top solution for improved user navigation"
        description="This page demonstrates the scroll-to-top functionality that ensures users always start at the top when navigating to new pages."
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Implementation Status */}
        <DemoSection elevation={2}>
          <Heading variant="h4" gutterBottom sx={{ color: 'success.main' }}>
            ✅ Implementation Complete
          </Heading>
          <Alert severity="success" sx={{ mb: 3 }}>
            Scroll-to-top functionality has been successfully implemented across all pages!
          </Alert>
          
          <Typography variant="body1" paragraph>
            The scroll-to-top solution ensures that whenever users navigate to a new page, they automatically
            start at the top of that page, providing a consistent and user-friendly navigation experience.
          </Typography>
        </DemoSection>

        {/* Features */}
        <DemoSection elevation={1}>
          <Heading variant="h5" gutterBottom>
            Key Features
          </Heading>
          <FeatureList>
            {features.map((feature, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {feature.icon}
                </ListItemIcon>
                <ListItemText
                  primary={feature.title}
                  secondary={feature.description}
                />
              </ListItem>
            ))}
          </FeatureList>
        </DemoSection>

        {/* Implementation Steps */}
        <DemoSection elevation={1}>
          <Heading variant="h5" gutterBottom>
            Implementation Steps Completed
          </Heading>
          <List>
            {implementationSteps.map((step, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary={`${index + 1}. ${step}`} />
              </ListItem>
            ))}
          </List>
        </DemoSection>

        {/* Testing Section */}
        <DemoSection elevation={1}>
          <Heading variant="h5" gutterBottom>
            Test the Implementation
          </Heading>
          <Typography variant="body1" paragraph>
            Navigate between different pages using the main navigation to see the scroll-to-top behavior in action.
            Each page transition will automatically scroll to the top.
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                component={RouterLink}
                to="/"
              >
                Home Page
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                component={RouterLink}
                to="/about"
              >
                About Page
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                component={RouterLink}
                to="/services"
              >
                Services Page
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                component={RouterLink}
                to="/contact"
              >
                Contact Page
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Manual Scroll Test
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Scroll down this page and then use the button below to test manual scroll-to-top functionality.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<ArrowUpward />}
              onClick={handleManualScroll}
            >
              Scroll to Top ({manualScrollBehavior})
            </Button>
            <Button
              size="small"
              onClick={() => setManualScrollBehavior(
                manualScrollBehavior === 'smooth' ? 'instant' : 'smooth'
              )}
            >
              Toggle: {manualScrollBehavior === 'smooth' ? 'Smooth' : 'Instant'}
            </Button>
          </Box>
        </DemoSection>

        {/* Long content for scroll testing */}
        <TestContent>
          <Container>
            <Typography variant="h6" gutterBottom>
              Long Content for Scroll Testing
            </Typography>
            <Typography variant="body1" paragraph>
              This section contains additional content to make the page scrollable. 
              Scroll down and then navigate to another page to test the scroll-to-top functionality.
            </Typography>
            
            {[1, 2, 3, 4, 5].map((item) => (
              <Box key={item} sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Test Section {item}
                </Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                  officia deserunt mollit anim id est laborum.
                </Typography>
              </Box>
            ))}
          </Container>
        </TestContent>

        {/* Floating Action Button for scroll to top */}
        <Fab
          color="primary"
          aria-label="scroll to top"
          onClick={() => scrollToTop('smooth')}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <ArrowUpward />
        </Fab>
      </Container>
    </Box>
  );
};

export default ScrollToTopDemo;
