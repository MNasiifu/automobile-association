import type { ButtonProps as MuiButtonProps } from '@mui/material';

export interface NavButtonProps extends Omit<MuiButtonProps, 'component' | 'color'> {
  component?: React.ElementType;
  to?: string;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}