import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAllPostIdByUsername, getPostDetail } from "../../../db/blog/post";
import { Post } from "../../../types/post";
import parse from 'html-react-parser';
import PageLayout from "../../../layout/PageLayout";
import { getUserIdByUsername } from "../../../db/blog/user";

import { Converter } from 'showdown';

const cvtr = new Converter()

export const getStaticPaths: GetStaticPaths = async () => {
  const userId = await getUserIdByUsername(process.env.BLOG_OWNER_USERNAME)
  const postIds = await getAllPostIdByUsername(userId);
  const pathList = postIds.map(postId => ({ params: { id: postId.toString() } }));
  return {
    paths: pathList,
    fallback: false
  };
}

type staticProps = {
  post: Post
}

interface staticPropsParams extends ParsedUrlQuery{
  id: string
};

export const getStaticProps: GetStaticProps<staticProps, staticPropsParams> = async (context) => {
  const { id : postId} = context.params!
  const post = await getPostDetail(parseInt(postId));
  return {
    props: {
      post
    }
  }
}

const ArticlePage: NextPage<staticProps> = (props: staticProps) => {
  const { post } = props;
  const HTMLString = cvtr.makeHtml(post.content);
  return <PageLayout>
    <h1>{post.title}</h1>
    <p>{post.add_date.toString()}</p>
    <div className="tag-container">
      {post.tag && post.tag.map((tagname, index) => <div key={`tag-${index}`}>{tagname}</div>)}
    </div>
    <div>
      {parse(HTMLString)}
    </div>
  </PageLayout>
};

export default ArticlePage;