import { Box, Link, Paper, Typography } from '@mui/material';

export default function Certifications() {
  return (
    <Paper
      component="section"
      aria-labelledby="certifications-title"
      elevation={0}
      sx={{
        mx: 'auto',
        my: { xs: 3, sm: 4 },
        px: { xs: 0.5, sm: 1 },
        py: { xs: 3, sm: 4 },
        maxWidth: 600,
        overflow: 'hidden',
        bgcolor: 'transparent',
        border: 0,
        borderTop: 1,
        borderColor: 'divider',
        borderRadius: 0,
      }}
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
        AWS certifications
      </Typography>
      <Box component="ul" sx={{ mt: 0, mb: 2, pl: 3 }}>
        <li>AWS Certified Solutions Architect – Professional</li>
        <li>AWS Certified DevOps Engineer – Professional</li>
        <li>AWS Certified Security – Specialty</li>
        <li>AWS Certified Machine Learning – Specialty</li>
        <li>AWS Certified Data Analytics – Specialty</li>
        <li>AWS Certified Solutions Architect – Associate</li>
        <li>AWS Certified Developer – Associate</li>
        <li>AWS Certified SysOps Administrator – Associate</li>
        <li>AWS Certified Data Engineer – Associate</li>
        <li>AWS Certified Machine Learning Engineer – Associate</li>
        <li>AWS Certified AI Practitioner</li>
        <li>AWS Certified Cloud Practitioner</li>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        <Link
          href="https://www.credly.com/users/itaru-ota/badges/credly"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          View verified badges on Credly
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
