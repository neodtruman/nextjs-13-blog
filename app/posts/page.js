import Link from 'next/link';
import path from 'path';
import fs from 'fs';

export const revalidate = 30;

function fetchPosts() {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export default function AllPostsPage() {
  const lastRenderedTime = new Date().toLocaleTimeString();

  const posts = fetchPosts();
  return (
    <>
      <h1>All Posts</h1>
      <p>Last rendered time: {lastRenderedTime}</p>

      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}
