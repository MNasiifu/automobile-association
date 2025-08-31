import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { colors } from './colors';

// Custom typography scale
const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'none' as const,
    letterSpacing: '0.02857em',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.4,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08333em',
  },
};

// Component customizations
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: '12px 24px',
        fontWeight: 500,
        textTransform: 'none' as const,
        boxShadow: 'none',
        whiteSpace: 'nowrap',
        minWidth: 'auto',
        '@media (max-width: 600px)': {
          padding: '8px 16px',
          fontSize: '0.8125rem',
        },
        '@media (min-width: 601px) and (max-width: 900px)': {
          padding: '10px 20px',
          fontSize: '0.85rem',
        },
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
      containedPrimary: {
        background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
        '&:hover': {
          background: `linear-gradient(135deg, ${colors.primary.dark} 0%, ${colors.primary.main} 100%)`,
        },
      },
       containedSecondary: {
        backgroundImage: 'none',
        background: colors.secondary.main,     // yellow bg
        color: colors.primary.main,            // green text
        fontWeight: 900,
        '&:hover': {
          background: colors.secondary.light,  // lighter yellow
          color: colors.primary.dark,          // darker green text
          boxShadow: '0 6px 18px rgba(2,79,49,0.25)',
        },
        '&:focus-visible': {
          outline: 'none',
          boxShadow: '0 0 0 3px rgba(2,79,49,0.25)',
        },
        '&.Mui-disabled': {
          background: '#00000014', // same feel as MUI disabled bg
          color: '#00000061',
          boxShadow: 'none',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        border: `1px solid ${colors.neutral[200]}`,
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 20,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: colors.background.default,
        color: colors.text.primary,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        '& .MuiToolbar-root': {
          minHeight: { xs: 56, sm: 64, md: 70 },
          padding: {
            xs: '0 16px',
            sm: '0 24px',
            md: '0 32px'
          },
        },
        '& .nav-link': {
          fontSize: {
            xs: '0.875rem',
            sm: '0.9375rem',
            md: '1rem'
          },
          padding: {
            xs: '4px 8px',
            sm: '6px 12px',
            md: '8px 16px'
          },
        },
        '& .slogan-text': {
          fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            md: '1rem'
          },
          fontStyle: 'italic',
          fontFamily: '"Playfair Display", serif',
          background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'fadeIn 1.5s ease-in-out',
          '@keyframes fadeIn': {
            '0%': {
              opacity: 0,
              transform: 'translateY(10px)'
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)'
            }
          },
          '@media (max-width: 900px)': {
            display: 'none'
          }
        }
      },
    },
  },
};

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
      contrastText: colors.primary.contrastText,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
      contrastText: colors.secondary.contrastText,
    },
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    success: colors.success,
    background: colors.background,
    text: colors.text,
    grey: colors.neutral,
  },
  typography,
  components,
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
};

export const theme = createTheme(themeOptions);

export default theme;
