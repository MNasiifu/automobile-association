import { Box, Container, Grid, Typography } from '@mui/material';
import { Timeline, People, EmojiEvents, Security } from '@mui/icons-material';
import { Heading } from '../../atoms';
import Counter from '../../atoms/CounterSection';

const stats = [
  {
    icon: <Timeline sx={{ fontSize: 36 }} />,
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

const ImpactSection = () => (
  <Box sx={{ bgcolor: 'grey.50', py: 5 }}>
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
        {stats.map((stat, index) => (
          <Grid key={index} xs={12} sm={6} md={3}>
            <Counter {...stat} />
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default ImpactSection;