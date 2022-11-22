import { getRecentPost } from "../api/post"
import Navbar from "../component/Navbar"
import { Post } from '../../types/post'
import { NextPage, GetServerSideProps } from 'next';
import PostList from '../component/PostList';

interface blogPageProps {
  posts: Post[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query['page'];
  const result = await getRecentPost(page?.toString());

  const { posts } = result;
  return { props: {posts: posts } };
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
