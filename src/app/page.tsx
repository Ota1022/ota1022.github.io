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

      <Paper sx={{ mx: "auto", my: 4, p: 2, maxWidth: 600 }} elevation={2}>
        <Typography variant="h4" component="h3">
          About Me
        </Typography>
        {/* <Typography variant="body1">
                  Detailing my journey in the tech industry...
                </Typography> */}
      </Paper>

      {renderYellowLine()}

      <Paper sx={{ mx: "auto", my: 4, p: 2, maxWidth: 600 }} elevation={2}>
        <Typography variant="h4" component="h3">
          Technical Skills
        </Typography>
        {/* <Typography variant="body1">
                  List or visual representation of skills...
                </Typography> */}
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

      <Paper sx={{ mx: "auto", my: 4, p: 2, maxWidth: 600 }} elevation={2}>
        <Typography variant="h4" component="h3">
          Education
        </Typography>
        {/* <Typography variant="body1">
                  Academic background details...
                </Typography> */}
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
