import React, { useState, useEffect } from "react";
import { map } from "lodash";

import { getGraffleUrl } from "../../general/helpers";
import Loading from "../../general/Loading";
import classNames from "classnames";

const SingleBidHistory = ({ drop, latestMessage }) => {
  const [bidHistory, setBidHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const bids = await (
      await fetch(
        getGraffleUrl(`?eventType=A.CONTRACT.Versus.Bid&dropId=${drop.dropId}`)
      )
    ).json();
    setBidHistory(map(bids, (b) => ({ ...b.blockEventData, id: b.id })));
    setLoading(false);
  }, []);
  useEffect(() => {
    setBidHistory([
      { ...latestMessage.blockEventData, id: latestMessage.id },
      ...bidHistory,
    ]);
  }, [latestMessage]);
  return (
    <div>
      <h2 className="font-black font-inktrap text-2xl sm:text-4xl">Activity</h2>
      {loading ? (
        <Loading className="h-24" />
      ) : (
        <div className="w-full mt-6">
          {bidHistory.length ? (
            <>
              <div className="grid grid-cols-12 font-inktrap font-black text-sm uppercase">
                <div className="col-span-2 hidden sm:block">Rank</div>
                <div className="col-span-9 sm:col-span-8">Bidders Name</div>
                <div className="col-span-3 sm:col-span-2">Bid</div>
              </div>
              <div className="pt-3">
                {map(bidHistory, (b, index) => (
                  <div
                    key={b.id}
                    className={classNames(
                      "grid grid-cols-12 font-inktrap py-3",
                      {
                        "font-bold": index === 0,
                      }
                    )}
                  >
                    <div className="col-span-2 hidden sm:block">
                      {index + 1}
                    </div>
                    <div className="col-span-9 sm:col-span-8">{b.bidder}</div>
                    <div className="col-span-3 sm:col-span-2">F{b.price}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No bids have been placed yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleBidHistory;
