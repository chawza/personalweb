import matter from 'gray-matter';
import { NextPage, GetStaticProps } from 'next';
import PostList from '../../component/PostList';
import BlogLayout from "../../layout/BlogLayout";
import { getPostContentByFilename, getRecentPostFilename } from "../../lib/post";
import { Post } from '../../types/post';

interface blogPageProps {
  posts: Post[] 
}

export const getStaticProps = async () => {
  const recentFilenames = getRecentPostFilename(3);
  const posts= recentFilenames.map((filename) => {
    const mdfile = getPostContentByFilename(filename);
    const { data, content } = matter(mdfile);
    return {
      slug: filename,
      data,
      content 
    }
  })
  return {
    props: {
      posts 
    }
  }
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
