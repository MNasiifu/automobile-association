import React from 'react';
import { Paper, Stack, Avatar, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface MissionVisionCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  variant?: 'mission' | 'vision';
}

const MissionVisionCard: React.FC<MissionVisionCardProps> = ({
  icon,
  title,
  children,
  variant = 'mission',
}) => {
  const isMission = variant === 'mission';

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 2,
        height: '100%',
        bgcolor: (t) =>
          isMission
            ? t.palette.primary.main
            : alpha(t.palette.secondary.main, 0.08),
        color: isMission ? 'primary.contrastText' : 'text.primary',
        borderColor: (t) =>
          isMission
            ? alpha(t.palette.primary.contrastText, 0.18)
            : t.palette.divider,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
        <Avatar
          sx={{
            bgcolor: isMission ? 'secondary.main' : 'primary.main',
            color: isMission ? 'primary.main' : 'primary.contrastText',
            width: 36,
            height: 36,
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
        {children}
      </Typography>
    </Paper>
  );
};

export default MissionVisionCard;