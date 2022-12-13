import { useContext, useEffect, useState } from "react";
import Link from "next/link"
import styles from '../styles/component/Footer.module.css';
import BlogContext from "../context/BlogContext";

function renderUploadLink () {
  const token = localStorage.getItem('jwt');
  if (!token) return <></>;

  const url = new URL(`${location.origin}/blog/article/editor`)
  url.searchParams.set('token', token)
  return <Link href={url.toString()} >Upload</Link>
}

export default function Footer() {
  const { isLoggedIn, func: { logout } } = useContext(BlogContext); 
  
  return <footer className={styles.footer}>
    <div>
        {isLoggedIn
          ? <Link href='/' onClick={logout}>Logout</Link>
          : <Link href='/auth/login'>Login</Link>}
        {isLoggedIn
          ? renderUploadLink()
          : <></>}
    </div>
  </footer>
}