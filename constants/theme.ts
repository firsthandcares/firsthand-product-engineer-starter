import { ThemeOptions, createTheme, responsiveFontSizes } from '@mui/material/styles';

const lightThemePalette = {
  mode: 'light',
  error: {
    main: 'rgba(194, 15, 36, 1)',
    contrastText: 'rgba(255,255,255,0.87)',
  },
  divider: 'rgba(0,0,0,0.2)',
};

const themeConfig = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontSize: 14,
    fontWeightRegular: 400,
    h1: {
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: '64px',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '40px',
      letterSpacing: '-0.02em',
    },
    h3: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '24px',
      letterSpacing: '-0.02em',
    },
    subtitle1: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '12px',
    },
    subtitle2: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      opacity: 0.5,
    },
    body1: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '16px',
    },
    body2: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
    },
  },
} as ThemeOptions;

export const lightTheme = responsiveFontSizes(
  createTheme(themeConfig as any, { palette: lightThemePalette }),
);
