import { Container, Grid, Box } from '@mui/material';
import { Flag, Visibility } from '@mui/icons-material';
import { Heading } from '../../atoms';
import { MissionVisionCard } from '../../molecules';
import { companyInfo } from '../../../data/companyData';
import heroImg from '../../../assets/images/AA-rescue.jpg';

const MissionVisionSection = () => (
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
);

export default MissionVisionSection;