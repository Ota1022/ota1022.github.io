import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import { Box, SvgIcon } from "@mui/material";
import Link from "@mui/material/Link";
import React from "react";

const ZennIcon: React.FC = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <title>Zenn</title>
    <path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z"/>
  </SvgIcon>
);

const SpeakerDeckIcon: React.FC = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <title>Speaker Deck</title>
    <path d="M10.025 13.875H4.687a4.688 4.688 0 0 1 0-9.375h6.227a1.875 1.875 0 0 1 0 3.75H4.592a.937.937 0 1 0 0 1.875h5.337a4.687 4.687 0 1 1 0 9.375H1.875a1.875 1.875 0 0 1 0-3.75h8.15a.938.938 0 0 0 0-1.875zM13.97 19.5a5.635 5.635 0 0 0 2.396-3.75h3.026a.93.93 0 0 0 .921-.938V9.189a.93.93 0 0 0-.921-.938h-5.497c.438-.498.704-1.155.704-1.875s-.266-1.377-.704-1.875h6.418C22.35 4.5 24 6.179 24 8.25v7.5c0 2.071-1.65 3.75-3.687 3.75H13.97z"/>
  </SvgIcon>
);

const Contact: React.FC = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > *": { mx: 4, my: 2 },
      }}
    >
      <Link href="https://linkedin.com/in/itaru-ota-naist" color="inherit">
        <Box sx={{ fontSize: 150 }}>
          <LinkedInIcon />
        </Box>
      </Link>
      <Link href="https://github.com/Ota1022" color="inherit">
        <Box sx={{ fontSize: 150 }}>
          <GitHubIcon />
        </Box>
      </Link>
      <Link href="https://x.com/iorandd" color="inherit">
        <Box sx={{ fontSize: 150 }}>
          <XIcon />
        </Box>
      </Link>
      <Link href="https://speakerdeck.com/ota1022" color="inherit">
        <Box sx={{ fontSize: 150 }}>
          <SpeakerDeckIcon />
        </Box>
      </Link>
      <Link href="https://zenn.dev/iorandd" color="inherit">
        <Box sx={{ fontSize: 150 }}>
          <ZennIcon />
        </Box>
      </Link>
    </Box>
  );
};

export default Contact;
