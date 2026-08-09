import { Paper, Typography } from '@mui/material';

export default function AboutMe() {
  return (
    <Paper
      component="section"
      aria-labelledby="about-me-title"
      sx={{ mx: 'auto', my: 4, p: 3, maxWidth: 600, overflow: 'hidden' }}
      elevation={3}
    >
      <Typography
        id="about-me-title"
        variant="h4"
        component="h2"
        sx={{ mb: 2 }}
      >
        About Me
      </Typography>
      <Typography variant="body1" paragraph sx={{ lineHeight: 1.75 }}>
        I am a full-stack software engineer focused on cloud-native product
        development and AI-enabled systems. I work across APIs, data models,
        infrastructure, and delivery using TypeScript, Python, Terraform, AWS,
        and Google Cloud.
      </Typography>
      <Typography variant="body1" sx={{ lineHeight: 1.75 }}>
        My background combines product engineering with NLP research. In 2026,
        AWS named me a Japan AWS Jr. Champion for my technical and community
        contributions.
      </Typography>
    </Paper>
  );
}
