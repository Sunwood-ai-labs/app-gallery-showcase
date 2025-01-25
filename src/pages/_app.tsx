import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Navbar from '@/components/Navbar'
import '../globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-0">
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  )
}

export default MyApp
