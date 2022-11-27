import Link from 'next/link';
import style from '../../styles/component/Navbar.module.css';

export default function Navbar() {
  return <nav className={style.navbarContainer}>
    <div className={`${style.navbarItem} ${style.navbarItemLeft}`}>
      <Link className={style.navbarLink} href='/'>NKM</Link>
    </div>
    <div className={style.navbarItem}>
      <Link href='/about'>About</Link>
    </div>
    <div className={style.navbarItem}>
      <Link href='/blog'>Blog</Link>
    </div>
  </nav>
}