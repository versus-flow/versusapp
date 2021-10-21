import { find, map } from "lodash";

import BidRow from "./BidRow";

const DutchBidHistory = ({ id, myBids, bids }) => {
  const fullBid = (myBid) => find(bids.bids, (b) => b.id === myBid.id);
  return (
    <div className="py-12 w-full">
      <h2 className="font-black font-inktrap text-2xl sm:text-4xl">Activity</h2>

      <div className="mt-8">
        {myBids.length ? (
          <>
            <div className="grid grid-cols-12 font-inktrap font-black text-sm uppercase mb-3">
              <div className="col-span-2">Amount</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 sm:col-span-2">Time</div>
              <div className="col-span-6"></div>
            </div>
            {map(myBids, (b) => (
              <BidRow key={`bid${b.id}`} bid={b} id={id} fullBid={fullBid(b)} />
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
