import { getRecentPost } from "../../db/blog/post"
import { Post } from '../../types/post'
import { NextPage, GetStaticProps } from 'next';
import PostList from '../../component/PostList';
import { getUserIdByUsername } from "../../db/blog/user";
import BlogLayout from "../../layout/BlogLayout";
import { BLOG_OWNER_NAME } from "../../setup";

interface blogPageProps {
  posts: Post[]
}

export const getStaticProps: GetStaticProps = async () => {
  const userId = await getUserIdByUsername(BLOG_OWNER_NAME)
  const posts = await getRecentPost(userId, false);
  return { props: { posts } };
}

const BlogPage: NextPage<blogPageProps> = (props) => {
  const { posts } = props;
  return <BlogLayout>
    <div>
      <h1>Blog Posts</h1>
      <PostList posts={posts}/>      
    </div>
  </BlogLayout>
};

export default BlogPage;
