import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PageHeader } from '../components/molecules';
import { Heading } from '../components/atoms';

const DemoSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
}));

const CodeBlock = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  overflow: 'auto',
  marginTop: theme.spacing(2),
}));

const PageHeaderDemo: React.FC = () => {
  const demoVariations = [
    {
      title: 'Basic Header',
      component: (
        <PageHeader
          title="Basic Page Title"
          subtitle="Simple header with title and subtitle only"
        />
      ),
      code: `<PageHeader
  title="Basic Page Title"
  subtitle="Simple header with title and subtitle only"
/>`
    },
    {
      title: 'Header with Icon',
      component: (
        <PageHeader
          title="Dashboard Overview"
          subtitle="Monitor your account activity and key metrics"
        />
      ),
      code: `        <PageHeader
          title="Dashboard Overview"
          subtitle="Monitor your activities and stay updated with real-time information."
        />`
    },
    {
      title: 'Header with Description',
      component: (
        <PageHeader
          title="Team Management"
          subtitle="Manage your team members and permissions"
          description="Advanced user management tools for team collaboration"
        />
      ),
      code: `        <PageHeader
          title="Team Management"
          subtitle="Manage your team members, roles, and permissions efficiently."
          description="Advanced user management tools for team collaboration"
        />`
    },
    {
      title: 'Header with Background Image',
      component: (
        <PageHeader
          title="Security Settings"
          subtitle="Configure your account security and privacy options"
          backgroundImage="/images/hero-illustration.png"
        />
      ),
      code: `        <PageHeader
          title="Security Center"
          subtitle="Manage security settings and monitor system vulnerabilities."
          backgroundImage="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        />`
    }
  ];

  return (
    <Box>
      {/* Main Demo Header */}
      <PageHeader
        title="PageHeader Component Demo"
        subtitle="Explore different variations and configurations of the PageHeader component"
        description="Interactive showcase of the redesigned PageHeader component with various configuration options"
      />

      {/* Demo Content */}
      <DemoSection>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6 }}>
            <Heading variant="h2" gutterBottom>
              Component Variations
            </Heading>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Below are different variations of the PageHeader component showcasing 
              various features and configurations.
            </Typography>
          </Box>

          <Grid container spacing={6}>
            {demoVariations.map((demo, index) => (
              <Grid item xs={12} key={index}>
                <Paper sx={{ p: 4, mb: 4 }}>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                    {demo.title}
                  </Typography>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  {/* Component Preview */}
                  <Box sx={{ 
                    border: '2px dashed #e0e0e0', 
                    borderRadius: 2,
                    overflow: 'hidden',
                    mb: 3
                  }}>
                    {demo.component}
                  </Box>
                  
                  {/* Code Example */}
                  <Typography variant="h6" gutterBottom>
                    Code Example:
                  </Typography>
                  <CodeBlock>
                    <pre>{demo.code}</pre>
                  </CodeBlock>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Features Overview */}
          <Box sx={{ mt: 8 }}>
            <Heading variant="h2" gutterBottom>
              Key Features
            </Heading>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    🎨 Visual Design
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Dynamic gradient backgrounds
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Glass morphism effects
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Floating background animations
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Gradient text effects
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    ✨ Animations
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Smooth fade-in transitions
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Staggered element loading
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Interactive hover effects
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Continuous background motion
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    📱 Responsive Design
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Mobile-optimized layouts
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Dynamic text sizing
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Performance optimizations
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Touch-friendly interfaces
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    🧭 Navigation
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Smart breadcrumb generation
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Icon support throughout
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      React Router integration
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Accessible navigation
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* Usage Guidelines */}
          <Box sx={{ mt: 8 }}>
            <Heading variant="h2" gutterBottom>
              Usage Guidelines
            </Heading>
            
            <Paper sx={{ p: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'success.main' }}>
                    ✅ Best Practices
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Keep titles concise and descriptive
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Use meaningful subtitles that add context
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Choose relevant, recognizable icons
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Maintain consistent breadcrumb hierarchy
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Optimize background images for performance
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'error.main' }}>
                    ❌ Things to Avoid
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Don't use overly long titles or subtitles
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Avoid using irrelevant or confusing icons
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Don't break breadcrumb navigation patterns
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Avoid heavy background images on mobile
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Don't disable animations without consideration
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Container>
      </DemoSection>
    </Box>
  );
};

export default PageHeaderDemo;
