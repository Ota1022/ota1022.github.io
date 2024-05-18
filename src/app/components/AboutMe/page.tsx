import { Paper, Typography } from "@mui/material";
import React from "react";

const AboutMe: React.FC = () => {
  return (
    <Paper
      sx={{ mx: "auto", my: 4, p: 3, maxWidth: 600, overflow: "hidden" }}
      elevation={3}
    >
      <Typography variant="h4" component="h3" sx={{ marginBottom: 2 }}>
        About Me
      </Typography>
      <Typography variant="body1" component="div" sx={{ marginLeft: 2 }}>
        <ul style={{ paddingLeft: 20 }}>
          <li>
            <Typography variant="subtitle1">
              Application Engineer specializing in API integration with
              Salesforce and AWS, and enhancing backend APIs for enterprise
              systems.
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              Master&rsquo;s in Engineering, focused on enhancing user
              experiences in audio media through natural language processing and
              social media data analysis. My research improved radio listening
              experiences by optimizing playback speed using Twitter(X) data to
              enhance user satisfaction during limited listening times.
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              AWS-certified: Solutions Architect Professional, Security
              Specialty, and four additional certifications.
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              Aspiring to blend my passion for solving real-world problems with
              a keen interest in enhancing software products. 🔥
            </Typography>
          </li>
        </ul>
      </Typography>
    </Paper>
  );
};

export default AboutMe;
