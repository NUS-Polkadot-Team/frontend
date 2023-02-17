import { FormattedDate } from '@/components/Layout/FormattedDate';
import { Container } from '@/components/Layout/LayoutContainer';
import bounties, { Bounty } from '@/data/bounties';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';

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

// needs to be dynamically loaded client side
const Identicon = dynamic(() => import('@polkadot/react-identicon'), {
  ssr: false,
  loading: () => (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-[60px] w-[60px] rounded-full bg-gray-200 dark:bg-gray-600"></div>
    </div>
  ),
});

function BountyEntry({ bounty }: BountyEntryProps) {
  return (
    <article
      aria-labelledby={`episode-${bounty.address}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col">
          <FormattedDate
            text="Posted on: "
            date={new Date(bounty.published)}
            className="font-mono text-sm leading-7 text-slate-500"
          />
          <div className="flex items-center space-x-2">
            <Identicon value={bounty.address} size={60} theme={'polkadot'} />
            <div className="flex flex-col">
              <h2
                id={`episode-${bounty.address}-title`}
                className="mt-2 text-lg font-bold text-slate-900"
              >
                <Link href={`/bounties/${bounty.address}`}>{bounty.title}</Link>
              </h2>
              <p className="mt-1 text-base leading-7 text-slate-700">
                {bounty.description}
              </p>

              <div className="flex items-center gap-4">
                <FormattedDate
                  text="Deadline: "
                  date={new Date(bounty.deadline)}
                  className="font-mono text-sm font-bold leading-7 text-slate-700"
                />
                <span
                  aria-hidden="true"
                  className="text-sm font-bold text-slate-400"
                >
                  /
                </span>
                <span className="font-mono text-sm font-bold capitalize leading-7 text-slate-700">
                  Status: {bounty.status}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Link
              href={`/bounties/${bounty.address}`}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
            >
              <span className="ml-3" aria-hidden="true">
                {bounty.prize} {bounty.token}
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
