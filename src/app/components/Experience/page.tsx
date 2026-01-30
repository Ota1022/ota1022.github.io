import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Paper, Typography } from '@mui/material';
import type { FC } from 'react';

const Experience: FC = () => {
  return (
    <Paper
      sx={{ mx: 'auto', my: 4, p: 3, maxWidth: 600, overflow: 'hidden' }}
      elevation={3}
    >
      <Typography variant="h4" component="h3" sx={{ marginBottom: 2 }}>
        Experience
      </Typography>
      <Timeline
        sx={{ '& .MuiTimelineItem-root:before': { flex: 0, padding: 0 } }}
      >
        <TimelineItem sx={{ '&:before': { display: 'none' } }}>
          <TimelineSeparator>
            <TimelineDot
              sx={{ bgcolor: 'customColor.main' }}
              variant="outlined"
            />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography
              variant="subtitle2"
              component="h2"
              sx={{ color: 'text.secondary' }}
            >
              January 2025 - Present
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              sx={{ fontWeight: 'bold', mt: 1 }}
            >
              FullStack Engineer
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', ml: 1 }}
            >
              Full-time
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, ml: 3 }}>
              Python, TypeScript, Next.js, Terraform, Google Cloud, AWS
            </Typography>
            <Box sx={{ mt: 1, ml: 3 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                  Own features end-to-end from design through implementation
                  to release in a product-driven team.
                </li>
                <li>
                  Primarily designing and building APIs and data models,
                  along with infrastructure work including Terraform and
                  CI/CD on AWS.
                </li>
              </ul>
            </Box>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem sx={{ '&:before': { display: 'none' } }}>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography
              variant="subtitle2"
              component="h2"
              sx={{ color: 'text.secondary' }}
            >
              April 2023 - December 2024
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              sx={{ fontWeight: 'bold', mt: 1 }}
            >
              Application Engineer
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', ml: 1 }}
            >
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
          </TimelineContent>
        </TimelineItem>

        <TimelineItem sx={{ '&:before': { display: 'none' } }}>
          <TimelineSeparator>
            <TimelineDot color="secondary" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography
              variant="subtitle2"
              component="h2"
              sx={{ color: 'text.secondary' }}
            >
              October 2021 - March 2023
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              sx={{ fontWeight: 'bold', mt: 1 }}
            >
              Software Engineer
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', ml: 1 }}
            >
              Part-time
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, ml: 3 }}>
              Python, PyTorch, Pandas
            </Typography>
            <Box sx={{ mt: 1, ml: 3 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                  Built OCR tools using image processing and NLP to convert
                  PDFs into editable documents.
                </li>
                <li>
                  Developed and optimized deep learning models for anomaly
                  detection on factory production lines.
                </li>
              </ul>
            </Box>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Paper>
  );
};

export default Experience;
