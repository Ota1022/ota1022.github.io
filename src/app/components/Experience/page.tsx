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
            <TimelineDot
              sx={{ bgcolor: "customColor.main" }}
              variant="outlined"
            />
            <TimelineConnector sx={{ bgcolor: "customColor.main" }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography
              variant="subtitle2"
              component="h2"
              sx={{ color: "customColor.main" }}
            >
              January 2025 - Present
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              sx={{ fontWeight: "bold", mt: 1 }}
            >
              FullStack Engineer (Full-time)
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, ml: 3 }}>
              Python, TypeScript (Next.js), Google Cloud, AWS
            </Typography>
            <Box sx={{ mt: 1, ml: 3 }}>
              <ul style={{ paddingLeft: 20 }}>
                {/* <li>
                </li> */}
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
              April 2023 - December 2024
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              sx={{ fontWeight: "bold", mt: 1 }}
            >
              Application Engineer (Full-time)
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, ml: 3 }}>
              Java (Spring), Python (PyTorch, Pandas), AWS, Azure, Salesforce
            </Typography>
            <Box sx={{ mt: 1, ml: 3 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                Experienced Application Engineer with expertise in integrating cloud-based platforms and developing AI-powered RAG (Retrieval Augmented Generation) systems.
                </li>
                <li>
                Developed core business systems for facility management and leasing companies.
                </li>
                <li>
                Integrated systems with AWS, Azure, Google Cloud, and Salesforce to improve efficiency and scalability.
                </li>
                <li>
                Held the role of Assistant Manager, ensuring timely project delivery and team collaboration.
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
              October 2021 - March 2023
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              sx={{ fontWeight: "bold", mt: 1 }}
            >
              Software Engineer (Part-time)
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, ml: 3 }}>
              Python (PyTorch, Pandas)
            </Typography>
            <Box sx={{ mt: 1, ml: 3 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                Experienced Software Engineer with expertise in developing AI-powered OCR tools and optimizing deep learning models for industrial applications.
                </li>
                <li>
                Developed OCR tools using image processing and NLP to convert PDFs into editable documents, enhancing data extraction and digitization.
                </li>
                <li>
                Optimized deep learning models for anomaly detection in factory lines, reducing costs and boosting productivity.
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
