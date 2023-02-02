import Link from 'next/link';
import style from '../styles/component/Navbar.module.css';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import React from 'react';


const iconBurgerPath = "/icons/burger-navigation.svg" 

export default function Navbar() {
  const [IsExpandNavList, setExpandNavList] = useState(false)

  const handleToggleClick = () => {
    setExpandNavList(!IsExpandNavList);
  }

  const navbarListClassName = IsExpandNavList ? style.navbarListExpand : style.navbarList;

  return <nav className={style.navbarContainer}>
    <div className={style.navbarLogo}>
        <Link className={style.navbarLink} href='/'>NKM</Link>
    </div>
    <div
      className={navbarListClassName}
    >
      <div className={style.navbarItem}>
        <Link href='/about'>About</Link>
      </div>
      <div className={style.navbarItem}>
        <Link href='/blog'>Blog</Link>
      </div>
      { IsExpandNavList ?
        <div
          className={style.navExpandedBtn}
          onClick={handleToggleClick} 
        >
          <Image
            src={'/icons/close-nav-btn.svg'}
            height={30}
            width={30}
            alt="button collapse nav list"
          />  
        </div> : <></>
      }
    </div>
    {
      !IsExpandNavList ?
        <div
          className={style.navBurgerBtn}
          onClick={handleToggleClick}
        >
          <Image
            src={iconBurgerPath}
            height={40}
            width={40}
            alt="navigation toggle"
          /> 
        </div> :
        <></>
    }
  </nav>
}