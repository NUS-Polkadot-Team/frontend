import Head from 'next/head';
import Link from 'next/link';
import type { SVGProps, useMemo } from 'react';
import { parse } from 'rss-to-json';

import { Container } from '@/components/Layout/LayoutContainer';
import { FormattedDate } from '@/components/Layout/FormattedDate';

interface BountyEntryProps {
  bounty: Bounty;
}

export interface Submission {
  published: string; //date the submission was published
  title: string; // title of the submission
  image: {
    src: string;
    type: string;
  }; // image used for the submission
  address: string; // address of the submission
  artistAddress: string; // artist address of the submission
  bountyAddress: string; // bounty address of the submission
}

export interface Bounty {
  published: string; //date the bounty was published
  title: string; // title of the bounty
  image: {
    src: string;
    type: string;
  }; // image used for the bounty
  address: string; // address of the bounty
  description: string; // description of the bounty
  prize: string; // prize in eth of the bounty
  designsRequired: string; // number of designs required for the bounty
  selectedDesign: string; // address of selected design
}

const bounties = [
  {
    published: '2021-08-01',
    title: 'The Most Tragically Misunderstood Person of Our Time',
    image: {
      src: '/images/episodes/1.jpg',
      type: 'image/jpeg',
    },
    address: '0x1',
    description: 'The Most Tragically Misunderstood Person of Our Time',
    prize: '0.1',
    designsRequired: '1',
    selectedDesign: '',
  },
];

function BountyEntry({ bounty }: BountyEntryProps) {
  let date = new Date(bounty.published);

  return (
    <article
      aria-labelledby={`episode-${bounty.address}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`episode-${bounty.address}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link href={`/${bounty.address}`}>{bounty.title}</Link>
          </h2>
          <FormattedDate
            date={date}
            className="order-first font-mono text-sm leading-7 text-slate-500"
          />
          <p className="mt-1 text-base leading-7 text-slate-700">
            {bounty.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Link
              href={`/bounties/${bounty.address}`}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
            >
              <span className="ml-3" aria-hidden="true">
                {bounty.prize} eth
              </span>
            </Link>
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link
              href={`/bounties/${bounty.address}`}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
            >
              View
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}

interface HomeProps {
  bounty: Bounty[];
}

export default function Home({ bounty }: HomeProps) {
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
            Bounties
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {bounties.map((bounty) => (
            <BountyEntry key={bounty.address} bounty={bounty} />
          ))}
        </div>
      </div>
    </>
  );
}

// export async function getStaticProps() {
//   let feed = await parse('https://their-side-feed.vercel.app/api/feed')

//   return {
//     props: {
//       bounty: feed.items.map(
//         ({ id, title, description, enclosures, published }) => ({
//           id,
//           title: `${id}: ${title}`,
//           published,
//           description,
//           audio: enclosures.map((enclosure: { url: string; type: string }) => ({
//             src: enclosure.url,
//             type: enclosure.type,
//           }))[0],
//         })
//       ),
//     },
//     revalidate: 10,
//   }
// }
