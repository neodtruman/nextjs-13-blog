export default function AnotherPostDetailPage({ params }) {
  console.log(params);
  const { slug } = params;

  const postDate = slug?.join('/');

  return <h1>Another Detail Page - Post {postDate}</h1>;
}
