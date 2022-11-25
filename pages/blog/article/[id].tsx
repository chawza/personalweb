import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAllPostIds, getPostDetail } from "../../api/post";
import { Post } from "../../../types/post";
import Navbar from "../../component/Navbar";
import parse from 'html-react-parser';

import { Converter } from 'showdown';

const cvtr = new Converter()

export const getStaticPaths: GetStaticPaths = async () => {
  const postIds = await getAllPostIds();
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
  return <div>
    <Navbar/>
    <main>
      <h1>{post.title}</h1>
      <p>{post.add_date.toString()}</p>
      <div className="tag-container">
        {post.tag && post.tag.map((tagname, index) => <div key={`tag-${index}`}>{tagname}</div>)}
      </div>
      <div>
        {parse(HTMLString)}
      </div>
    </main>
  </div>
};

export default ArticlePage;