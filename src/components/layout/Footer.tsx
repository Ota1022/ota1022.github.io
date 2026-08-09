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
        my: 4,
        px: { xs: 2, sm: 3 },
        py: 2,
        color: 'text.secondary',
      }}
    >
      <Typography variant="caption">
        © {new Date().getFullYear()} Itaru OTA
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link href="/blog" color="inherit" underline="hover" variant="caption">
          Writing &amp; Talks
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
