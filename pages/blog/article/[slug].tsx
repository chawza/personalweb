import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import PageLayout from "../../../layout/PageLayout";
import TagList from "../../../component/TagList";
import { getPostContentByFilename, getPostFilenames, PostFrontmatter } from "../../../lib/post";
import matter from 'gray-matter'
import { ConvertMdToHtml } from "../../../lib/md";
import { DateFormat } from "../../../lib/stringlib";

const MESSAGE_NO_POST_FOUND = 'No Post found in /article directory!';

interface staticPropsParams extends ParsedUrlQuery{
    slug: string
};

function renderPostMetaData(tags: string[], date: Date) {
  return <div>
    <p>{DateFormat.CleanReadable(date)}</p>
    { tags? <TagList tags={tags} /> : <></>}
  </div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = getPostFilenames();
  if (!filenames) throw new Error(MESSAGE_NO_POST_FOUND);
  const paths = filenames.map(filename => ({ params: { slug: filename}}));
  return {
    paths: paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps<PageParams, staticPropsParams> = async (context) => {
  if(!context.params?.slug)
    return {
      notFound: true
    }
  
  const { slug } = context.params;
  const postContent = getPostContentByFilename(slug);
  const frontmatter = matter(postContent);
  const mdContent = frontmatter.content;
  const articleData = frontmatter.data as PostFrontmatter;

  return {
    props: {
      content: mdContent,
      data: articleData 
    }
  }
}

type PageParams = {
  content: string,
  data: PostFrontmatter 
}

const ArticlePage: NextPage<PageParams> = (props: PageParams) => {
  const { content, data } = props;
  const procesedMd = ConvertMdToHtml(content);
  // const tags = data.tags ? getArticleTags(data.tags) : [];
  return <PageLayout>
    <>
      {renderPostMetaData(data.tags || [], new Date(data.date))}
      <div dangerouslySetInnerHTML={{ __html: procesedMd}}></div>
    </>
  </PageLayout>
};

export default ArticlePage;
