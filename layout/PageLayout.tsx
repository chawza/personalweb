import Navbar from "../component/Navbar"
import type { AppProps } from 'next/app'
import React from 'react';

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
  </>
}