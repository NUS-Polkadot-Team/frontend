import { Layout } from '@/components/Layout'
import type { AppProps } from 'next/app'

import '@/styles/tailwind.css'
import 'focus-visible'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
