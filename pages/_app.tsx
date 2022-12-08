import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from '@next/font/google'

const robotFont = Roboto({weight: '400'})

export default function App({ Component, pageProps }: AppProps) {
  // TODO: Create useContext for storing states and data
  // 1. User's data
  // 2. User's logged in state

  return <div className={robotFont.className}>
    <Component {...pageProps} />
  </div>
}
