import { useEffect, useState } from "react";
import Link from "next/link"
import styles from '../styles/component/Footer.module.css';

function renderUploadLink () {
  const token = localStorage.getItem('jwt');
  if (!token) return <></>;

  const url = new URL(`${location.origin}/blog/article/upload`)
  url.searchParams.set('token', token)
  return <Link href={url.toString()} >Upload</Link>
}

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInBlog, setisInBlog] = useState(false)

  function checkJwt() {
    if (localStorage.getItem('jwt')) {
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  }

  function checkPathname() {
    if (location.pathname.startsWith('/blog'))
      setisInBlog(true);
  }

  useEffect(() => {
    checkJwt();
    checkPathname();
  }, [])

  function logout() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false)
  }

  return <footer className={styles.footer}>
    <div>
        {isLoggedIn
          ? <Link href='/' onClick={logout}>Logout</Link>
          : <Link href='/auth/login'>Login</Link>}
        {isInBlog && isLoggedIn
          ? renderUploadLink()
          : <></>}
    </div>
  </footer>
}