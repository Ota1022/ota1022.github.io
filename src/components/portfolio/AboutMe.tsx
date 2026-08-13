import { CONTENT_MAX_WIDTH } from '@/theme/layout';
import { Paper, Typography } from '@mui/material';

export default function AboutMe() {
  return (
    <Paper
      component="section"
      aria-labelledby="about-me-title"
      elevation={0}
      sx={{
        mx: 'auto',
        my: { xs: 3, sm: 4 },
        px: { xs: 0.5, sm: 1 },
        py: { xs: 3, sm: 4 },
        maxWidth: CONTENT_MAX_WIDTH,
        overflow: 'hidden',
        bgcolor: 'transparent',
        border: 0,
        borderTop: 1,
        borderColor: 'divider',
        borderRadius: 0,
      }}
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
