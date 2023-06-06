import PostItem from './post-item';
import classes from './posts-grid.module.css';

function PostsGrid(props) {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((p) => (
        <PostItem key={p.slug} post={p} />
      ))}
    </ul>
  );
}
export default PostsGrid;
