import { markdownComponents } from '@/components/blog/MarkdownComponents';
import { remarkBlogMarkdown } from '@/lib/markdown';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { Fragment, type ReactNode } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { unified } from 'unified';

interface MarkdownContentProps {
  source: string;
  fileName: string;
}

export async function MarkdownContent({
  source,
  fileName,
}: MarkdownContentProps) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(remarkBlogMarkdown, { fileName })
    .use(remarkRehype)
    .use(rehypePrettyCode, { theme: 'github-dark', keepBackground: true })
    .use(rehypeReact, {
      Fragment,
      jsx,
      jsxs,
      components: markdownComponents,
    })
    .process({ value: source, path: fileName });

  return file.result as ReactNode;
}
