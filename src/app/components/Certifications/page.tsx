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
      <Typography variant="body1" component="div" sx={{ marginLeft: 2 }}>
        <ul>
          <li>TOEIC 865 points</li>
          <li>IPA Fundamental Information Technology Engineer</li>
          <li>IPA Applied Information Technology Engineer Examination</li>
          <li>AWS Certified Cloud Practitioner (CLF-C01)</li>
          <li>AWS Certified Solutions Architect - Associate (SAA-C03)</li>
          <li>AWS Certified Developer - Associate (DVA-C02)</li>
          <li>AWS Certified SysOps Administrator - Associate (SOA-C02)</li>
          <li>AWS Certified Solutions Architect - Professional (SAP-C02)</li>
          <li>AWS Certified Data Analytics - Specialty (DAS-C01)</li>
          <li>AWS Certified Security - Specialty (SCS-C02)</li>
        </ul>
      </Typography>
    </Paper>
  );
};

export default Certifications;
