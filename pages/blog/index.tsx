import { getRecentPost } from "../../db/blog/post"
import Navbar from "../component/Navbar"
import { Post } from '../../types/post'
import { NextPage, GetStaticProps } from 'next';
import PostList from '../component/PostList';

interface blogPageProps {
  posts: Post[]
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getRecentPost(false);
  return { props: { posts } };
}

const BlogPage: NextPage<blogPageProps> = (props) => {
  const { posts } = props;
  return <div>
    <Navbar/>
    <main>
      <h1>Blog Posts</h1>
      <PostList posts={posts} />      
    </main>
  </div>
};

export default BlogPage;
