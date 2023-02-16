import { Layout } from '@/components/Layout'
import type { AppProps } from 'next/app'

import '@/styles/tailwind.css'
import 'focus-visible'

const layoutRoutes = ['/bounties', '/artists']

export default function App({ Component, pageProps, router }: AppProps) {
  const showLayout = layoutRoutes.includes(router.route)

  return (
    <>
      {showLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}
