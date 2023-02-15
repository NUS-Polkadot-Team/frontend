import '@/styles/tailwind.css';
import 'focus-visible';

import { Layout } from '@/components/Layout';
import {
  SubstrateContextProvider,
  useSubstrate,
} from '@/context/SubstrateContext';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

const layoutRoutes = ['/bounty'];

export default function App({ Component, pageProps, router }: AppProps) {
  const showLayout = layoutRoutes.includes(router.route);
  // const { apiState, keyring, keyringState, apiError } = useSubstrate();

  // console.log({ apiState, keyring, keyringState, apiError });

  return (
    <SubstrateContextProvider>
      {showLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </SubstrateContextProvider>
  );
}
