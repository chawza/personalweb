import { GetStaticProps } from 'next';
import Head from 'next/head'
import Link from 'next/link';
import { getRecentPost } from './api/post';
import Navbar from './component/Navbar';
import PostList from './component/PostList';
import { Post } from '../types/post';
import styles from '../styles/home.module.css';

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getRecentPost(false, 3);
  return {
    props: {
      posts
    }
  }
}

interface HomeProps {
  posts: Post[]
}

export default function Home(props: HomeProps) {
  const { posts } = props;
  return <div className={styles.container}>
    <Head>
      <title>Nabeel</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Navbar/>

    <main>
      <section className={styles.introSection}>
        <h1>
          Hello my name is Nabeel Kahlil Maulana
        </h1>
        <p>I&apos;m a Software Engineer</p>
        <p>
          Welcome to my website. This is where you can find information about me. I post articles on various
          topic in my {<Link href='/blog'>Blog</Link>} that discusses about programming, machine learning, books, and other stuff you might interested.
        </p>
        <p>
          if you want to hire me, you can download my {<Link href=''>resume</Link>} or find more about me {<Link href='/about'>Here</Link>}.
        </p>
      </section>
      <section className={styles.postSection}>
        <h2>latest post</h2>
        <PostList posts={posts}/>
      </section>
    </main>
  </div>
};
