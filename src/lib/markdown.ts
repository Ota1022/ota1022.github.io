import type { Root } from 'mdast';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface TableOfContentsSection {
  heading: TableOfContentsItem;
  children: TableOfContentsItem[];
}

interface MarkdownNode {
  type: string;
  value?: string;
  depth?: number;
  name?: string;
  attributes?: Record<string, string | null> | null;
  children?: MarkdownNode[];
  data?: {
    hName?: string;
    hProperties?: Record<string, string>;
  };
  position?: { start: { line: number; column: number } };
}

interface DirectiveDefinition {
  requiredAttributes: readonly string[];
  optionalAttributes: readonly string[];
  requiresTitle: boolean;
  hName: string;
  validate?: (
    attributes: Record<string, string>,
    fail: (message: string) => never
  ) => void;
}

const DIRECTIVES: Record<string, DirectiveDefinition> = {
  youtube: {
    requiredAttributes: ['id'],
    optionalAttributes: [],
    requiresTitle: true,
    hName: 'youtube-embed',
    validate: ({ id }, fail) => {
      if (!/^[A-Za-z0-9_-]{11}$/.test(id)) {
        fail('youtube id must contain exactly 11 URL-safe characters');
      }
    },
  },
  speakerdeck: {
    requiredAttributes: ['id'],
    optionalAttributes: [],
    requiresTitle: true,
    hName: 'speakerdeck-embed',
    validate: ({ id }, fail) => {
      if (!/^[a-f0-9]{32}$/i.test(id)) {
        fail('speakerdeck id must be a 32-character hexadecimal value');
      }
    },
  },
  github: {
    requiredAttributes: ['url'],
    optionalAttributes: ['description'],
    requiresTitle: false,
    hName: 'github-repo',
    validate: ({ url }, fail) => {
      if (!isGitHubRepositoryUrl(url)) {
        fail('github url must be an HTTPS github.com repository URL');
      }
    },
  },
  article: {
    requiredAttributes: ['url', 'source', 'description'],
    optionalAttributes: [],
    requiresTitle: true,
    hName: 'external-article',
    validate: ({ url }, fail) => {
      if (!isHttpUrl(url)) {
        fail('article url must use HTTP or HTTPS');
      }
    },
  },
};

/** Creates stable anchor IDs shared by the renderer and table of contents. */
export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Validates blog-only Markdown features and annotates nodes for rehype.
 * This plugin has no dependency on Next.js or the UI layer.
 */
export function remarkBlogMarkdown(options: { fileName: string }) {
  return (tree: Root) => {
    walk(tree as MarkdownNode, (node) => {
      if (node.type === 'html') {
        failAt(options.fileName, node, 'raw HTML and JSX are not supported');
      }

      if (node.type === 'heading' && node.depth && node.depth <= 3) {
        const id = slugifyHeading(textContent(node));
        if (id) {
          node.data = { ...node.data, hProperties: { id } };
        }
      }

      if (node.type === 'textDirective') {
        const value = serializeTextDirective(node);
        node.type = 'text';
        node.value = value;
        node.children = undefined;
        node.name = undefined;
        node.attributes = undefined;
        return;
      }

      if (!isDirective(node)) {
        return;
      }

      const definition = DIRECTIVES[node.name ?? ''];
      if (!definition) {
        failAt(
          options.fileName,
          node,
          `unknown directive ${JSON.stringify(node.name)}`
        );
      }
      if (node.type !== 'leafDirective') {
        failAt(
          options.fileName,
          node,
          `directive ${JSON.stringify(node.name)} must use the ::name syntax`
        );
      }

      const title = textContent(node).trim();
      if (definition.requiresTitle && !title) {
        failAt(options.fileName, node, `${node.name} requires a title`);
      }
      if (!definition.requiresTitle && title) {
        failAt(options.fileName, node, `${node.name} does not accept a title`);
      }

      const rawAttributes = node.attributes ?? {};
      const allowedAttributes = new Set([
        ...definition.requiredAttributes,
        ...definition.optionalAttributes,
      ]);
      for (const name of Object.keys(rawAttributes)) {
        if (!allowedAttributes.has(name)) {
          failAt(
            options.fileName,
            node,
            `${node.name} does not accept the ${JSON.stringify(name)} attribute`
          );
        }
      }

      const attributes: Record<string, string> = {};
      for (const name of definition.requiredAttributes) {
        const value = rawAttributes[name];
        if (typeof value !== 'string' || !value.trim()) {
          failAt(
            options.fileName,
            node,
            `${node.name} requires the ${JSON.stringify(name)} attribute`
          );
        }
        attributes[name] = value;
      }
      for (const name of definition.optionalAttributes) {
        const value = rawAttributes[name];
        if (typeof value === 'string' && value.trim()) {
          attributes[name] = value;
        }
      }

      const fail = (message: string): never =>
        failAt(options.fileName, node, message);
      definition.validate?.(attributes, fail);
      node.data = {
        ...node.data,
        hName: definition.hName,
        hProperties: title ? { ...attributes, title } : attributes,
      };
    });
  };
}

export function parseMarkdown(content: string, fileName: string): Root {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(remarkBlogMarkdown, { fileName });

  try {
    return processor.runSync(processor.parse(content)) as Root;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith(`${fileName}:`)) {
      throw error;
    }
    throw new Error(
      `${fileName}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export function extractTableOfContents(
  content: string,
  fileName = '<markdown>'
): TableOfContentsItem[] {
  const tree = parseMarkdown(content, fileName);
  const headings: TableOfContentsItem[] = [];

  walk(tree as MarkdownNode, (node) => {
    if (node.type !== 'heading' || (node.depth !== 2 && node.depth !== 3)) {
      return;
    }
    const title = textContent(node).trim();
    const id = slugifyHeading(title);
    if (id) {
      headings.push({ id, title, level: node.depth });
    }
  });

  return headings;
}

export function groupTableOfContents(
  headings: TableOfContentsItem[]
): TableOfContentsSection[] {
  const sections: TableOfContentsSection[] = [];

  for (const heading of headings) {
    const currentSection = sections.at(-1);
    if (heading.level === 2 || !currentSection) {
      sections.push({ heading, children: [] });
      continue;
    }

    currentSection.children.push(heading);
  }

  return sections;
}

export function calculateReadingTime(
  content: string,
  fileName = '<markdown>'
): number {
  const tree = parseMarkdown(content, fileName);
  const prose: string[] = [];

  collectProse(tree as MarkdownNode, prose);
  const normalizedProse = prose.join(' ').replace(/[#>*_`~|\[\]()-]/g, ' ');
  const wordCount =
    normalizedProse.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)?.length ?? 0;

  return Math.max(1, Math.ceil(wordCount / 200));
}

function collectProse(node: MarkdownNode, prose: string[]): void {
  if (
    node.type === 'code' ||
    node.type === 'inlineCode' ||
    node.type === 'image' ||
    isDirective(node)
  ) {
    return;
  }
  if (node.type === 'text' && node.value) {
    prose.push(node.value);
  }
  for (const child of node.children ?? []) {
    collectProse(child, prose);
  }
}

function textContent(node: MarkdownNode): string {
  if (node.type === 'text' || node.type === 'inlineCode') {
    return node.value ?? '';
  }
  if (node.type === 'image') {
    return '';
  }
  return (node.children ?? []).map(textContent).join('');
}

function walk(node: MarkdownNode, visitor: (node: MarkdownNode) => void): void {
  visitor(node);
  for (const child of node.children ?? []) {
    walk(child, visitor);
  }
}

function isDirective(node: MarkdownNode): boolean {
  return node.type === 'leafDirective' || node.type === 'containerDirective';
}

function serializeTextDirective(node: MarkdownNode): string {
  const label = node.children?.length ? `[${textContent(node)}]` : '';
  const attributes = Object.entries(node.attributes ?? {});
  const serializedAttributes = attributes.length
    ? `{${attributes
        .map(([name, value]) =>
          value === null
            ? name
            : `${name}="${value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`
        )
        .join(' ')}}`
    : '';
  return `:${node.name ?? ''}${label}${serializedAttributes}`;
}

function failAt(fileName: string, node: MarkdownNode, message: string): never {
  const line = node.position?.start.line ?? 1;
  const column = node.position?.start.column ?? 1;
  throw new Error(`${fileName}:${line}:${column}: ${message}`);
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function isGitHubRepositoryUrl(value: string): boolean {
  try {
    const url = new URL(value);
    const segments = url.pathname.split('/').filter(Boolean);
    return (
      url.protocol === 'https:' &&
      url.hostname === 'github.com' &&
      segments.length === 2 &&
      !url.search &&
      !url.hash
    );
  } catch {
    return false;
  }
}
