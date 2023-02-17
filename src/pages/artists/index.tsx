import Head from 'next/head';

import { Container } from '@/components/Layout/LayoutContainer';

import { ArtistList } from '@/components/ArtistsPage/ArtistList';
import type { StaticImageData } from 'next/image';
interface ArtistEntryProps {
  artist: Artist;
}

export interface Artist {
  username: string; // title of the artist
  description: string; // description of the artist
  bountiesCompleted: string; // number of bounties completed by the artist
  artworks: string[]; // array of bounty addresses
  image: StaticImageData;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>BountiFi - Artists</title>
        <meta
          name="description"
          content="Building communities of artists, Empowering the creator economy"
        />
      </Head>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12 ">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Artists
          </h1>
        </Container>
        <ArtistList />
      </div>
    </>
  );
}
