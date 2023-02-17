import ArtistsEntry from '@/components/ArtistsEntry/ArtistsEntry';
import { Container } from '@/components/Layout/LayoutContainer';
import artists from '@/data/artists';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function BountyPage() {
  // get the bounties address from the router
  const router = useRouter();
  const { id } = router.query;

  const artist = artists
    .flatMap((info) => info.artists)
    .concat()
    .filter((artist) => artist.address === id)[0];

  return (
    <>
      <Head>
        <title>BountiFi - Artists</title>
        <meta
          name="description"
          content="Building communities of artists, Empowering the creator economy"
        />
      </Head>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">{id}</h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          <ArtistsEntry artist={artist} />
        </div>
      </div>
    </>
  );
}
