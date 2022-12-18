import React from 'react';
import Footer from '../component/Footer';
import Head from 'next/head';

interface PageProps {
  children: React.ReactNode
}

export default function PageLayout(props: PageProps) {
  const { children } = props;
  
  return <>
      <main >
        <Head>
          <title>Nabeel</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
      </main>
      <Footer/>
  </>
}