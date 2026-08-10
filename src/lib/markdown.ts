export interface TableOfContentsItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface TableOfContentsSection {
  heading: TableOfContentsItem;
  children: TableOfContentsItem[];
}

/**
 * Creates stable anchor IDs shared by the MDX renderer and table of contents.
 */
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

function cleanHeading(value: string): string {
  return value
    .replace(/[`*_~]/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .trim();
}

export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headings: TableOfContentsItem[] = [];
  const headingPattern = /^(#{2,3})\s+(.+)$/gm;
  let match = headingPattern.exec(content);

  while (match) {
    const title = cleanHeading(match[2]);
    const id = slugifyHeading(title);
    if (id) {
      headings.push({ id, title, level: match[1].length as 2 | 3 });
    }
    match = headingPattern.exec(content);
  }

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

export function calculateReadingTime(content: string): number {
  const prose = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^\)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[#>*_`~|\[\]()-]/g, ' ');
  const wordCount =
    prose.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)?.length ?? 0;

  return Math.max(1, Math.ceil(wordCount / 200));
}
