import DescriptionIcon from "@mui/icons-material/Description";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import React from "react";

const Contact: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > *": { mx: 4, my: 2 },
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
        <DescriptionIcon sx={{ fontSize: 40 }} />
      </Link>
      {/* Add other icons for SpeakerDeck, Zenn, and CV PDF with a similar pattern */}
      {/* For custom icons, use <SvgIcon> with your SVG path and adjust the size similarly */}
    </Box>
  );
};

export default Contact;
