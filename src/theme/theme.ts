import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const sharedPalette = {
  primary: {
    main: '#4f9cf9',
  },
  secondary: {
    main: '#e85d8e',
  },
};

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        ...sharedPalette,
        background: {
          default: '#f5f5f5',
          paper: '#ffffff',
        },
      },
    },
    dark: {
      palette: {
        ...sharedPalette,
        background: {
          default: '#121212',
          paper: '#2f2f2f',
        },
      },
    },
  },
  typography: {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 0.2s ease, color 0.2s ease',
        },
        '@media (prefers-reduced-motion: reduce)': {
          '*': {
            scrollBehavior: 'auto !important',
            transitionDuration: '0.01ms !important',
            animationDuration: '0.01ms !important',
          },
        },
      },
    },
  },
});

export default theme;
