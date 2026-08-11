import { Box, Link, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        mt: { xs: 5, sm: 6 },
        mb: 2,
        px: 0,
        pt: 3,
        pb: 2,
        borderTop: 1,
        borderColor: 'divider',
        color: 'text.secondary',
      }}
    >
      <Typography variant="caption">
        © {new Date().getFullYear()} Itaru OTA
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link href="/blog" color="inherit" underline="hover" variant="caption">
          Blog
        </Link>
        <Link
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          underline="hover"
          variant="caption"
        >
          CV
        </Link>
      </Box>
    </Box>
  );
}
