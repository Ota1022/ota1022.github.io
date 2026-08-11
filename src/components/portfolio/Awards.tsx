import { Link, Paper, Typography } from '@mui/material';

export default function Awards() {
  return (
    <Paper
      component="section"
      aria-labelledby="awards-title"
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
        id="awards-title"
        variant="h4"
        component="h2"
        sx={{ marginBottom: 2 }}
      >
        Awards
      </Typography>
      <Typography variant="body1" component="div" sx={{ marginLeft: 2 }}>
        <ul>
          <li>
            2026 Japan AWS Jr. Champion, AWS{' '}
            <Link
              href="https://aws.amazon.com/jp/blogs/psa/2026-japan-aws-jr-champions/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="2026 Japan AWS Jr. Champions announcement"
            >
              [URL]
            </Link>
          </li>
          <li>
            Student Presentation Award, DEIM2022{' '}
            <Link
              href="https://event.dbsj.org/deim2022/post/awards.html"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DEIM2022 Student Presentation Award details"
            >
              [URL]
            </Link>
          </li>
          <li>
            Data Broad Award, imedia2021{' '}
            <Link
              href="https://sites.google.com/view/imedia-ws/imedia2021"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="imedia2021 Data Broad Award details"
            >
              [URL]
            </Link>
          </li>
          <li>
            1st Prize, GEIOT2021 in NAIST{' '}
            <Link
              href="https://x.com/NAIST_MAIN/status/1429671012770009093?s=20&t=TW6BTHQ4EXVxJPVso1mbLg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GEIOT2021 in NAIST 1st Prize details"
            >
              [URL]
            </Link>
          </li>
        </ul>
      </Typography>
    </Paper>
  );
}
