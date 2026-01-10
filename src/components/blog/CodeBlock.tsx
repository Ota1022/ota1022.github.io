'use client';

import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const theme = useTheme();

  const handleCopy = () => {
    // Extract text content from children
    const code = extractTextContent(children);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper function to extract text from React nodes
  const extractTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractTextContent).join('');
    if (node && typeof node === 'object' && 'props' in node) {
      return extractTextContent(node.props.children);
    }
    return '';
  };

  return (
    <Box
      component="pre"
      sx={{
        position: 'relative',
        bgcolor: 'rgba(255, 255, 255, 0.05)',
        p: 2,
        borderRadius: 1,
        overflow: 'auto',
        my: 2,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      }}
    >
      <Box component="code" className={className}>
        {children}
      </Box>
      <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
        <IconButton
          onClick={handleCopy}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              color: 'rgba(255, 255, 255, 1)',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
          size="small"
        >
          {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
