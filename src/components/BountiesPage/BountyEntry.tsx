import { FormattedDate } from '@/components/Layout/FormattedDate';
import { Container } from '@/components/Layout/LayoutContainer';
import type { Bounty } from '@/data/bounties';
import usePolkadot from '@/hooks/usePolkadot';
import Link from 'next/link';
import Identicon from '../Layout/Identicon';

interface BountyEntryProps {
  bounty: Bounty;
}

export default function BountyEntry({ bounty }: BountyEntryProps) {
  return (
    <article
      aria-labelledby={`bounty-${bounty.address}-title`}
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
