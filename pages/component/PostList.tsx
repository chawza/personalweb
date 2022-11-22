import { Post } from "../../types/post"
import Link from 'next/link'

interface postListProps {
  posts: Post[],
};

function renderPostRow (post: Post, index: number) {
  const url = { pathname: '/blog/article/[id]', query: { id: post.id }}
  return <div key={index}>
    <h2><Link href={url}>{post.title}</Link></h2>
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