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
              Application Engineer integrating API with Salesforce and AWS.
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              Master&rsquo;s in Engineering, focused on computational social
              science and machine learning.
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              AWS-certified: Solutions Architect Professional and Security
              Specialty.
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              Aspiring to blend my passion for solving real-world problems with
              a keen interest in enhancing SaaS products🔥
            </Typography>
          </li>
        </ul>
      </Typography>
    </Paper>
  );
};

export default AboutMe;
