import { getRecentPost } from "../../db/blog/post"
import { Post } from '../../types/post'
import { NextPage, GetStaticProps } from 'next';
import PostList from '../../component/PostList';
import PageLayout from '../../layout/PageLayout';
import { getUserIdByUsername } from "../../db/blog/user";

interface blogPageProps {
  posts: Post[]
}

export const getStaticProps: GetStaticProps = async () => {
  const userId = await getUserIdByUsername(process.env.BLOG_OWNER_USERNAME)
  const posts = await getRecentPost(userId, false);
  return { props: { posts } };
}

const BlogPage: NextPage<blogPageProps> = (props) => {
  const { posts } = props;
  return <PageLayout>
    <div>
      <h1>Blog Posts</h1>
      <PostList posts={posts}/>      
    </div>
  </PageLayout>
};

export default BlogPage;
