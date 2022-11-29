import React from 'react';
import Navbar from "../component/Navbar"
import Footer from '../component/Footer';

interface PageProps {
  children: React.ReactNode
}

export default function PageLayout(props: PageProps) {
  const { children } = props;
  return <>
    <Navbar/>
    <main>
      {children}
    </main>
    <Footer/>
  </>
}