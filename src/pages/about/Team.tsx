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
        {[
          { category: 'executive', label: 'Executive Team' },
          { category: 'senior-staff', label: 'Senior Staff' },
          { category: 'staff', label: 'Staff' },
        ].map(({ category, label }) => {
          const members = management.filter(m => m.category === category);
          if (!members.length) return null;
          return (
            <React.Fragment key={category}>
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  fontWeight: 900,
                  textAlign: 'center',
                  letterSpacing: 1,
                  color: 'primary.main',
                  textTransform: 'uppercase',
                  mt: 6,
                }}
              >
                {label}
              </Typography>
              <Divider sx={{ mb: 4, mx: 'auto', width: { xs: '60%', md: '40%' }, borderColor: 'primary.main', borderBottomWidth: 2 }} />
              <Grid container spacing={4} justifyContent="center">
                {members.map((member, idx) => {
                  const isExecutive = member.category === 'executive';
                  return (
                    <Grid item xs={12} sm={6} md={4} key={member.name + idx}>
                      <Box
                        sx={{
                          textAlign: 'center',
                          p: 3,
                          bgcolor: isExecutive ? 'primary.main' : 'white',
                          borderRadius: 4,
                          minHeight: 370,
                          minWidth: 270,
                          maxWidth: 350,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          gap: 1.2,
                          boxShadow: isExecutive ? '0 8px 32px 0 rgba(67,160,71,0.18)' : '0 4px 24px 0 rgba(0,0,0,0.08)',
                          border: isExecutive ? '2.5px solid' : '1.5px solid #e0e0e0',
                          borderColor: isExecutive ? 'secondary.main' : undefined,
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            transform: 'translateY(-8px) scale(1.04)',
                            boxShadow: isExecutive ? '0 12px 40px 0 rgba(67,160,71,0.22)' : '0 8px 32px 0 rgba(0,0,0,0.12)',
                            bgcolor: 'white',
                            borderColor: isExecutive ? 'secondary.main' : 'primary.light',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: isExecutive ? 210 : 170,
                            height: isExecutive ? 210 : 170,
                            mb: 1,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            boxShadow: 2,
                            border: isExecutive ? '4px solid' : '3px solid',
                            borderColor: isExecutive ? 'secondary.main' : 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: isExecutive ? 'primary.main' : 'white',
                          }}
                        >
                          {member.img ? (
                            <img
                              src={member.img}
                              alt={toTitleCase(member.name)}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: isExecutive ? 'center 30%' : 'top center',
                                borderRadius: '50%',
                                display: 'block',
                                padding: '0',
                              }}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                width: '100%',
                                height: '100%',
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                                fontWeight: 900,
                                fontSize: 40,
                                borderRadius: '50%',
                              }}
                            >
                              {toTitleCase(member.name).split(' ').map(n => n[0]).join('')}
                            </Avatar>
                          )}
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 900, fontSize: isExecutive ? '1.4rem' : '1.3rem', letterSpacing: 0.7, mb: 0.3, color: isExecutive ? 'secondary.main' : '#222' }}>
                          {toTitleCase(member.name)}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: { xs: isExecutive ? '1.18rem' : '1.13rem', sm: isExecutive ? '1.25rem' : '1.2rem', md: isExecutive ? '1.28rem' : '1.25rem' }, color: isExecutive ? 'secondary.main' : 'primary.main', mt: 0, mb: 0.1, letterSpacing: 0.7, textTransform: 'uppercase', textShadow: isExecutive ? '0 2px 10px rgba(255,247,0,0.12)' : '0 1px 6px rgba(33,150,243,0.08)' }}>
                          {member.role}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </React.Fragment>
          );
        })}
      </Container>
    </Box>
  );
};

export default Team;