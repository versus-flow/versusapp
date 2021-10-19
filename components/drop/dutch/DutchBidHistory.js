import { map } from "lodash";

import BidRow from "./BidRow";

const DutchBidHistory = ({ id, bids }) => {
  const actualbids = bids.bids;
  return (
    <div className="py-12 w-full">
      <h2 className="font-black font-inktrap text-2xl sm:text-4xl">Activity</h2>

      <div className="mt-8">
        {actualbids.length ? (
          <>
            <div className="grid grid-cols-12 font-inktrap font-black text-sm uppercase mb-3">
              <div className="col-span-2">Amount</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 sm:col-span-2">Time</div>
              <div className="col-span-6"></div>
            </div>
            {map(actualbids, (b) => (
              <BidRow key={`bid${b.id}`} bid={b} id={id} />
            ))}
          </>
        ) : (
          <p>No bids Yet</p>
        )}
      </div>
    </div>
  );
};

export default DutchBidHistory;
