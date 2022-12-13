import React, { useEffect, useState } from 'react';
import Navbar from "../component/Navbar"
import Footer from '../component/Footer';
import Head from 'next/head';
import BlogContext, { BlogContextState, UserState } from '../context/BlogContext';
import { getUserDataFromJwt } from '../lib/client';

interface PageProps {
  children: React.ReactNode
}

export default function PageLayout(props: PageProps) {
  const { children } = props;
  const [ isLoggedIn, setisLoggedIn ] = useState(false);
  const [ user, setUser ] = useState<UserState>(null);
  
  function logout() {
    localStorage.removeItem('jwt');
    setisLoggedIn(false);
  }
  
  const contextState: BlogContextState = {
    isLoggedIn,
    user,
    func: {
      logout
    }
  }

  function checkIsLoggedIn() {
    const jwToken = localStorage.getItem('jwt');
    if (jwToken){
      setisLoggedIn(true);
      setUser(getUserDataFromJwt(jwToken));
    }
  }
  useEffect(() => {
    checkIsLoggedIn(); 
  }, []);
  
  return <>
    <BlogContext.Provider value={contextState}>
      <Navbar/>
      <main >
        <Head>
          <title>Nabeel</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
      </main>
      <Footer/>
    </BlogContext.Provider>
  </>
}