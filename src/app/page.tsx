import Contact from '@/components/Contact';
import PageShell from '@/components/layout/PageShell';
import {
  AboutMe,
  Awards,
  Certifications,
  Education,
  Experience,
  Publications,
} from '@/components/portfolio';
import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

export default function Home() {
  return (
    <PageShell>
      <Box component="main">
        <Box
          sx={{
            pt: { xs: 4, sm: 5 },
            pb: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar
            alt="Itaru Ota"
            src="/profile.webp"
            sx={{
              width: { xs: 136, sm: 150 },
              height: { xs: 136, sm: 150 },
              mb: 3,
              border: 1,
              borderColor: 'divider',
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{
              mb: 0,
              fontSize: { xs: '2.75rem', sm: '3.25rem' },
              fontWeight: 700,
              letterSpacing: '-0.05em',
              wordSpacing: '0.14em',
            }}
          >
            Itaru OTA
          </Typography>
        </Box>

        <Contact />
        <AboutMe />
        <Experience />
        <Education />
        <Publications />
        <Awards />
        <Certifications />
      </Box>
    </PageShell>
  );
}
