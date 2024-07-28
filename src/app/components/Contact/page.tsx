import DescriptionIcon from "@mui/icons-material/Description";
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
        <Box sx={{ fontSize: 40 }}>
          <LinkedInIcon />
        </Box>
      </Link>
      <Link href="https://github.com/Ota1022" color="inherit">
        <Box sx={{ fontSize: 40 }}>
          <GitHubIcon />
        </Box>
      </Link>
      <Link href="https://x.com/iorandd" color="inherit">
        <Box sx={{ fontSize: 40 }}>
          <XIcon />
        </Box>
      </Link>
      <Link href="https://speakerdeck.com/ota1022" color="inherit">
        <Box sx={{ fontSize: 40 }}>
          <DescriptionIcon />
        </Box>
      </Link>
      <Link href="https://zenn.dev/iorandd" color="inherit">
        <Box sx={{ fontSize: 40 }}>
          <ZennIcon />
        </Box>
      </Link>
    </Box>
  );
};

export default Contact;
