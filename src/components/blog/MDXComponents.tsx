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
import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';
import { slugifyHeading } from '@/lib/markdown';
import { CodeBlock } from './CodeBlock';
import { GitHubRepoCard } from './GitHubRepoCard';

const BLOG_IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> =
  {
    '/blog/images/amazon-ecs.webp': { width: 80, height: 80 },
    '/blog/images/monolith-microservices.webp': { width: 491, height: 301 },
    '/blog/images/ecs-core-component.webp': { width: 637, height: 332 },
    '/blog/images/service-connect.webp': { width: 1303, height: 723 },
    '/blog/images/service-discovery_en.webp': { width: 1600, height: 855 },
  };

/**
 * Custom components for MDX
 * Applies styles integrated with MUI theme
 */
export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <Typography
      id={slugifyHeading(getTextContent(children))}
      variant="h3"
      component="h2"
      gutterBottom
      sx={{ mt: 4, mb: 2, scrollMarginTop: 24 }}
    >
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography
      id={slugifyHeading(getTextContent(children))}
      variant="h4"
      component="h2"
      gutterBottom
      sx={{
        mt: 4,
        mb: 2,
        pb: 1,
        borderBottom: 1,
        borderColor: 'grey.600',
        scrollMarginTop: 24,
      }}
    >
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography
      id={slugifyHeading(getTextContent(children))}
      variant="h5"
      component="h3"
      gutterBottom
      sx={{ mt: 2, mb: 1, scrollMarginTop: 24 }}
    >
      {children}
    </Typography>
  ),
  h4: ({ children }) => (
    <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, mb: 1 }}>
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
      {children}
    </Typography>
  ),
  a: ({ href, children }) => {
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
  ul: ({ children }) => (
    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
      {children}
    </Box>
  ),
  ol: ({ children }) => (
    <Box component="ol" sx={{ pl: 3, mb: 2 }}>
      {children}
    </Box>
  ),
  li: ({ children }) => (
    <Typography
      component="li"
      variant="body1"
      sx={{ mb: 0.5, lineHeight: 1.8 }}
    >
      {children}
    </Typography>
  ),
  blockquote: ({ children }) => (
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
  code: ({ children, className, ...props }) => {
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
  pre: ({ children, ...rest }) => {
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
  img: ({ src, alt, width, height }) => {
    // Amazon ECS icon should remain transparent
    const isTransparent = alt === 'Amazon ECS';
    const dimensions =
      typeof src === 'string' ? BLOG_IMAGE_DIMENSIONS[src] : undefined;

    return (
      <Box
        component="span"
        sx={{
          display: 'flex',
          bgcolor: isTransparent ? 'transparent' : '#ffffff',
          p: 2,
          borderRadius: 1,
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
  table: ({ children }) => (
    <TableContainer sx={{ my: 3, overflowX: 'auto' }}>
      <Table sx={{ border: 1, borderColor: 'divider' }}>{children}</Table>
    </TableContainer>
  ),
  thead: ({ children }) => <TableHead>{children}</TableHead>,
  tbody: ({ children }) => <TableBody>{children}</TableBody>,
  tr: ({ children }) => <TableRow>{children}</TableRow>,
  th: ({ children }) => (
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
  td: ({ children }) => (
    <TableCell sx={{ borderBottom: 1, borderColor: 'divider' }}>
      {children}
    </TableCell>
  ),
  GitHubRepo: GitHubRepoCard,
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
