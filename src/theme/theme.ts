import { createTheme } from '@mui/material/styles';

// Extend MUI palette type
declare module '@mui/material/styles' {
  interface Palette {
    customColor: Palette['primary'];
  }
  interface PaletteOptions {
    customColor?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    customColor: {
      main: '#ff9800',
    },
    // Background and color settings for dark mode
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    // Text color settings for dark mode
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    // Light mode settings will be overridden in ThemeContext
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 0.3s, color 0.3s',
        },
      },
    },
    // Typography settings for dark mode
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    // Icon button settings for dark mode
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
  },
});

export default theme;
