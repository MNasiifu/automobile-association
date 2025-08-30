import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { WorkspacePremium } from '@mui/icons-material';

interface JourneyItemProps {
  year: number;
  text: string;
}

const JourneyItem: React.FC<JourneyItemProps> = ({ year, text }) => (
  <Paper
    variant="outlined"
    sx={{
      p: 2.5,
      borderRadius: 2,
      display: 'flex',
      gap: 1.5,
      alignItems: 'flex-start',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: (theme) => theme.shadows[2],
      },
    }}
  >
    <WorkspacePremium color="secondary" fontSize="small" />
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {year}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  </Paper>
);

export default JourneyItem;