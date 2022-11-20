import Head from 'next/head'
import styles from '../styles/index.module.css'
import Link from 'next/link';
import Navbar from './component/Navbar';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nabeel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>

      <main className={styles.main}>
        <h1 className='h1'>
          Hello my name is Nabeel Kahlil Maulana
        </h1>
        <p>I&apos;m a Software Engineer</p>

        <div>
          <p>
            Welcome to my website. This is where you can find information about me. I post articles on various
            topic in my {<Link href=''>Blog</Link>} that discusses about programming, machine learning, books, and other stuff you might interested.
          </p>
          <p>
            if you want to hire me, you can download my {<Link href=''>cv</Link>} or find more about me {<Link href='/about'>Here</Link>}
          </p>
        </div>

        <div className='articles-container'>
          
        </div>
      </main>
    </div>
  )
}
