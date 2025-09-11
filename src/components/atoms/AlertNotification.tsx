import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material';
import { styled } from '@mui/material/styles';

interface AlertNotificationProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
  autoHideDuration?: number | null;
  position?: 'top-right' | 'top-center' | 'bottom-center';
  showCloseButton?: boolean;
}

const StyledSnackbar = styled(Snackbar)(() => ({
  '& .MuiSnackbarContent-root': {
    minWidth: '300px',
  },
  // Enhanced positioning for top-right alerts
  '&.top-right': {
    top: '80px !important', // Account for navigation header
    right: '24px !important',
  },
  '&.top-center': {
    top: '80px !important',
  },
}));

const StyledAlert = styled(Alert)(({ theme }) => ({
  width: '100%',
  boxShadow: theme.shadows[6],
  borderRadius: theme.spacing(2),
  
  '& .MuiAlert-message': {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  
  '& .MuiAlert-icon': {
    fontSize: '1.2rem',
  },
  
  // Different styles based on severity
  '&.MuiAlert-filledSuccess': {
    backgroundColor: theme.palette.success.main,
    '& .MuiAlert-icon': {
      color: theme.palette.success.contrastText,
    },
  },
  
  '&.MuiAlert-filledWarning': {
    backgroundColor: theme.palette.warning.main,
    '& .MuiAlert-icon': {
      color: theme.palette.warning.contrastText,
    },
  },
  
  '&.MuiAlert-filledError': {
    backgroundColor: theme.palette.error.main,
    '& .MuiAlert-icon': {
      color: theme.palette.error.contrastText,
    },
  },
}));

/**
 * Enhanced Alert Notification Component
 * 
 * Features:
 * - Top-right positioning by default
 * - Consistent styling across the application
 * - Configurable duration and positioning
 * - Enhanced visual design with shadows and proper spacing
 * - Accessibility compliant
 */
const AlertNotification: React.FC<AlertNotificationProps> = ({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 6000,
  position = 'top-right',
  showCloseButton = true,
}) => {
  const anchorOrigin = {
    'top-right': { vertical: 'top' as const, horizontal: 'right' as const },
    'top-center': { vertical: 'top' as const, horizontal: 'center' as const },
    'bottom-center': { vertical: 'bottom' as const, horizontal: 'center' as const },
  };

  return (
    <StyledSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin[position]}
      className={position}
    >
      <StyledAlert
        onClose={showCloseButton ? onClose : undefined}
        severity={severity}
        variant="filled"
      >
        {message}
      </StyledAlert>
    </StyledSnackbar>
  );
};

export default AlertNotification;
