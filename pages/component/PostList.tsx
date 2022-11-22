import { Post } from "../../types/post"

interface postListProps {
  posts: Post[],
};

function renderPostRow (post: Post, index: number) {
  return <div key={index}>
    <h2>{post.title}</h2>
    <p>{post.add_date.toString()}</p>
    {
      post.tag?.length > 0 && post.tag.map(tagname => <span>{tagname}</span>)
    }
  </div> 
}

export default function PostList(props: postListProps) {
  const { posts } = props;
  return <div>
    {posts.map((post, index) => renderPostRow(post, index))}
  </div>
}