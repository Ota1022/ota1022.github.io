'use client';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Paper,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';

const selectedWork = [
  {
    title: 'Trayce for Raycast',
    description:
      'A hackathon project that turns clipboard history into reusable procedure documents with an MCP server and Claude API.',
    tags: ['Raycast', 'TypeScript', 'MCP', 'Claude'],
    href: 'https://speakerdeck.com/ota1022/trayce-a-raycast-extension-tokyo-ai-hackathon-2025',
    external: true,
  },
  {
    title: 'Cloud Architecture Writing',
    description:
      'English technical guides on Amazon ECS service communication and migrating existing AWS resources into Terraform.',
    tags: ['AWS', 'ECS', 'Terraform'],
    href: '/blog',
    external: false,
  },
  {
    title: 'NLP Research & Open Source',
    description:
      'Research on improving audio-media experiences and a contribution to an open-source NLP authorship-detection project.',
    tags: ['Python', 'NLP', 'Research'],
    href: 'https://github.com/sociocom/limco',
    external: true,
  },
] as const;

export default function SelectedWork() {
  return (
    <Paper
      component="section"
      aria-labelledby="selected-work-title"
      sx={{ mx: 'auto', my: 4, p: 3, maxWidth: 600, overflow: 'hidden' }}
      elevation={3}
    >
      <Typography
        id="selected-work-title"
        variant="h4"
        component="h2"
        sx={{ mb: 1 }}
      >
        Selected Work
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Projects and technical work that represent my current interests.
      </Typography>

      <Box sx={{ display: 'grid', gap: 2 }}>
        {selectedWork.map((work) => (
          <Card key={work.title} variant="outlined" elevation={0}>
            <CardActionArea
              component={work.external ? 'a' : NextLink}
              href={work.href}
              target={work.external ? '_blank' : undefined}
              rel={work.external ? 'noopener noreferrer' : undefined}
              aria-label={
                work.external ? `${work.title}, opens in a new tab` : work.title
              }
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <Typography variant="h6" component="h3">
                    {work.title}
                  </Typography>
                  {work.external ? (
                    <OpenInNewIcon
                      aria-hidden="true"
                      sx={{ mt: 0.5, fontSize: 18, color: 'text.secondary' }}
                    />
                  ) : (
                    <ArrowForwardIcon
                      aria-hidden="true"
                      sx={{ mt: 0.5, fontSize: 18, color: 'text.secondary' }}
                    />
                  )}
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {work.description}
                </Typography>
                <Box
                  sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 2 }}
                >
                  {work.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Paper>
  );
}
