import { Post } from "../types/post"
import Link from 'next/link'
import { capitalFirstLetter, DateFormat } from '../lib/stringlib';
import Router from 'next/router';
import Image from "next/image";
import styles from '../styles/PostList.module.css';
import { cookHeader } from "../lib/client";
import { useContext } from "react";
import BlogContext from "../context/BlogContext";
import TagList from '../component/TagList'

interface postListProps {
  posts: Post[],
};

async function handleDeleteRow(postId: string) {
  try {
    const res = await fetch(`/api/blog/post/${postId}`, {
      headers: cookHeader(),
      method: 'DELETE',
    });
    if (!res.status.toString().startsWith('2')) {
      throw new Error('Unable to delete post')
    }
    const { message } = await res.json();
    if (!res.status.toString().startsWith('2')) {
      alert(message);
    } else {
      alert(message)
      setTimeout(() => Router.reload(), 2000);
    }
  }
  catch (error) {
    if (error instanceof Error) {
      console.error(error)
      alert(`${error.message}`)
    }
  }
}

function renderPostRow (post: Post, index: number, isLoggedIn: boolean = false) {
  const url = { pathname: '/blog/article/[id]', query: { id: post.id }}
  return <div className={styles.articleRow} key={index}>
    <div className={styles.articleRowContent}>
      <h3><Link href={url}>{capitalFirstLetter(post.title)}</Link></h3>
      <p>{DateFormat.CleanReadable(post.add_date)}</p>
      {
        !!post.tag && <TagList tags={post.tag}/> 
      }
    </div>
    <div className={styles.articleRowSide}>
      { isLoggedIn &&
        <div className={styles.trashIcon} onClick={() => handleDeleteRow(post.id)}>
          <Image
            src={require('/public/icons/trash-icon.svg')}
            alt="trash icon"
            width={22}
            height={24}
          />   
        </div>
      } 
    </div>
  </div> 
}

export default function PostList(props: postListProps) {
  const { isLoggedIn } = useContext(BlogContext);
  const { posts } = props;
  return <div>
    {posts && posts.map((post, index) => renderPostRow(post, index, isLoggedIn))}
  </div>
}