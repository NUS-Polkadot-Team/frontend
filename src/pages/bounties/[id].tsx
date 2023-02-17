import Head from 'next/head';

import { Container } from '@/components/Layout/LayoutContainer';
import { useRouter } from 'next/router';
import bounties from '@/data/bounties';

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
        <title>ArtFi - Bounties</title>
        <meta
          name="description"
          content="Building communities of artists, Empowering the creator economy"
        />
      </Head>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            {bounty.title}
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">

          <div className='grid grid-cols-3'>
            <div>
              <div>
                asd
              </div>
            </div>
            <div>
              asd
            </div>
            <div>
              asd
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
