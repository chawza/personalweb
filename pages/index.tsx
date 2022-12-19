import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PostList from '../component/PostList';
import { Post } from '../types/post';
import styles from '../styles/home.module.css';
import PageLayout from '../layout/PageLayout';
import { getPostContentByFilename, getRecentPostFilename, PostFrontmatter } from '../lib/post';
import matter, { GrayMatterFile } from 'gray-matter';

type contactItem = {
  icon: string,
  alt_icon: string,
  value: string,
  link: string | undefined,
  target: string
}

const contact_list: contactItem[] = [
  {
    alt_icon: 'email icon', value: 'nabeelkahlil403@gmail.com', link: '/',
    icon: require('/public/icons/email-icon.svg'), target:''
  },
  {
    alt_icon: 'linkdn icon', value: 'nabeel403', link: 'https://www.linkedin.com/in/nabeel403/',
    icon: require('/public/icons/linkdin-icon.svg'), target:'_blank'
  },
  {
    alt_icon: 'Twitter Icon', value: 'Nabeel403', link: 'https://twitter.com/Nabeel403',
    icon: require('/public/icons/twitter-icon.svg'), target:'_blank'
  },
  {
    alt_icon: 'Github icon', value: 'Chawza', link: 'https://github.com/chawza',
    icon: require('/public/icons/github-icon.svg'), target:'_blank'
  }
]

const renderContactItem = (contact: contactItem, index: number) => {
  return <div className={styles.contactItem} key={index}>
    <Link href={contact.link || '#'} target='_blank'>
      <div>
        <Image
          src={contact.icon}
          alt={contact.alt_icon}
          width={30}
          height={30}
        />
        <p>{contact.value}</p>
      </div>
    </Link>
  </div>
}

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
      <section>
        <div className={styles.contactContainer}>
          {contact_list.map((contact, index) => renderContactItem(contact, index))}
        </div>
      </section>

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
            if you want to hire me, you can download my {<Link href=''>resume</Link>} or find more about me {<Link href='/about'>Here</Link>}.
          </p>
        </main>
      </section>

      <section className={styles.postSection}>
        <h2>latest post</h2>
        <PostList posts={posts}/>
      </section>
    </div>
  </PageLayout>
};
