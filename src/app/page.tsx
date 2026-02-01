'use client';

import AboutMe from '@/components/AboutMe';
import Contact from '@/components/Contact';
import Header from '@/components/layout/Header';
import { Box, Container, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import Awards from './components/Awards/page';
import Certifications from './components/Certifications/page';
import Education from './components/Education/page';
import Experience from './components/Experience/page';
import Publication from './components/Publication/page';

const Home = (): React.ReactNode => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Header />

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
          src="/profile.png"
          sx={{ width: 150, height: 150, mb: 4 }}
        />
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          {'Itaru OTA'}
        </Typography>
      </Box>

      <Contact />

      <AboutMe />

      <Experience />

      <Education />

      <Publication />

      <Awards />

      <Certifications />

      <Box component="footer" sx={{ my: 4, p: 2, textAlign: 'center' }}>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{ color: 'text.secondary' }}
        >
          © {new Date().getFullYear()} Itaru Ota. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
