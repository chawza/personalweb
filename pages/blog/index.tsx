import { getRecentPost } from "../api/post"
import Navbar from "../component/Navbar"
import { Post } from '../../types/post'
import { NextPage, GetServerSideProps } from 'next';
import PostList from '../component/PostList';

interface blogPageProps {
  posts: Post[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let page = context.query?.page || '1';
  const posts = await getRecentPost(parseInt(page.toString()));
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
