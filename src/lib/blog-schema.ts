export const BLOG_CATEGORIES = [
  {
    value: 'blog',
    label: 'Article',
    filterLabel: 'Articles',
    chipColor: 'teal',
  },
  {
    value: 'zenn',
    label: 'Zenn article',
    filterLabel: 'Zenn articles',
    chipColor: 'primary',
  },
  {
    value: 'speakerdeck',
    label: 'Presentation',
    filterLabel: 'Presentations',
    chipColor: 'success',
  },
  {
    value: 'announcement',
    label: 'Recognition',
    filterLabel: 'Recognition',
    chipColor: 'warning',
  },
  {
    value: 'activity',
    label: 'Activity',
    filterLabel: 'Activities',
    chipColor: 'secondary',
  },
  {
    value: 'other',
    label: 'Update',
    filterLabel: 'Updates',
    chipColor: 'default',
  },
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]['value'];
export type BlogCategoryChipColor =
  (typeof BLOG_CATEGORIES)[number]['chipColor'];

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  tags?: string[];
  externalUrl?: string;
}

export function getBlogCategoryDefinition(category: BlogCategory) {
  return BLOG_CATEGORIES.find((definition) => definition.value === category);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isBlogCategory(value: unknown): value is BlogCategory {
  return BLOG_CATEGORIES.some((category) => category.value === value);
}

function readRequiredString(
  data: Record<string, unknown>,
  key: 'title' | 'description' | 'date',
  source: string
): string {
  const value = data[key];
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${source}: frontmatter.${key} must be a non-empty string`);
  }
  return value;
}

function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

export function parseBlogFrontmatter(
  value: unknown,
  source = 'Blog post'
): BlogPostFrontmatter {
  if (!isRecord(value)) {
    throw new Error(`${source}: frontmatter must be an object`);
  }

  const title = readRequiredString(value, 'title', source);
  const description = readRequiredString(value, 'description', source);
  const date = readRequiredString(value, 'date', source);

  if (!isCalendarDate(date)) {
    throw new Error(
      `${source}: frontmatter.date must be a valid date in YYYY-MM-DD format`
    );
  }

  if (!isBlogCategory(value.category)) {
    const supportedCategories = BLOG_CATEGORIES.map(
      (category) => category.value
    ).join(', ');
    throw new Error(
      `${source}: frontmatter.category must be one of: ${supportedCategories}`
    );
  }

  let tags: string[] | undefined;
  if (value.tags !== undefined) {
    if (
      !Array.isArray(value.tags) ||
      value.tags.some(
        (tag) => typeof tag !== 'string' || tag.trim().length === 0
      )
    ) {
      throw new Error(
        `${source}: frontmatter.tags must be an array of non-empty strings`
      );
    }
    tags = value.tags;
  }

  let externalUrl: string | undefined;
  if (value.externalUrl !== undefined) {
    if (typeof value.externalUrl !== 'string') {
      throw new Error(
        `${source}: frontmatter.externalUrl must be a URL string`
      );
    }

    try {
      const parsedUrl = new URL(value.externalUrl);
      if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
        throw new Error('Unsupported URL protocol');
      }
    } catch {
      throw new Error(
        `${source}: frontmatter.externalUrl must be a valid HTTP(S) URL`
      );
    }
    externalUrl = value.externalUrl;
  }

  return {
    title,
    description,
    date,
    category: value.category,
    ...(tags ? { tags } : {}),
    ...(externalUrl ? { externalUrl } : {}),
  };
}
