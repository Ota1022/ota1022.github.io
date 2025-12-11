import { Box, Link as MuiLink, Typography } from '@mui/material';
import type { MDXComponents } from 'mdx/types';

/**
 * Custom components for MDX
 * Applies styles integrated with MUI theme
 */
export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 4, mb: 2 }}>
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 3, mb: 2 }}>
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2, mb: 1 }}>
      {children}
    </Typography>
  ),
  h4: ({ children }) => (
    <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, mb: 1 }}>
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography variant="body1" paragraph>
      {children}
    </Typography>
  ),
  a: ({ href, children }) => (
    <MuiLink href={href} target="_blank" rel="noopener noreferrer" underline="hover">
      {children}
    </MuiLink>
  ),
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
    <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
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
  code: ({ children, className }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <Box
          component="code"
          sx={{
            bgcolor: 'action.selected',
            px: 0.5,
            py: 0.25,
            borderRadius: 0.5,
            fontFamily: 'monospace',
            fontSize: '0.9em',
          }}
        >
          {children}
        </Box>
      );
    }
    return (
      <Box
        component="code"
        className={className}
        sx={{
          display: 'block',
          bgcolor: 'action.selected',
          p: 2,
          borderRadius: 1,
          overflow: 'auto',
          fontFamily: 'monospace',
          fontSize: '0.9em',
          my: 2,
        }}
      >
        {children}
      </Box>
    );
  },
  pre: ({ children }) => (
    <Box
      component="pre"
      sx={{
        bgcolor: 'action.selected',
        p: 2,
        borderRadius: 1,
        overflow: 'auto',
        my: 2,
      }}
    >
      {children}
    </Box>
  ),
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
  img: ({ src, alt }) => (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
        my: 2,
        borderRadius: 1,
      }}
    />
  ),
};
