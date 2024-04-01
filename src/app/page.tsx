"use client";

import { ColorModeContext } from "@/contexts/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box, Container, Paper, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import React from "react";

const Home: React.FC = () => {
  const renderYellowLine = (): JSX.Element => (
    <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
      <Box sx={{ height: "2px", width: "50%", bgcolor: "yellow" }}></Box>
    </Box>
  );

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
          bgcolor: "transparent",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
        }}
      >
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>

      <Box
        sx={{
          backgroundColor: "yellow",
          padding: 2,
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        <Typography
          variant="h6"
          component="p"
          sx={{ fontWeight: "bold", color: "black" }}
        >
          This site is currently under construction. Stay tuned for updates!
        </Typography>
      </Box>

      <Box sx={{ my: 2, textAlign: "center" }}>
        <Typography variant="h3" component="h2" gutterBottom>
          {`Welcome to Itaru Ota's Portfolio! 👋`}
        </Typography>

        {/* <Typography variant="subtitle1">
                  Under constraction
                </Typography> */}
      </Box>

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
                Aspiring to blend my passion for solving real-world problems
                with a keen interest in enhancing SaaS products🔥
              </Typography>
            </li>
          </ul>
        </Typography>
      </Paper>

      {renderYellowLine()}

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
          <Typography
            variant="subtitle1"
            sx={{ marginTop: 2, marginBottom: 1 }}
          >
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

      {renderYellowLine()}

      <Paper sx={{ mx: "auto", my: 4, p: 2, maxWidth: 600 }} elevation={2}>
        <Typography variant="h4" component="h3">
          Experience
        </Typography>
        {/* <Typography variant="body1">
                  List of relevant work experience...
                </Typography> */}
      </Paper>

      {renderYellowLine()}

      <Paper
        sx={{ mx: "auto", my: 4, p: 3, maxWidth: 600, overflow: "hidden" }}
        elevation={3}
      >

      </Paper>

      {renderYellowLine()}

      <Paper sx={{ mx: "auto", my: 4, p: 2, maxWidth: 600 }} elevation={2}>
        <Typography variant="h4" component="h3">
          Publication
        </Typography>
        {/* Add your publication content here */}
      </Paper>

      {renderYellowLine()}

      <Paper sx={{ mx: "auto", my: 4, p: 2, maxWidth: 600 }} elevation={2}>
        <Typography variant="h4" component="h3">
          Awards
        </Typography>
        {/* Add your awards content here */}
      </Paper>

      {renderYellowLine()}

      <Paper sx={{ mx: "auto", my: 4, p: 2, maxWidth: 600 }} elevation={2}>
        <Typography variant="h4" component="h3">
          Certifications
        </Typography>
        {/* Add your certifications content here */}
      </Paper>

      {renderYellowLine()}

      <Paper sx={{ mx: "auto", my: 4, p: 2, maxWidth: 600 }} elevation={2}>
        <Typography variant="h4" component="h3">
          Contact Information
        </Typography>
        {/* Add your contact information here */}
      </Paper>

      <Box component="footer" sx={{ my: 4, p: 2, textAlign: "center" }}>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{ color: "white" }}
        >
          © 2024 Itaru Ota. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
