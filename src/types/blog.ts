export type BlogCategory = 'tech' | 'activity' | 'other';

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  tags?: string[];
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
}

export interface BlogPostMetadata {
  slug: string;
  frontmatter: BlogPostFrontmatter;
}
