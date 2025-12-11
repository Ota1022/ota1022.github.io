import BlogList from '@/components/blog/BlogList';
import { getAllPosts } from '@/lib/blog';

export default function BlogPage() {
  const allPosts = getAllPosts();

  return <BlogList initialPosts={allPosts} />;
}
