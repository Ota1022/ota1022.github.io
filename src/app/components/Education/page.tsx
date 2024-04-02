import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Paper, Typography } from "@mui/material";
import React from "react";

const Education: React.FC = () => {
  return (
    <Paper
      sx={{ mx: "auto", my: 4, p: 3, maxWidth: 600, overflow: "hidden" }}
      elevation={3}
    >
      <Typography
        variant="h4"
        component="h3"
        sx={{ marginBottom: 2, textAlign: "center" }}
      >
        Education
      </Typography>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="h1" sx={{ fontWeight: "bold" }}>
              Nara Institute of Science and Technology
            </Typography>
            <Typography variant="body2">
              Master of Engineering, Information Science and Engineering (2021 -
              2023)
            </Typography>
            <Typography variant="body2">
              Interdisciplinary research in NLP, HCI, and Computational Social
              Science.
            </Typography>
            <Typography variant="body2">
              Contributed to an OSS project for NLP authorship detection.
            </Typography>
            <Typography variant="body2">
              Teaching Assistant for Social Computing class.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="h1" sx={{ fontWeight: "bold" }}>
              Keio University
            </Typography>
            <Typography variant="body2">
              Bachelor of Arts in Economics, Econometrics (2017 - 2021)
            </Typography>
            <Typography variant="body2">
              Participated in seminar on International Macroeconomics and
              Econometrics.
            </Typography>
            <Typography variant="body2">
              Studied Descriptive, Inferential, and Bayesian Statistics.
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Paper>
  );
};

export default Education;
