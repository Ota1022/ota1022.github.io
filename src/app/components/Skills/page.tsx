import { Paper, Typography } from "@mui/material";
import React from "react";

const Skills: React.FC = () => {
  return (
    <Paper
      sx={{ mx: "auto", my: 4, p: 3, maxWidth: 600, overflow: "hidden" }}
      elevation={3}
    >
      <Typography variant="h4" component="h3" sx={{ marginBottom: 2 }}>
        Technical Skills
      </Typography>
      <Typography variant="body1" component="div" sx={{ marginLeft: 2 }}>
        <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
          Industry Knowledge:
        </Typography>
        <ul style={{ paddingLeft: 20 }}>
          <li>Natural Language Processing (NLP)</li>
          <li>Econometrics</li>
          <li>Time Series Analysis</li>
          <li>Bayesian Statistics</li>
        </ul>
        <Typography variant="subtitle1" sx={{ marginTop: 2, marginBottom: 1 }}>
          Tools & Technologies:
        </Typography>
        <ul style={{ paddingLeft: 20 }}>
          <li>Python</li>
          <li>TypeScript</li>
          <li>Java</li>
          <li>Docker</li>
          <li>SQL</li>
          <li>Git</li>
          <li>AWS</li>
        </ul>
      </Typography>
    </Paper>
  );
};

export default Skills;
