import { Container } from '@/components/Layout/LayoutContainer';
import bounties, { Bounty } from '@/data/bounties';
import usePolkadot from '@/hooks/usePolkadot';
import dynamic from 'next/dynamic';
import Head from 'next/head';

export interface Submission {
  published: string; //date the submission was published
  title: string; // title of the submission
  image: string; // image used for the submission
  address: string; // address of the submission
  artistAddress: string; // artist address of the submission
  bountyAddress: string; // bounty address of the submission
}
const BountyEntry = dynamic(
  () => import('../../components/BountiesPage/BountyEntry'),
  { ssr: false }
);

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
