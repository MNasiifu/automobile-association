// AA Uganda Brand Colors and Design System
export const colors = {
  // Primary brand colors inspired by automotive industry and Uganda
  primary: {
    main: '#ffcb0a', // Bright yellow - automotive and vibrant branding
    light: '#ffd54f',
    dark: '#cc9900',
    contrastText: '#000000',
  },
  secondary: {
    main: '#02793f', // Forest green - natural and trust-building accent
    light: '#4caf50',
    dark: '#004d25',
    contrastText: '#ffffff',
  },
  // Neutral colors
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  // Functional colors
  success: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
  },
  warning: {
    main: '#FF9800',
    light: '#FFB74D',
    dark: '#F57C00',
  },
  error: {
    main: '#F44336',
    light: '#E57373',
    dark: '#D32F2F',
  },
  info: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
  },
  // Background colors
  background: {
    default: '#FFFFFF',
    paper: '#FAFAFA',
    section: '#F8F9FA',
  },
  // Text colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
  },
} as const;

export type ColorPalette = typeof colors;
