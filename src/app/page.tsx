"use client";

import { ColorModeContext } from "@/contexts/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box, Container, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Head from 'next/head';
import React from "react";
import AboutMe from "./components/AboutMe/page";
import Awards from "./components/Awards/page";
import Certifications from "./components/Certifications/page";
import Contact from "./components/Contact/page";
import Education from "./components/Education/page";
import Experience from "./components/Experience/page";
import Publication from "./components/Publication/page";
import Skills from "./components/Skills/page";

const Home: React.FC = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Head>
        <title>Itaru OTA</title>
      </Head>

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

      {/* <Box
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
      </Box> */}

      <Box
        sx={{
          my: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          alt="Itaru Ota"
          src="/profile.png"
          sx={{ width: 150, height: 150, mb: 4 }}
        />
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          {`Itaru OTA`}
        </Typography>
      </Box>

      <Contact />

      <AboutMe />

      <Skills />

      <Experience />

      <Education />

      <Publication />

      <Awards />

      <Certifications />

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
