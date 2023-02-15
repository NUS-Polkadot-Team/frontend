import '@/styles/tailwind.css';
import 'focus-visible';

import { Layout } from '@/components/Layout';
import type { AppProps } from 'next/app';

const layoutRoutes = ['/bounty'];

export default function App({ Component, pageProps, router }: AppProps) {
  const showLayout = layoutRoutes.includes(router.route);

  if (showLayout) {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }

  return <Component {...pageProps} />;
}
