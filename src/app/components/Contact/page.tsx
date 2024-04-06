import EmailIcon from "@mui/icons-material/Email";
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
      <Link href="mailto:your-email@example.com" color="inherit">
        <EmailIcon sx={{ fontSize: 40 }} />
      </Link>
      <Link href="https://www.linkedin.com/in/yourprofile" color="inherit">
        <LinkedInIcon sx={{ fontSize: 40 }} />
      </Link>
      <Link href="https://github.com/yourusername" color="inherit">
        <GitHubIcon sx={{ fontSize: 40 }} />
      </Link>
      {/* Add other icons for SpeakerDeck, Zenn, and CV PDF with a similar pattern */}
      {/* For custom icons, use <SvgIcon> with your SVG path and adjust the size similarly */}
    </Box>
  );
};

export default Contact;
