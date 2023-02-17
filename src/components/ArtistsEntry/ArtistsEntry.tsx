import { FormattedDate } from '@/components/Layout/FormattedDate';
import { Container } from '@/components/Layout/LayoutContainer';
import usePolkadot from '@/hooks/usePolkadot';
import Link from 'next/link';
import Identicon from '../Layout/Identicon';
import type { Artist } from '@/data/artists';

interface ArtistEntryProps {
  artist: Artist;
}

export default function ArtistsEntry({ artist }: ArtistEntryProps) {
  console.log(artist);

  return (
    <Container className="py-10">
      <div className="div3">
        <div className="div">test</div>
      </div>
    </Container>
  );
}
