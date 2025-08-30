import { Container, Grid } from '@mui/material';
import { Heading } from '../../atoms';
import { PersonCard } from '../../molecules';
import { board, management } from '../../../data/companyData';

const TeamsSection = () => (
  <>
    <Container maxWidth="lg">
      <Heading id="board-heading" variant="h3" gutterBottom>
        Board of Directors
      </Heading>
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 3.5, lg: 4 }}
        sx={{ justifyContent: 'center' }}
      >
        {board.map((person) => (
          <Grid key={person.name} xs={12} sm={6} md={4} lg={3}>
            <PersonCard name={person.name} role={person.role} />
          </Grid>
        ))}
      </Grid>
    </Container>

    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Heading id="management-heading" variant="h3" gutterBottom>
        Management
      </Heading>
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 3.5, lg: 4 }}
        sx={{ justifyContent: 'center' }}
      >
        {management.map((person) => (
          <Grid key={person.name} xs={12} sm={6} md={4} lg={3}>
            <PersonCard name={person.name} role={person.role} />
          </Grid>
        ))}
      </Grid>
    </Container>
  </>
);

export default TeamsSection;