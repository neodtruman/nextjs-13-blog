import { getAllPosts } from '@/utils/posts-util';
import PostsGrid from '../components/posts-grid';

export const revalidate = 30;

export default function AllPostsPage() {
  const posts = getAllPosts();

  return (
    <>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </>
  );
}
