import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from '@mui/icons-material/X';
import { Box, SvgIcon } from "@mui/material";
import Link from "@mui/material/Link";
import React from "react";

const SpeakerDeckIcon: React.FC = (props) => (
  <SvgIcon {...props} viewBox="0 3 30 30">
    <path d="M 8 8 C 5.243 8 3 10.243 3 13 C 3 15.757 5.243 18 8 18 L 14 18 C 14.551 18 15 18.448 15 19 C 15 19.552 14.551 20 14 20 L 5 20 C 3.896 20 3 20.896 3 22 C 3 23.104 3.896 24 5 24 L 14 24 C 16.757 24 19 21.757 19 19 C 19 16.243 16.757 14 14 14 L 8 14 C 7.449 14 7 13.552 7 13 C 7 12.448 7.449 12 8 12 L 15 12 C 16.104 12 17 11.104 17 10 C 17 8.896 16.104 8 15 8 L 8 8 z M 18.445312 8 C 18.789313 8.59 19 9.268 19 10 C 19 10.734 18.783453 11.409 18.439453 12 L 24 12 C 24.552 12 25 12.448 25 13 L 25 19 C 25 19.552 24.552 20 24 20 L 20.919922 20 C 20.695922 21.556 19.963672 22.949 18.888672 24 L 25 24 C 27.209 24 29 22.209 29 20 L 29 12 C 29 9.791 27.209 8 25 8 L 18.445312 8 z"/>
  </SvgIcon>
);

const Contact: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > *": { mx: 4, my: 1 },
      }}
    >
      <Link href="www.linkedin.com/in/itaru-ota-naist" color="inherit">
        <LinkedInIcon sx={{ fontSize: 40 }} />
      </Link>
      <Link href="https://github.com/Ota1022" color="inherit">
        <GitHubIcon sx={{ fontSize: 40 }} />
      </Link>
      <Link href="https://x.com/iorandd" color="inherit">
        <XIcon sx={{ fontSize: 40 }} />
      </Link>
      <Link href="https://speakerdeck.com/ota1022" color="inherit">
        <SpeakerDeckIcon sx={{ fontSize: 50 }} />
      </Link>
      {/* Add other icons for SpeakerDeck, Zenn, and CV PDF with a similar pattern */}
      {/* For custom icons, use <SvgIcon> with your SVG path and adjust the size similarly */}
    </Box>
  );
};

export default Contact;
