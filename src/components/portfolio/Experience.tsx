import { CONTENT_MAX_WIDTH } from '@/theme/layout';
import { Box, Paper, Typography } from '@mui/material';
import { PortfolioTimeline, PortfolioTimelineItem } from './PortfolioTimeline';

export default function Experience() {
  return (
    <Paper
      component="section"
      aria-labelledby="experience-title"
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
        id="experience-title"
        variant="h4"
        component="h2"
        sx={{ marginBottom: 2 }}
      >
        Experience
      </Typography>
      <PortfolioTimeline>
        <PortfolioTimelineItem current>
          <Box sx={{ py: 1 }}>
            <Typography
              variant="subtitle2"
              component="p"
              sx={{ color: 'text.secondary' }}
            >
              January 2025 - Present
            </Typography>
            <Typography
              variant="h6"
              component="h3"
              sx={{ fontWeight: 'bold', mt: 1 }}
            >
              Full-stack Engineer
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
              Full-time
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, ml: 3 }}>
              Python, TypeScript, Next.js, Terraform, Google Cloud, AWS
            </Typography>
            <Box sx={{ mt: 1, ml: 3 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                  Own features end-to-end from design through implementation to
                  release in a product-driven team.
                </li>
                <li>
                  Design and build APIs and data models, and maintain cloud
                  infrastructure and CI/CD with Terraform and AWS.
                </li>
              </ul>
            </Box>
          </Box>
        </PortfolioTimelineItem>

        <PortfolioTimelineItem>
          <Box sx={{ py: 1 }}>
            <Typography
              variant="subtitle2"
              component="p"
              sx={{ color: 'text.secondary' }}
            >
              April 2023 - December 2024
            </Typography>
            <Typography
              variant="h6"
              component="h3"
              sx={{ fontWeight: 'bold', mt: 1 }}
            >
              Application Engineer
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
              Full-time
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, ml: 3 }}>
              Java, Spring, Python, PyTorch, Pandas, AWS, Azure, Salesforce
            </Typography>
            <Box sx={{ mt: 1, ml: 3 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                  Built and integrated core business systems across AWS and
                  Salesforce for facility management and leasing domains.
                </li>
                <li>
                  Developed AI-powered RAG systems using Python and Azure.
                </li>
              </ul>
            </Box>
          </Box>
        </PortfolioTimelineItem>

        <PortfolioTimelineItem>
          <Box sx={{ py: 1 }}>
            <Typography
              variant="subtitle2"
              component="p"
              sx={{ color: 'text.secondary' }}
            >
              October 2021 - March 2023
            </Typography>
            <Typography
              variant="h6"
              component="h3"
              sx={{ fontWeight: 'bold', mt: 1 }}
            >
              Software Engineer
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
              Part-time
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, ml: 3 }}>
              Python, PyTorch, Pandas
            </Typography>
            <Box sx={{ mt: 1, ml: 3 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                  Built OCR tools using image processing and NLP to convert PDFs
                  into editable documents.
                </li>
                <li>
                  Developed and optimized deep learning models for anomaly
                  detection on factory production lines.
                </li>
              </ul>
            </Box>
          </Box>
        </PortfolioTimelineItem>
      </PortfolioTimeline>
    </Paper>
  );
}
