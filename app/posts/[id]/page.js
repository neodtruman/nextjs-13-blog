'use client';

import { useState, useEffect } from 'react';

export default function PostDetailPage({ params }) {
  const { id: postId } = params;

  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${postId}`)
      .then((data) => data.json())
      .then((response) => setPost(response.data.post));
  }, [postId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Detail Page - {post.title}</h1>
      <p>{post.content}</p>
    </>
  );
}
