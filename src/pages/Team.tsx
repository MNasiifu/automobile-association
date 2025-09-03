import React from 'react';
import { Box, Container, Typography, Grid, Avatar } from '@mui/material';
import { PageHeader } from '../components/molecules';
import { board, management } from '../data/companyData';

const Team: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Our Team"
        subtitle="Meet the dedicated professionals leading AA Uganda"
      />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Board of Directors */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 4 }}>
          Board of Directors
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {board.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'primary.main',
                  }}
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {member.role}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Management Team */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 4, mt: 6 }}>
          Management Team
        </Typography>
        <Grid container spacing={4}>
          {management.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'secondary.main',
                  }}
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {member.role}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Team;