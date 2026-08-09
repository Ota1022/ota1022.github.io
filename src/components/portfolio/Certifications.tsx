import { Box, Link, Paper, Typography } from '@mui/material';

export default function Certifications() {
  return (
    <Paper
      component="section"
      aria-labelledby="certifications-title"
      sx={{ mx: 'auto', my: 4, p: 3, maxWidth: 600, overflow: 'hidden' }}
      elevation={3}
    >
      <Typography
        id="certifications-title"
        variant="h4"
        component="h2"
        sx={{ mb: 2 }}
      >
        Certifications
      </Typography>

      <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
        Selected AWS certifications
      </Typography>
      <Box component="ul" sx={{ mt: 0, mb: 2, pl: 3 }}>
        <li>AWS Certified Solutions Architect – Professional</li>
        <li>AWS Certified DevOps Engineer – Professional</li>
        <li>AWS Certified Security – Specialty</li>
        <li>AWS Certified Machine Learning – Specialty</li>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        I hold 12 AWS certifications.{' '}
        <Link
          href="https://www.credly.com/users/itaru-ota"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          View all verified badges on Credly
        </Link>
        .
      </Typography>

      <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
        Other credentials
      </Typography>
      <Box component="ul" sx={{ mt: 0, mb: 0, pl: 3 }}>
        <li>Google Cloud Associate Cloud Engineer</li>
        <li>Google Cloud Generative AI Leader</li>
        <li>IPA Applied Information Technology Engineer</li>
        <li>TOEIC Listening &amp; Reading: 865</li>
      </Box>
    </Paper>
  );
}
