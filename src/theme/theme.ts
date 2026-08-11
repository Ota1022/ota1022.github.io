import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#4d4b85',
          contrastText: '#f8f8fc',
        },
        secondary: {
          main: '#4d4b85',
        },
        background: {
          default: '#f3f4f7',
          paper: '#fafafd',
        },
        text: {
          primary: '#1b1c22',
          secondary: '#5d606b',
        },
        divider: 'rgba(34, 36, 46, 0.15)',
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#aaa7e8',
          contrastText: '#171820',
        },
        secondary: {
          main: '#aaa7e8',
        },
        background: {
          default: '#111218',
          paper: '#191a21',
        },
        text: {
          primary: '#f0f1f5',
          secondary: '#aaaeba',
        },
        divider: 'rgba(226, 228, 238, 0.16)',
      },
    },
  },
  typography: {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.045em',
      lineHeight: 1.08,
    },
    h2: {
      fontWeight: 680,
      letterSpacing: '-0.035em',
      lineHeight: 1.12,
    },
    h3: {
      fontWeight: 680,
      letterSpacing: '-0.035em',
      lineHeight: 1.14,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 670,
      letterSpacing: '-0.03em',
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 650,
      letterSpacing: '-0.025em',
      lineHeight: 1.25,
    },
    h6: {
      fontWeight: 650,
      letterSpacing: '-0.015em',
      lineHeight: 1.3,
    },
    body1: {
      lineHeight: 1.75,
    },
    body2: {
      lineHeight: 1.65,
    },
    subtitle2: {
      fontFamily: 'var(--font-inconsolata), ui-monospace, monospace',
      fontSize: '0.8125rem',
      fontWeight: 400,
      letterSpacing: '0.025em',
      lineHeight: 1.5,
    },
    caption: {
      fontFamily: 'var(--font-inconsolata), ui-monospace, monospace',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid var(--mui-palette-divider)',
          boxShadow: 'none',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          '&:last-child': {
            paddingBottom: 24,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecorationThickness: '1px',
          textUnderlineOffset: '0.18em',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 500,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition:
            'background-color 160ms ease, color 160ms ease, transform 160ms ease',
          '&:active': {
            transform: 'translateY(1px)',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          letterSpacing: '-0.005em',
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
