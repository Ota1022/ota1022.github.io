import { CONTENT_MAX_WIDTH } from '@/theme/layout';
import { Link, Paper, Typography } from '@mui/material';

export default function Publications() {
  return (
    <Paper
      component="section"
      aria-labelledby="publications-title"
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
        id="publications-title"
        variant="h4"
        component="h2"
        sx={{ marginBottom: 2 }}
      >
        Publications
      </Typography>
      <Typography variant="body1" component="div" sx={{ marginLeft: 2 }}>
        <ul>
          <li>
            Improving the Experience of Listening Broadcast Programs Using
            Social Media Data (Japanese), Master&rsquo;s thesis{' '}
            <Link
              href="https://library.naist.jp/opac/en/book/106760"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Library record for master's thesis"
            >
              [Record]
            </Link>
          </li>
          <li>
            Analysis of the &lsquo;Uniformity Rate&rsquo; of Tweets on Broadcast
            Content (Japanese), The 15th Forum on Data Engineering and
            Information Management (DEIM2023), 4a-3-2, 2023 (2023/3/5, Gifu,
            Japan){' '}
            <Link
              href="https://proceedings-of-deim.github.io/DEIM2023/4a-3-2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PDF for DEIM2023 paper on tweet uniformity rate on broadcast content"
            >
              [PDF]
            </Link>
          </li>
          <li>
            A Proposal for a Radio Program Compression Method Using Twitter
            (Japanese), The 14th Forum on Data Engineering and Information
            Management (DEIM2022), C21-2, 2022 (2022/02/28, Online){' '}
            <Link
              href="https://proceedings-of-deim.github.io/DEIM2022/papers/C21-2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PDF for DEIM2022 paper on radio program compression using Twitter"
            >
              [PDF]
            </Link>
          </li>
        </ul>
      </Typography>
    </Paper>
  );
}
