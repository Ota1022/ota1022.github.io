'use client';

import { Box, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useState, type CSSProperties } from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  style?: CSSProperties;
  [key: string]: unknown;
}

export function CodeBlock({ children, style, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const language = props['data-language'] as string | undefined;

  const handleCopy = () => {
    const code = extractTextContent(children);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      style={style}
      sx={{
        position: 'relative',
        p: 2,
        pt: language ? 4.5 : 2,
        borderRadius: 1,
        overflow: 'auto',
        my: 2,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: '0.9em',
        lineHeight: 1.7,
        ...(!style?.backgroundColor && {
          bgcolor: '#24292e',
          color: '#e1e4e8',
        }),
      }}
    >
      {language && (
        <Box
          component="span"
          sx={{
            position: 'absolute',
            top: 8,
            left: 16,
            fontSize: '0.75em',
            color: 'rgba(255, 255, 255, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            userSelect: 'none',
          }}
        >
          {language}
        </Box>
      )}
      {children}
      <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
        <IconButton
          onClick={handleCopy}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'rgba(255, 255, 255, 0.5)',
            '&:hover': {
              color: 'rgba(255, 255, 255, 0.9)',
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
