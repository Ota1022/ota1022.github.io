'use client';

import CredlyIcon from '@/components/icons/CredlyIcon';
import SpeakerDeckIcon from '@/components/icons/SpeakerDeckIcon';
import ZennIcon from '@/components/icons/ZennIcon';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import { Box, IconButton, Tooltip } from '@mui/material';
import type { ReactNode } from 'react';

interface ServiceLink {
  label: string;
  href: string;
  icon: ReactNode;
}

const services: ServiceLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/itaru-ota/',
    icon: <LinkedInIcon />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Ota1022',
    icon: <GitHubIcon />,
  },
  {
    label: 'X',
    href: 'https://x.com/iorandd',
    icon: <XIcon />,
  },
  {
    label: 'Speaker Deck',
    href: 'https://speakerdeck.com/ota1022',
    icon: <SpeakerDeckIcon />,
  },
  {
    label: 'Zenn (Japanese)',
    href: 'https://zenn.dev/iorandd',
    icon: <ZennIcon />,
  },
  {
    label: 'Credly',
    href: 'https://www.credly.com/users/itaru-ota',
    icon: <CredlyIcon />,
  },
];

const Contact = (): ReactNode => {
  return (
    <Box
      component="nav"
      aria-label="External profiles"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        gap: { xs: 0.75, sm: 1.5 },
        width: '100%',
        mb: { xs: 1, sm: 2 },
      }}
    >
      {services.map(({ label, href, icon }) => (
        <Tooltip key={label} title={label} arrow>
          <IconButton
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${label} profile in a new tab`}
            color="inherit"
            sx={{
              width: { xs: 42, sm: 44 },
              height: { xs: 42, sm: 44 },
              p: 0.75,
              color: 'text.secondary',
              borderRadius: 1,
              '& .MuiSvgIcon-root': {
                width: { xs: 27, sm: 29 },
                height: { xs: 27, sm: 29 },
                fontSize: { xs: 27, sm: 29 },
              },
              '&:hover': {
                color: 'primary.main',
                bgcolor: 'action.hover',
                transform: 'translateY(-2px)',
              },
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 3,
              },
            }}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default Contact;
