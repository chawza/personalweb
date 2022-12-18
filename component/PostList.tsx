import Link from 'next/link';
import { capitalFirstLetter, DateFormat } from '../lib/stringlib';
import styles from '../styles/PostList.module.css';
import TagList from '../component/TagList'
import { Post } from '../types/post';
import { getPostTitle } from '../client/article';
import { PostFrontmatter } from '../lib/post';

interface postListProps {
  posts: Post[]
};

function renderPostRow(index: number, data: PostFrontmatter, content: string, slug: string) {
  const url = { pathname: '/blog/article/[slug]', query: { slug }};
  const postTitle = getPostTitle(content) || 'Untitled' ;
  return <div className={styles.articleRow} key={index}>
    <div className={styles.articleRowContent}>
      <h3><Link href={url}>{capitalFirstLetter(postTitle)}</Link></h3>
      <p>{DateFormat.CleanReadable(new Date(data.date))}</p>
      {
        !!data.tags && <TagList tags={data.tags}/> 
      }
    </div>
  </div> 
}

export default function PostList(props: postListProps) {
  const { posts } = props;

  return <div>
    { posts
      ? posts.map((post, index) => renderPostRow(index, post.data, post.content, post.slug))
      : <></>
    }
  </div>
}