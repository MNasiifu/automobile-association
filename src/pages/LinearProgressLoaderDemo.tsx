import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,

  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Stack,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LinearProgressLoader,
  LinearProgressLoader as RelativeLoader,
} from '../components/atoms';
import { useLoading } from '../hooks';
import { PageHeader } from '../components/molecules';

const DemoCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8],
  },
}));

const CodeBlock = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  overflow: 'auto',
  marginTop: theme.spacing(2),
  position: 'relative',
  '& pre': {
    margin: 0,
    whiteSpace: 'pre-wrap',
  },
}));

const RelativeContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 200,
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
  overflow: 'hidden',
}));

const LinearProgressLoaderDemo: React.FC = () => {
  const loading = useLoading();
  const [globalLoading, setGlobalLoading] = useState(false);
  const [relativeLoading, setRelativeLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState<'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'>('primary');
  const [height, setHeight] = useState(4);

  const handleGlobalDemo = async () => {
    setGlobalLoading(true);
    
    // Simulate a process with progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setTimeout(() => {
      setGlobalLoading(false);
      setProgress(0);
    }, 500);
  };

  const handleRelativeDemo = async () => {
    setRelativeLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setRelativeLoading(false);
  };

  const handleAsyncDemo = async () => {
    await loading.withProgress('asyncDemo', async (setProgress) => {
      for (let i = 0; i <= 100; i += 5) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    });
  };

  const demos = [
    {
      title: 'Global Fixed Loader',
      description: 'Shows at the top of the viewport, below the navigation bar',
      component: (
        <Box>
          <Button 
            variant="contained" 
            onClick={handleGlobalDemo}
            disabled={globalLoading}
            fullWidth
          >
            {globalLoading ? 'Loading...' : 'Start Global Demo'}
          </Button>
          <LinearProgressLoader 
            loading={globalLoading}
            progress={globalLoading ? progress : undefined}
            color={color}
            height={height}
            fixed={true}
          />
        </Box>
      ),
      code: `<LinearProgressLoader 
  loading={isLoading}
  progress={progress} // 0-100 or undefined for indeterminate
  color="primary"
  height={4}
  fixed={true}
/>`
    },
    {
      title: 'Relative Container Loader',
      description: 'Positioned relative to its parent container',
      component: (
        <Box>
          <Button 
            variant="outlined" 
            onClick={handleRelativeDemo}
            disabled={relativeLoading}
            fullWidth
          >
            {relativeLoading ? 'Loading...' : 'Start Relative Demo'}
          </Button>
          <RelativeContainer>
            <Typography variant="body2" color="text.secondary">
              Container Content
            </Typography>
            <RelativeLoader 
              loading={relativeLoading}
              color={color}
              height={height}
              fixed={false}
            />
          </RelativeContainer>
        </Box>
      ),
      code: `<Box sx={{ position: 'relative' }}>
  <LinearProgressLoader 
    loading={isLoading}
    color="secondary"
    height={6}
    fixed={false}
  />
  {/* Your content */}
</Box>`
    },
    {
      title: 'Hook Integration',
      description: 'Using the useLoading hook for automatic management',
      component: (
        <Box>
          <Button 
            variant="contained" 
            color="secondary"
            onClick={handleAsyncDemo}
            disabled={loading.isLoading('asyncDemo')}
            fullWidth
          >
            {loading.isLoading('asyncDemo') ? 'Processing...' : 'Start Async Demo'}
          </Button>
          <LinearProgressLoader 
            loading={loading.isLoading('asyncDemo')}
            progress={loading.getProgress('asyncDemo')}
            color="secondary"
            height={6}
            fixed={true}
          />
          {loading.isLoading('asyncDemo') && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Progress: {loading.getProgress('asyncDemo') || 0}%
            </Alert>
          )}
        </Box>
      ),
      code: `const loading = useLoading();

await loading.withProgress('operation', async (setProgress) => {
  // Your async operation with progress updates
  setProgress(50);
});

<LinearProgressLoader 
  loading={loading.isLoading('operation')}
  progress={loading.getProgress('operation')}
/>`
    }
  ];

  return (
    <Box>
      <PageHeader
        title="LinearProgressLoader Demo"
        subtitle="Interactive demonstration of the reusable loading component"
        description="Explore different configurations and use cases for the LinearProgressLoader component"
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Controls */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Customization Controls
          </Typography>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Color</InputLabel>
                <Select
                  value={color}
                  onChange={(e) => setColor(e.target.value as any)}
                  label="Color"
                >
                  <MenuItem value="primary">Primary</MenuItem>
                  <MenuItem value="secondary">Secondary</MenuItem>
                  <MenuItem value="success">Success</MenuItem>
                  <MenuItem value="warning">Warning</MenuItem>
                  <MenuItem value="error">Error</MenuItem>
                  <MenuItem value="info">Info</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography gutterBottom>Height: {height}px</Typography>
              <Slider
                value={height}
                onChange={(_, value) => setHeight(value as number)}
                min={2}
                max={12}
                step={1}
                size="small"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Demo Cards */}
        <Grid container spacing={4}>
          {demos.map((demo, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <DemoCard>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" gutterBottom>
                    {demo.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flex: 1 }}>
                    {demo.description}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    {demo.component}
                  </Box>

                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Example Code:
                  </Typography>
                  <CodeBlock>
                    <pre>{demo.code}</pre>
                  </CodeBlock>
                </CardContent>
              </DemoCard>
            </Grid>
          ))}
        </Grid>

        {/* Features */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom align="center">
            Key Features
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[
              {
                title: 'Fixed Positioning',
                description: 'Automatically positions at the top of the viewport, below the navigation bar'
              },
              {
                title: 'Progress Tracking',
                description: 'Support for both determinate (0-100%) and indeterminate progress'
              },
              {
                title: 'Multiple Colors',
                description: 'Six color variants with gradient effects and shadows'
              },
              {
                title: 'Responsive Design',
                description: 'Adapts to different navigation heights and screen sizes'
              },
              {
                title: 'Hook Integration',
                description: 'Works seamlessly with useLoading hook for state management'
              },
              {
                title: 'Portal Rendering',
                description: 'Uses React Portal for optimal DOM positioning'
              }
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Usage Guidelines */}
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Usage Guidelines
          </Typography>
          <Stack spacing={2}>
            <Alert severity="info">
              <strong>Fixed vs Relative:</strong> Use fixed positioning for global operations 
              that affect the entire page. Use relative positioning for component-specific loading.
            </Alert>
            <Alert severity="success">
              <strong>Progress Tracking:</strong> Always provide progress updates for operations 
              that take more than 2-3 seconds to improve user experience.
            </Alert>
            <Alert severity="warning">
              <strong>Z-Index:</strong> The default z-index (1301) ensures the loader appears 
              above the AppBar but below modals. Adjust if needed for your specific use case.
            </Alert>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default LinearProgressLoaderDemo;
