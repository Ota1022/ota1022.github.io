import {
  Box,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import type { ComponentProps, ReactNode } from 'react';
import RouterLink from '@/components/layout/RouterLink';
import { slugifyHeading } from '@/lib/markdown';
import { ANCHOR_SCROLL_MARGIN } from '@/theme/layout';
import { CodeBlock } from './CodeBlock';
import { ExternalArticleCard } from './ExternalArticleCard';
import { GitHubRepoCard } from './GitHubRepoCard';
import { SpeakerDeckEmbed, VideoEmbed } from './MediaEmbeds';

const BLOG_IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> =
  {
    '/blog/images/amazon-ecs.webp': { width: 80, height: 80 },
    '/blog/images/monolith-microservices.webp': { width: 491, height: 301 },
    '/blog/images/ecs-core-component.webp': { width: 637, height: 332 },
    '/blog/images/service-connect.webp': { width: 1303, height: 723 },
    '/blog/images/service-discovery_en.webp': { width: 1600, height: 855 },
    '/blog/images/aws-jr-champions-2026/2026-japan-aws-jr-champions-roster.jpg':
      {
        width: 1675,
        height: 1800,
      },
  };

/**
 * Custom components for Markdown
 * Applies styles integrated with MUI theme
 */
export const markdownComponents = {
  'external-article': ExternalArticleCard,
  'speakerdeck-embed': SpeakerDeckEmbed,
  'youtube-embed': VideoEmbed,
  h1: ({ children, id }: { children?: ReactNode; id?: string }) => (
    <Typography
      id={id ?? slugifyHeading(getTextContent(children))}
      variant="h3"
      component="h2"
      gutterBottom
      sx={{ mt: 4, mb: 2, scrollMarginTop: ANCHOR_SCROLL_MARGIN }}
    >
      {children}
    </Typography>
  ),
  h2: ({ children, id }: { children?: ReactNode; id?: string }) => (
    <Typography
      id={id ?? slugifyHeading(getTextContent(children))}
      variant="h4"
      component="h2"
      gutterBottom
      sx={{
        mt: 4,
        mb: 2,
        pb: 1,
        borderBottom: 1,
        borderColor: 'grey.600',
        scrollMarginTop: ANCHOR_SCROLL_MARGIN,
      }}
    >
      {children}
    </Typography>
  ),
  h3: ({ children, id }: { children?: ReactNode; id?: string }) => (
    <Typography
      id={id ?? slugifyHeading(getTextContent(children))}
      variant="h5"
      component="h3"
      gutterBottom
      sx={{ mt: 2, mb: 1, scrollMarginTop: ANCHOR_SCROLL_MARGIN }}
    >
      {children}
    </Typography>
  ),
  h4: ({ children }: ComponentProps<'h4'>) => (
    <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, mb: 1 }}>
      {children}
    </Typography>
  ),
  p: ({ children }: ComponentProps<'p'>) => (
    <Typography
      variant="body1"
      paragraph
      sx={{ lineHeight: 1.8, overflowWrap: 'anywhere' }}
    >
      {children}
    </Typography>
  ),
  a: ({ href, children }: ComponentProps<'a'>) => {
    // Site-relative links go through the client router so they get the same
    // crossfade as the rest of the site instead of a full page load.
    if (typeof href === 'string' && href.startsWith('/')) {
      return (
        <RouterLink href={href} underline="hover">
          {children}
        </RouterLink>
      );
    }

    const isExternal = typeof href === 'string' && /^https?:\/\//.test(href);

    return (
      <MuiLink
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        underline="hover"
      >
        {children}
      </MuiLink>
    );
  },
  ul: ({ children }: ComponentProps<'ul'>) => (
    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
      {children}
    </Box>
  ),
  ol: ({ children }: ComponentProps<'ol'>) => (
    <Box component="ol" sx={{ pl: 3, mb: 2 }}>
      {children}
    </Box>
  ),
  li: ({ children }: ComponentProps<'li'>) => (
    <Typography
      component="li"
      variant="body1"
      sx={{ mb: 0.5, lineHeight: 1.8, overflowWrap: 'anywhere' }}
    >
      {children}
    </Typography>
  ),
  blockquote: ({ children }: ComponentProps<'blockquote'>) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: 4,
        borderColor: 'primary.main',
        pl: 2,
        py: 1,
        my: 2,
        bgcolor: 'action.hover',
        fontStyle: 'italic',
      }}
    >
      {children}
    </Box>
  ),
  code: ({ children, className, ...props }: ComponentProps<'code'>) => {
    // rehype-pretty-code uses data-language for fenced code blocks
    const isInline =
      !className && !(props as Record<string, unknown>)['data-language'];
    if (isInline) {
      return (
        <Box
          component="code"
          sx={{
            bgcolor: 'action.hover',
            px: 0.75,
            py: 0.25,
            borderRadius: 0.5,
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            fontSize: '0.9em',
            color: 'secondary.main',
            // Identifiers like `aws_service_discovery_private_dns_namespace`
            // have no space or hyphen to break on, so the default
            // `overflow-wrap: normal` lets them run past the content column.
            overflowWrap: 'anywhere',
          }}
        >
          {children}
        </Box>
      );
    }
    // For fenced code blocks, preserve all props from rehype-pretty-code
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...rest }: ComponentProps<'pre'>) => {
    return <CodeBlock {...rest}>{children}</CodeBlock>;
  },
  hr: () => (
    <Box
      component="hr"
      sx={{
        border: 'none',
        borderTop: 1,
        borderColor: 'divider',
        my: 4,
      }}
    />
  ),
  img: ({ src, alt, width, height }: ComponentProps<'img'>) => {
    const dimensions =
      typeof src === 'string' ? BLOG_IMAGE_DIMENSIONS[src] : undefined;

    return (
      <Box
        component="span"
        sx={{
          display: 'flex',
          my: 2,
          justifyContent: 'center',
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={width ?? dimensions?.width}
          height={height ?? dimensions?.height}
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </Box>
    );
  },
  table: ({ children }: ComponentProps<'table'>) => (
    <TableContainer sx={{ my: 3, overflowX: 'auto' }}>
      <Table sx={{ border: 1, borderColor: 'divider' }}>{children}</Table>
    </TableContainer>
  ),
  thead: ({ children }: ComponentProps<'thead'>) => (
    <TableHead>{children}</TableHead>
  ),
  tbody: ({ children }: ComponentProps<'tbody'>) => (
    <TableBody>{children}</TableBody>
  ),
  tr: ({ children }: ComponentProps<'tr'>) => <TableRow>{children}</TableRow>,
  th: ({ children }: ComponentProps<'th'>) => (
    <TableCell
      component="th"
      sx={{
        fontWeight: 'bold',
        bgcolor: 'rgba(255, 255, 255, 0.05)',
        borderBottom: 2,
        borderColor: 'divider',
      }}
    >
      {children}
    </TableCell>
  ),
  td: ({ children }: ComponentProps<'td'>) => (
    <TableCell sx={{ borderBottom: 1, borderColor: 'divider' }}>
      {children}
    </TableCell>
  ),
  'github-repo': GitHubRepoCard,
};

function getTextContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getTextContent).join('');
  }
  if (node && typeof node === 'object' && 'props' in node) {
    return getTextContent(
      (node as { props: { children?: ReactNode } }).props.children
    );
  }
  return '';
}
