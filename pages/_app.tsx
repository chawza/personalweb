import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from '@next/font/google'

const robotFont = Roboto({weight: '400'})

export default function App({ Component, pageProps }: AppProps) {
  return <main className={robotFont.className}>
    <Component {...pageProps} />
  </main>
}
