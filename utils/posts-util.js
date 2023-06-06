import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postDirectory = path.join(process.cwd(), 'data', 'posts');

export function getPostsFiles() {
  return fs.readdirSync(postDirectory);
}

export function getPostData(fileName) {
  const postSlug = fileName.replace(/\.md$/, ''); // remove the extension
  const filePath = path.join(postDirectory, postSlug + '.md');
  const fileContent = fs.readFileSync(filePath);
  const { data, content } = matter(fileContent);

  return {
    slug: postSlug,
    ...data,
    content,
  };
}

export function getAllPosts() {
  const postFiles = getPostsFiles();
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });
  return allPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  return featuredPosts;
}
