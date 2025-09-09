import React from 'react';
import { Paper, Avatar, Typography } from '@mui/material';

interface PersonCardProps {
  name: string;
  role: string;
}

const PersonCard: React.FC<PersonCardProps> = ({ name, role }) => (
  <Paper
    variant="outlined"
    sx={{
      p: 3,
      textAlign: 'center',
      borderRadius: 2,
      minHeight: 320,
      minWidth: 260,
      maxWidth: 320,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 1.25,
      bgcolor: 'grey.50',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: (theme) => theme.shadows[4],
      },
    }}
  >
    <Avatar
      sx={{
        width: 110,
        height: 110,
        mb: 1,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        fontWeight: 900,
        fontSize: 30,
      }}
    >
      {name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()}
    </Avatar>
    <Typography variant="h6" sx={{ fontWeight: 800 }}>
      {name}
    </Typography>
    <Typography
      variant="subtitle1"
      color="text.secondary"
      sx={{
        fontWeight: 600,
        fontSize: { xs: '1.1rem', sm: '1.15rem', md: '1.2rem' },
      }}
    >
      {role}
    </Typography>
  </Paper>
);

export default PersonCard;