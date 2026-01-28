export type BlogCategory = 'blog' | 'zenn' | 'speakerdeck' | 'announcement' | 'activity' | 'other';

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  tags?: string[];
  externalUrl?: string;
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
