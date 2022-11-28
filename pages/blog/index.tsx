import { getRecentPost } from "../../db/blog/post"
import { Post } from '../../types/post'
import { NextPage, GetStaticProps } from 'next';
import PostList from '../../component/PostList';
import PageLayout from '../../layout/PageLayout';

interface blogPageProps {
  posts: Post[]
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getRecentPost(false);
  return { props: { posts } };
}

const BlogPage: NextPage<blogPageProps> = (props) => {
  const { posts } = props;
  return <PageLayout>
    <div>
      <h1>Blog Posts</h1>
      <PostList posts={posts} />      
    </div>
  </PageLayout>
};

export default BlogPage;
