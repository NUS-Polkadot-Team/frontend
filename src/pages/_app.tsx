import '@/styles/tailwind.css';
import 'focus-visible';

import { Layout } from '@/components/Layout/Layout';
import type { AppProps } from 'next/app';
import { PolkadotProvider } from '@/context/PolkadotContext';

// include the [id] route in the layoutRoutes array
const layoutRoutes = ['/'];

export default function App({ Component, pageProps, router }: AppProps) {
  const showLayout = !layoutRoutes.includes(router.route);

  return (
    <PolkadotProvider>
      {showLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </PolkadotProvider>
  );
}
