import { createTheme } from '@mui/material/styles';

// MUIのパレットタイプを拡張
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
  },
});

export default theme;
