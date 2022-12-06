import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAllPostIdByUserId, getPostDetail } from "../../../db/blog/post";
import { Post } from "../../../types/post";
import parse from 'html-react-parser';
import PageLayout from "../../../layout/PageLayout";
import { getUserIdByUsername } from "../../../db/blog/user";

import { Converter } from 'showdown';

const cvtr = new Converter()

export const getStaticPaths: GetStaticPaths = async () => {
  const userId = await getUserIdByUsername(process.env.BLOG_OWNER_USERNAME)
  const postIds = await getAllPostIdByUserId(userId);
  const pathList = postIds.map(postId => ({ params: { id: postId.toString() } }));
  return {
    paths: pathList,
    fallback: false
  };
}

type PageParams = {
  post: Post
}

interface staticPropsParams extends ParsedUrlQuery{
    id: string
};

export const getStaticProps: GetStaticProps<PageParams, staticPropsParams> = async (context) => {
  const { id : postId} = context.params!
  const post = await getPostDetail(parseInt(postId));
  return {
    props: {
      post,
      slug: postId
    }
  }
}

const ArticlePage: NextPage<PageParams> = (props: PageParams) => {
  const { post, slug } = props;
  if (!post) {
    console.log(`slug: ${slug}`)
    return <div>No post with id {slug} aa</div>
  };
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