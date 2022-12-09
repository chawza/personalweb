import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAllPostIdByUserId, getPostDetail } from "../../../db/blog/post";
import { Post } from "../../../types/post";
import parse from 'html-react-parser';
import PageLayout from "../../../layout/PageLayout";
import { getUserIdByUsername } from "../../../db/blog/user";
import { Converter } from 'showdown';
import { REGEX_PATTERN } from "../../../lib/md";
import TagList from "../../../component/TagList";
import { DateFormat } from "../../../lib/stringlib";

const { IMG_PATTERN, LINK_PATTERN } = REGEX_PATTERN;

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
  post: Post | null;
  slug: string;
}

interface staticPropsParams extends ParsedUrlQuery{
    id: string
};

function replaceImagePath(mdText: string): string {
  let newText = `${mdText}`;
  const imgPaths = [];
  const matchedImage = mdText.matchAll(IMG_PATTERN);
  for(let match of matchedImage) {
    const imagePattern = match[0];
    const imgLink = imagePattern.match(LINK_PATTERN);
    if (!imgLink) continue;
    const newImglink = `/images/${imgLink[0]}`;
    imgPaths.push(newImglink)
    const newImagePattern = imagePattern.replace(imgLink[0], newImglink);
    newText = newText.replace(imagePattern, newImagePattern);
  }
  return newText;
}

export const getStaticProps: GetStaticProps<PageParams, staticPropsParams> = async (context) => {
  const { id : postId} = context.params!
  const post = await getPostDetail(parseInt(postId));
  post.content = replaceImagePath(post.content)
  return {
    props: {
      post,
      slug: postId,
    }
  }
}

const ArticlePage: NextPage<PageParams> = (props: PageParams) => {
  const { post, slug } = props;

  if (!post) {
    return <div>No post with id {slug} aa</div>
  };

  let HTMLString = cvtr.makeHtml(post.content); 
  return <PageLayout>
    <div>
      <p>{DateFormat.CleanReadable(post.add_date)}</p>
      <div className="tag-container">
        {post.tag && <TagList tags={post.tag}/>}
      </div>
      <div className="articleArea">
        {parse(HTMLString)}
      </div>  
    </div>
    
  </PageLayout>
};

export default ArticlePage;
