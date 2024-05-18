import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const Experience: React.FC = () => {
  return (
    <Paper
      sx={{ mx: "auto", my: 4, p: 3, maxWidth: 600, overflow: "hidden" }}
      elevation={3}
    >
      <Typography variant="h4" component="h3" sx={{ marginBottom: 2 }}>
        Experience
      </Typography>
      <Timeline
        sx={{ [`& .MuiTimelineItem-root:before`]: { flex: 0, padding: 0 } }}
      >
        <TimelineItem sx={{ "&:before": { display: "none" } }}>
          <TimelineSeparator>
            <TimelineDot sx={{ bgcolor: 'customColor.main' }} variant="outlined" />
            <TimelineConnector sx={{ bgcolor: 'customColor.main' }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography
              variant="subtitle2"
              component="h2"
              sx={{ color: "customColor.main" }}
            >
              August 2023 – Present
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              sx={{ fontWeight: "bold", mt: 1 }}
            >
              Individual Development
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, ml: 3 }}>
              Technologies Used: TypeScript (Next.js, NestJS, Prisma), Git, Docker, MySQL, Redis
            </Typography>
            <Box sx={{ mt: 1, ml: 3 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                  Defined requirements, designed, and implemented the backend for a web browser application of a city latitude and longitude guessing board game
                </li>
              </ul>
            </Box>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem sx={{ "&:before": { display: "none" } }}>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography
              variant="subtitle2"
              component="h2"
              sx={{ color: "text.secondary" }}
            >
              April 2023 – Present
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              sx={{ fontWeight: "bold", mt: 1 }}
            >
              Application Engineer (Full-time)
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, ml: 3 }}>
              Technologies Used: AWS, Salesforce, Java (Spring), Python (PyTorch, Pandas)
            </Typography>
            <Box sx={{ mt: 1, ml: 3 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                  Designed and implemented API integration between Salesforce and AWS for an internal business reporting system renewal project, including front-end modifications
                </li>
                <li>
                  Designed and implemented APIs for an API expansion project of a core business system
                </li>
                <li>
                  Designed and implemented a stock price prediction model using natural language processing for an internal research and development project
                </li>
              </ul>
            </Box>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem sx={{ "&:before": { display: "none" } }}>
          <TimelineSeparator>
            <TimelineDot color="secondary" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography
              variant="subtitle2"
              component="h2"
              sx={{ color: "text.secondary" }}
            >
              October 2021 – March 2023 (1 year 6 months)
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              sx={{ fontWeight: "bold", mt: 1 }}
            >
              Software Engineer (Part-time)
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, ml: 3 }}>
              Technologies Used: Python (PyTorch, Pandas), Git, Docker, SQLite
            </Typography>
            <Box sx={{ mt: 1, ml: 3 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                  Implemented feature enhancements for document OCR software
                </li>
                <li>
                  Improved model accuracy for image detection software on factory lines
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
