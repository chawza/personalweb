import { useEffect, useState } from "react";
import Link from "next/link"
import styles from '../styles/component/Footer.module.css';

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function checkJwt() {
    if (localStorage.getItem('jwt')) {
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    checkJwt()
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
    </div>
  </footer>
}