import { Link, Paper, Typography } from "@mui/material";
import React from "react";

const Awards: React.FC = () => {
  return (
    <Paper
      sx={{ mx: "auto", my: 4, p: 3, maxWidth: 600, overflow: "hidden" }}
      elevation={3}
    >
      <Typography variant="h4" component="h3" sx={{ marginBottom: 2 }}>
        Awards
      </Typography>
      <Typography variant="body1" component="div" sx={{ marginLeft: 2 }}>
        <ul>
          <li>
            Student Presentation Award, DEIM2022,{" "}
            <Link
              href="https://event.dbsj.org/deim2022/post/awards.html"
              target="_blank"
              rel="noopener"
            >
              [URL]
            </Link>
          </li>
          <li>
            Data Broad Award, imedia2021{" "}
            <Link
              href="https://sites.google.com/view/imedia-ws/imedia2021"
              target="_blank"
              rel="noopener"
            >
              [URL]
            </Link>
          </li>
          <li>
            1st Prize, GEIOT2021 in NAIST,{" "}
            <Link
              href="https://x.com/NAIST_MAIN/status/1429671012770009093?s=20&t=TW6BTHQ4EXVxJPVso1mbLg"
              target="_blank"
              rel="noopener"
            >
              [URL]
            </Link>
          </li>
        </ul>
      </Typography>
    </Paper>
  );
};

export default Awards;
