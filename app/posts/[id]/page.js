import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { getPostData } from '@/utils/posts-util';
import styles from './post-detail.module.css';

export const revalidate = 30;

export function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const postId = params.id;

  // fetch data
  const postData = getPostData(postId);

  return {
    title: postData.title,
    openGraph: {
      images: [`/images/posts/${postData.slug}/${postData.image}`],
    },
  };
}

export default function PostDetailPage({ params }) {
  const { id: postId } = params;

  const post = getPostData(postId);

  const ResponsiveImage = (props) => {
    return (
      <span className={styles.image}>
        <Image src={`/images/posts/${post.slug}/${props.src}`} alt={`${props.alt}`} width={600} height={300} />
      </span>
    );
  };

  const components = {
    img: ResponsiveImage,
  };

  return (
    <>
      <h1>{post.title}</h1>
      <MDXRemote source={post.content} components={components} />
    </>
  );
}
