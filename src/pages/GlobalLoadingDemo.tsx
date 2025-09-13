import React from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  Grid,
  Stack
} from '@mui/material';
import { CloudUpload, Send, Refresh } from '@mui/icons-material';
import { useGlobalLoading } from '../contexts';

/**
 * GlobalLoadingDemo Component
 * 
 * Demonstrates how to use the global loading context in any component.
 * Shows various loading patterns including:
 * - Simple loading states
 * - Progress tracking
 * - Multiple concurrent operations
 * - Automatic loading management
 */
const GlobalLoadingDemo: React.FC = () => {
  const globalLoading = useGlobalLoading();

  // Simple loading examples
  const simulateSimpleLoading = async (key: string, duration = 2000) => {
    globalLoading.startLoading(key);
    await new Promise(resolve => setTimeout(resolve, duration));
    globalLoading.stopLoading(key);
  };

  // Progress loading example
  const simulateProgressLoading = async (key: string) => {
    for (let progress = 0; progress <= 100; progress += 10) {
      globalLoading.setProgress(key, progress, {
        color: progress < 50 ? 'warning' : progress < 100 ? 'info' : 'success'
      });
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  };

  // Using withLoading helper
  const simulateWithLoading = async () => {
    await globalLoading.withLoading('apiCall', async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('API call completed');
    }, { color: 'secondary', height: 6 });
  };

  // Using withProgress helper
  const simulateWithProgress = async () => {
    await globalLoading.withProgress('upload', async (setProgress) => {
      // Simulate file upload with progress
      for (let i = 0; i <= 100; i += 5) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      console.log('Upload completed');
    }, { color: 'success', height: 8 });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Global Loading Context Demo
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        This demonstrates how the Global Loading Context works. The loading indicator appears 
        at the top of the page automatically when any loading operation is active.
      </Typography>

      <Grid container spacing={3}>
        {/* Simple Loading Operations */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Simple Loading Operations
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Start and stop loading states with different configurations.
              </Typography>
              
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<Send />}
                  onClick={() => simulateSimpleLoading('formSubmit', 2000)}
                  disabled={globalLoading.isLoading('formSubmit')}
                >
                  {globalLoading.isLoading('formSubmit') ? 'Submitting...' : 'Submit Form'}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={() => simulateSimpleLoading('dataRefresh', 3000)}
                  disabled={globalLoading.isLoading('dataRefresh')}
                  color="secondary"
                >
                  {globalLoading.isLoading('dataRefresh') ? 'Refreshing...' : 'Refresh Data'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Progress Loading Operations */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Progress Loading Operations
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Show determinate progress with custom colors and configurations.
              </Typography>

              <Stack spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<CloudUpload />}
                  onClick={() => simulateProgressLoading('fileUpload')}
                  disabled={globalLoading.isLoading('fileUpload')}
                  color="info"
                >
                  {globalLoading.isLoading('fileUpload') 
                    ? `Uploading... ${globalLoading.getProgress('fileUpload') || 0}%`
                    : 'Upload File'
                  }
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => simulateProgressLoading('dataSync')}
                  disabled={globalLoading.isLoading('dataSync')}
                  color="warning"
                >
                  {globalLoading.isLoading('dataSync')
                    ? `Syncing... ${globalLoading.getProgress('dataSync') || 0}%`
                    : 'Sync Data'
                  }
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Helper Methods */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Helper Methods
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Use the convenience methods for automatic loading management.
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={simulateWithLoading}
                  disabled={globalLoading.isLoading('apiCall')}
                  color="secondary"
                >
                  {globalLoading.isLoading('apiCall') ? 'API Loading...' : 'Call API with withLoading'}
                </Button>

                <Button
                  variant="contained"
                  onClick={simulateWithProgress}
                  disabled={globalLoading.isLoading('upload')}
                  color="success"
                >
                  {globalLoading.isLoading('upload') 
                    ? `Progress: ${globalLoading.getProgress('upload') || 0}%`
                    : 'Upload with withProgress'
                  }
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => globalLoading.resetAll()}
                  color="error"
                >
                  Reset All Loading
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Loading State Information */}
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: 'grey.50' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Loading States
              </Typography>
              <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                {JSON.stringify({
                  isAnyLoading: globalLoading.isAnyLoading,
                  loadingStates: globalLoading.loadingStates,
                }, null, 2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GlobalLoadingDemo;
