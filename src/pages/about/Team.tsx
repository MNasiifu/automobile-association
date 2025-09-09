import React from 'react';
import { Box, Container, Typography, Grid, Avatar, Divider } from '@mui/material';
import { PageHeader } from '../../components/molecules';
import { SEO } from '../../components/SEO';
import { teamSEO } from '../../data/seoData';
import { management } from '../../data/companyData';

function toTitleCase(name: string) {
  return name
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}

const Team: React.FC = () => {
  return (
    <Box>
      <SEO seoData={teamSEO} />
      <PageHeader
        title="Our Team"
        subtitle="Meet the dedicated professionals leading AA Uganda"
      />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 2, fontWeight: 900, textAlign: 'center', letterSpacing: 1 }}>
          Management Team
        </Typography>
        <Divider sx={{ mb: 4, mx: 'auto', width: { xs: '60%', md: '40%' }, borderColor: 'primary.main', borderBottomWidth: 2 }} />
        <Grid container spacing={4} justifyContent="center">
          {management.map((member, idx) => (
            <Grid item xs={12} sm={6} md={4} key={member.name + idx}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  bgcolor: 'background.paper',
                  borderRadius: 3,
                  minHeight: 340,
                  minWidth: 260,
                  maxWidth: 340,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: 1.5,
                  boxShadow: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.03)',
                    boxShadow: 6,
                    bgcolor: 'grey.100',
                  },
                }}
              >
                <Avatar
                  src={member.img || undefined}
                  alt={toTitleCase(member.name)}
                  sx={{
                    width: 110,
                    height: 110,
                    mb: 1.5,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    fontWeight: 900,
                    fontSize: 32,
                  }}
                >
                  {!member.img && toTitleCase(member.name).split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: 0.5 }}>
                  {toTitleCase(member.name)}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', sm: '1.18rem', md: '1.22rem' }, color: 'primary.main', mt: 1, mb: 0.5, letterSpacing: 0.5 }}>
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