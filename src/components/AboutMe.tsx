'use client';

import { Paper, Typography } from '@mui/material';

const AboutMe = (): React.ReactNode => {
  return (
    <Paper sx={{ mx: 'auto', my: 4, p: 3, maxWidth: 600, overflow: 'hidden' }} elevation={3}>
      <Typography variant="h4" component="h3" sx={{ marginBottom: 2 }}>
        About Me
      </Typography>
      <Typography variant="body1" component="div" sx={{ marginLeft: 2 }}>
        <ul style={{ paddingLeft: 20 }}>
          <li>
            <Typography variant="subtitle1">
              A Software Engineer with 3+ years of experience in developing.
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              Master&rsquo;s in Engineering, focused on enhancing user experiences in audio media
              through natural language processing and social media data analysis.
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              AWS-certified: Solutions Architect Professional, Security Specialty, etc.
            </Typography>
          </li>
        </ul>
      </Typography>
    </Paper>
  );
};

export default AboutMe;
