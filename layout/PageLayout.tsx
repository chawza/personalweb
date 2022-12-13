import React from 'react';
import Navbar from "../component/Navbar"
import Head from 'next/head';
import styles from '../styles/layout/PageLayout.module.css';

interface PageProps {
  children: React.ReactNode
}

export default function PageLayout(props: PageProps) {
  const { children } = props;
  return <>
    <Navbar/>
    <main className='normalContainer'>
      <Head>
        <title>Nabeel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </main>
  </>
}