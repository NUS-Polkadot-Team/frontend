import Head from 'next/head';

import BountyDetails from '@/components/BountyPage/BountyDetails';
import { Container } from '@/components/Layout/LayoutContainer';
import bounties from '@/data/bounties';
import { useRouter } from 'next/router';

export default function BountyPage() {
  const router = useRouter();
  const { id } = router.query;

  const bounty = bounties.filter((bounty) => bounty.address === id)[0];

  if (!bounty) {
    return null;
  }

  return (
    <>
      <Head>
        <title>BountiFi - {id}</title>
        <meta
          name="description"
          content="Building communities of artists, Empowering the creator economy"
        />
      </Head>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="mb-1 text-2xl font-bold leading-7 text-slate-900">
            {bounty.title}
          </h1>
          <span className="font-mono text-sm leading-7 text-slate-700">
            Contract Address: {bounty.address}
          </span>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          <Container>
            <BountyDetails bounty={bounty} />
          </Container>
        </div>
      </div>
    </>
  );
}
