import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Paper, Typography } from '@mui/material';
import type React from 'react';

const Education: React.FC = () => {
  return (
    <Paper sx={{ mx: 'auto', my: 4, p: 3, maxWidth: 600, overflow: 'hidden' }} elevation={3}>
      <Typography variant="h4" component="h3" sx={{ marginBottom: 2 }}>
        Education
      </Typography>
      <Timeline sx={{ [`& .MuiTimelineItem-root:before`]: { flex: 0, padding: 0 } }}>
        <TimelineItem sx={{ '&:before': { display: 'none' } }}>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="subtitle2" component="h2" sx={{ color: 'text.secondary' }}>
              April 2021 - March 2023
            </Typography>
            <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold', mt: 1 }}>
              Nara Institute of Science and Technology
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, ml: 3 }}>
              Master of Engineering, Information Science
            </Typography>
            <Box sx={{ mt: 1, ml: 3 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li>Conducted interdisciplinary research in NLP and HCI</li>
                <li>Contributed to an OSS project for NLP authorship detection</li>
                <li>Teaching Assistant for Social Computing class</li>
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
            <Typography variant="subtitle2" component="h2" sx={{ color: 'text.secondary' }}>
              April 2017 - March 2021
            </Typography>
            <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold', mt: 1 }}>
              Keio University
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, ml: 3 }}>
              Bachelor of Arts in Economics, Econometrics
            </Typography>
            <Box sx={{ mt: 1, ml: 3 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li>Studied International Macroeconomics and Econometrics</li>
              </ul>
            </Box>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Paper>
  );
};

export default Education;
