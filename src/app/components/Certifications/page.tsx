import { Box, Paper, Typography } from '@mui/material';
import type { FC } from 'react';

const Certifications: FC = () => {
  return (
    <Paper
      sx={{ mx: 'auto', my: 4, p: 3, maxWidth: 600, overflow: 'hidden' }}
      elevation={3}
    >
      <Typography variant="h4" component="h3" sx={{ marginBottom: 2 }}>
        Certifications
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" component="h4" sx={{ mb: 1 }}>
          AWS Certifications
        </Typography>
        <Typography variant="body1" component="div" sx={{ marginLeft: 2 }}>
          <ul>
            <li>AWS Certified Cloud Practitioner (CLF-C01)</li>
            <li>AWS Certified AI Practitioner (AIF-C01)</li>
            <li>AWS Certified Solutions Architect - Associate (SAA-C03)</li>
            <li>AWS Certified Developer - Associate (DVA-C02)</li>
            <li>AWS Certified SysOps Administrator - Associate (SOA-C02)</li>
            <li>AWS Certified Data Engineer - Associate (DEA-C01)</li>
            <li>
              AWS Certified Machine Learning Engineer - Associate (MLA-C01)
            </li>
            <li>AWS Certified Solutions Architect - Professional (SAP-C02)</li>
            <li>AWS Certified Security - Specialty (SCS-C02)</li>
            <li>AWS Certified Data Analytics - Specialty (DAS-C01)</li>
            <li>AWS Certified Machine Learning - Specialty (MLS-C01)</li>
          </ul>
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" component="h4" sx={{ mb: 1 }}>
          Google Cloud Certifications
        </Typography>
        <Typography variant="body1" component="div" sx={{ marginLeft: 2 }}>
          <ul>
            <li>Google Cloud Associate Cloud Engineer</li>
          </ul>
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" component="h4" sx={{ mb: 1 }}>
          Others
        </Typography>
        <Typography variant="body1" component="div" sx={{ marginLeft: 2 }}>
          <ul>
            <li>TOEIC 865 points</li>
            <li>IPA Fundamental Information Technology Engineer</li>
            <li>IPA Applied Information Technology Engineer</li>
          </ul>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Certifications;
