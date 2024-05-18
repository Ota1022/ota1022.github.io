import { Link, Paper, Typography } from "@mui/material";
import React from "react";

const Publication: React.FC = () => {
  return (
    <Paper
      sx={{ mx: "auto", my: 4, p: 3, maxWidth: 600, overflow: "hidden" }}
      elevation={3}
    >
      <Typography variant="h4" component="h3" sx={{ marginBottom: 2 }}>
        Publication
      </Typography>
      <Typography variant="body1" component="div" sx={{ marginLeft: 2 }}>
        <ul>
          <li>
            Improving the Experience of Listening Broadcast Programs Using Social Media Data (Master&rsquo;s thesis){" "}
            <Link href="https://library.naist.jp/opac/en/book/106760" target="_blank" rel="noopener">
              [PDF]
            </Link>
          </li>
          <li>
            Analysis of the Uniformity Rate of Tweets for Broadcast Programs, The 15th Forum on Data Engineering and Information Management (DEIM2023), 4a-3-2, 2023 (2023/3/5, Gifu, Japan){" "}
            <Link href="https://proceedings-of-deim.github.io/DEIM2023/4a-3-2.pdf" target="_blank" rel="noopener">
              [PDF]
            </Link>
          </li>
          <li>
            Proposal of the Radio Programs Compression Method Using Twitter, The 14th Forum on Data Engineering and Information Management (DEIM2022), C21-2, 2022 (2022/02/28, Online){" "}
            <Link href="https://proceedings-of-deim.github.io/DEIM2022/papers/C21-2.pdf" target="_blank" rel="noopener">
              [PDF]
            </Link>
          </li>
        </ul>
      </Typography>
    </Paper>
  );
};

export default Publication;
