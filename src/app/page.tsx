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
            my: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar
            alt="Itaru Ota"
            src="/profile.webp"
            sx={{ width: 150, height: 150, mb: 4 }}
          />
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
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
