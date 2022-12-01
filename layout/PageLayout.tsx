import React from 'react';
import Navbar from "../component/Navbar"
import Footer from '../component/Footer';
import Head from 'next/head';

interface PageProps {
  children: React.ReactNode
}

export default function PageLayout(props: PageProps) {
  const { children } = props;
  return <>
    <Navbar/>
    <main>
      <Head>
        <title>Nabeel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </main>
    <Footer/>
  </>
}