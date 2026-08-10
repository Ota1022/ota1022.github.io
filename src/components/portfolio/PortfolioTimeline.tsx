import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface PortfolioTimelineProps {
  children: ReactNode;
}

interface PortfolioTimelineItemProps extends PortfolioTimelineProps {
  current?: boolean;
}

export function PortfolioTimeline({ children }: PortfolioTimelineProps) {
  return (
    <Box
      component="ol"
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
      }}
    >
      {children}
    </Box>
  );
}

export function PortfolioTimelineItem({
  children,
  current = false,
}: PortfolioTimelineItemProps) {
  return (
    <Box
      component="li"
      sx={{
        position: 'relative',
        pl: { xs: 4, sm: 4.5 },
        pb: 3,
        '&:last-of-type': { pb: 0 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 24,
          bottom: -8,
          left: 7,
          width: 2,
          bgcolor: 'divider',
        },
        '&:last-of-type::before': { display: 'none' },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 8,
          left: 0,
          width: 16,
          height: 16,
          boxSizing: 'border-box',
          border: 3,
          borderColor: current ? 'background.paper' : 'primary.main',
          borderRadius: '50%',
          bgcolor: current ? 'primary.main' : 'background.paper',
          boxShadow: current
            ? '0 0 0 2px var(--mui-palette-primary-main)'
            : 'none',
        },
      }}
    >
      {children}
    </Box>
  );
}
