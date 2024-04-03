import { Paper, Typography } from "@mui/material";
import React from "react";

const Certifications: React.FC = () => {
  return (
    <Paper
      sx={{ mx: "auto", my: 4, p: 3, maxWidth: 600, overflow: "hidden" }}
      elevation={3}
    >
      <Typography variant="h4" component="h3" sx={{ marginBottom: 2 }}>
        Certifications
      </Typography>
      <Typography
        variant="body1"
        component="div"
        sx={{ marginLeft: 2 }}
      ></Typography>
    </Paper>
  );
};

export default Certifications;
