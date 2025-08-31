export const colors = {
  primary: {
    main: '#024f31',
    light: '#679583',
    dark: '#013722',
    contrastText: '#ffffff',
  },

  secondary: {
    main: '#f4d616',
    light: '#f8e877',
    dark: '#a89b0e',
    contrastText: '#000000',
  },

  neutral: {
    50:  '#FAFAFA',
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

  success: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#FF9800',
    light: '#FFB74D',
    dark: '#F57C00',
    contrastText: '#000000',
  },
  error: {
    main: '#D32F2F',
    light: '#EF5350',
    dark: '#C62828',
    contrastText: '#ffffff',
  },
  info: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
    contrastText: '#ffffff',
  },

  background: {
    default: '#FFFFFF',
    paper: '#FAFAFA',
    section: '#F8F9FA',
  },

  text: {
    primary: '#212121',
    secondary: '#013722',
    disabled: '#BDBDBD',
    inverse: '#ffffff',
  },

  overlays: {
    green4:  'rgba(2, 79, 49, 0.04)',
    green8:  'rgba(2, 79, 49, 0.08)',
    green12: 'rgba(2, 79, 49, 0.12)',
    green16: 'rgba(2, 79, 49, 0.16)',
    yellow8: 'rgba(244, 214, 22, 0.08)',
    yellow12:'rgba(244, 214, 22, 0.12)',
    yellow16:'rgba(244, 214, 22, 0.16)',
    black12: 'rgba(0, 0, 0, 0.12)',
    white12: 'rgba(255, 255, 255, 0.12)',
  },

  divider: 'rgba(0, 0, 0, 0.08)',
} as const;

export type ColorPalette = typeof colors;
