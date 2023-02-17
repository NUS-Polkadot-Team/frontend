import { Container } from '@/components/Layout/LayoutContainer';
import type { Artist } from '@/data/artists';
import Link from 'next/link';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiCopy } from 'react-icons/fi';

interface ArtistEntryProps {
  artist: Artist;
}

export default function ArtistsEntry({ artist }: ArtistEntryProps) {
  const {
    name,
    description,
    image,
    artworks,
    bountiesCompleted,
    joined,
    address,
  } = artist || {};

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  if (!artist) {
    return null;
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
  };

  return (
    <Container className="py-10">
      <div className="flex h-screen flex-col items-center bg-gray-100 pt-10">
        <div className="relative h-5/6 w-full">
          <Image src={image} alt={name} layout="fill" objectFit="cover" />
        </div>
        <div className="relative z-10 -mt-20 flex w-full max-w-screen-md flex-col items-center rounded-t-3xl bg-white px-6 py-10 shadow-lg">
          <div className="flex items-center">
            <h1 className="mr-4 text-4xl font-bold">{name}</h1>
            {copied ? (
              <span className="text-green-500">Copied!</span>
            ) : (
              <FiCopy
                className="cursor-pointer text-gray-400"
                onClick={handleCopyAddress}
              />
            )}
          </div>
          <p className="mb-6 text-lg text-gray-500">{description}</p>
          <div className="mb-6 flex items-center">
            <span className="mr-4 text-gray-500">
              {artworks.length} Artworks
            </span>
            <span className="mr-4 text-gray-500">
              {bountiesCompleted} Bounties Completed
            </span>
            <span className="text-gray-500">{joined}</span>
          </div>
          <div className="flex flex-col items-center">
            {artworks.length > 0 ? (
              artworks.map((artwork) => (
                <Link
                  key={artwork} // the artwork should be an address
                  href={`/bounties/${artwork}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-2 text-blue-500 hover:text-blue-600"
                >
                  {artwork}
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No artworks yet</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
