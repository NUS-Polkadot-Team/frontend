import type { Bounty } from '@/data/bounties';
import { dateFormatter } from '../Layout/FormattedDate';

interface BountyDetailsProps {
  bounty: Bounty;
}

const BountyDetails = ({
  bounty: { status, address, deadline, published, prize, token },
}: BountyDetailsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <h3 className="font-bold">Status</h3>
        <p className="text-sm font-semibold capitalize text-slate-600">
          {status}
        </p>
      </div>
      <div className="col-span-2">
        <h3 className="font-bold">Address</h3>
        <p className="text-sm font-semibold capitalize text-slate-600">
          {address}
        </p>
      </div>
      <div className="grid gap-4">
        <div>
          <h3 className="font-bold">Created</h3>
          <p className="text-sm font-semibold capitalize text-slate-600">
            {dateFormatter.format(new Date(published))}
          </p>
        </div>
        <div>
          <h3 className="font-bold">Deadline</h3>
          <p className="text-sm font-semibold capitalize text-slate-600">
            {dateFormatter.format(new Date(deadline))}
          </p>
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <h3 className="font-bold">Bounty</h3>
          <p className="text-sm font-semibold capitalize text-slate-600">
            {prize} {token}
          </p>
        </div>
        <div>
          <h3 className="font-bold">Deadline</h3>
          <p className="text-sm font-semibold capitalize text-slate-600">
            {dateFormatter.format(new Date(deadline))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BountyDetails;
