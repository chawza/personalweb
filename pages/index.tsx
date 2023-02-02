import Link from 'next/link';
import PostList from '../component/PostList';
import { Post } from '../types/post';
import styles from '../styles/home.module.css';
import PageLayout from '../layout/PageLayout';
import { getPostContentByFilename, getRecentPostFilename, PostFrontmatter } from '../lib/post';
import matter from 'gray-matter';
import ContactList from '../component/ContactList';


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

interface HomeProps {
 posts: Post[] 
}

export default function Home(props: HomeProps) {
  const { posts } = props;
  return <PageLayout>  
    <div>   
      <section className={styles.introSection}>
        <main>
          <h1>
            Hello my name is Nabeel Kahlil Maulana
          </h1>
          <p>I&apos;m a Software Engineer</p>
          <p>
            Welcome to my website. This is where you can find information about me. I post articles on various
            topic in my {<Link href='/blog'>Blog</Link>} that discusses about programming, machine learning, books, and other stuff you might interested.
          </p>
          <p>
            if you want to hire me, you can download my <a href="/files/resume.pdf" download="resume.pdf">resume</a> or find more about me {<Link href='/about'>Here</Link>}.
          </p>
        </main>
      </section>

      <section>
        <ContactList/> 
      </section>

      <section className={styles.postSection}>
        <h2>latest post</h2>
        <PostList posts={posts}/>
      </section>
    </div>
  </PageLayout>
};
