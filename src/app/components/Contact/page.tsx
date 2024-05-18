import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import React from "react";
// Import other icons as needed or use SvgIcon for custom ones

const Contact: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex", // Enables Flexbox
        justifyContent: "center", // Centers the items horizontally
        flexWrap: "wrap", // Allows items to wrap to the next line if needed
        "& > *": { mx: 2, my: 1 }, // Increases horizontal margin, keeps vertical margin
      }}
    >
      <Link href="www.linkedin.com/in/itaru-ota-naist" color="inherit">
        <LinkedInIcon sx={{ fontSize: 40 }} />
      </Link>
      <Link href="https://github.com/Ota1022" color="inherit">
        <GitHubIcon sx={{ fontSize: 40 }} />
      </Link>
      {/* Add other icons for SpeakerDeck, Zenn, and CV PDF with a similar pattern */}
      {/* For custom icons, use <SvgIcon> with your SVG path and adjust the size similarly */}
    </Box>
  );
};

export default Contact;
