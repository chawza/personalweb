import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import PageLayout from "../../../layout/PageLayout";
import TagList from "../../../component/TagList";
import { getPostContentByFilename, getPostFilenames, PostFrontmatter } from "../../../lib/post";
import matter from 'gray-matter'
import { ConvertMdToHtml } from "../../../lib/md";
import { DateFormat } from "../../../lib/stringlib";
import styles from '../../../styles/article.module.css'
import HTMLReactParser from "html-react-parser";

const MESSAGE_NO_POST_FOUND = 'No Post found in /article directory!';

interface staticPropsParams extends ParsedUrlQuery{
    slug: string
};

function renderPostMetaData(tags: string[], date: Date, author: string) {
  return <div className={styles.postMetaContainer}>
    <div className={styles.metaSection}>
      { tags? <TagList tags={tags} /> : <></>}
    </div>
    <div className={styles.metaSection}>
      <p className={styles.author}>by: {author}</p> 
      <p className={styles.postDate}>{DateFormat.CleanReadable(date)}</p>
    </div>
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
  return <PageLayout>
    <>
      {
        renderPostMetaData(
          data.tags || [],
          new Date(data.date),
          data.author
        )
      }
      <div className={styles.postContent}>
        {HTMLReactParser(procesedMd)}
      </div>
    </>
  </PageLayout>
};

export default ArticlePage;
