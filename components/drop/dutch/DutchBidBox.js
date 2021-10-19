import React, { useState, useEffect, useRef } from "react";
import { get } from "lodash";
import Link from "next/link";
import { Lock } from "react-feather";
import BidOnDutch from "./BidOnDutch";

const DutchBidBox = ({ drop, art, user, ended = false, id }) => {
  const [openBid, setOpenBid] = useState(false);
  const form = useRef(null);
  const openBidBox = (e) => {
    e.preventDefault();
    const { bid } = form.current;
    setOpenBid(bid.value);
  };
  return (
    <>
      {openBid && (
        <BidOnDutch
          close={() => setOpenBid(false)}
          defaultBid={openBid}
          drop={drop}
          art={art}
          user={user}
          id={id}
        />
      )}
      <div className="bg-cream-500 text-center relative w-full max-w-xs mx-auto rounded-lg flex flex-col transform shadow-2xl mt-8 md:mt-0">
        <div className="bg-cream-500 relative z-10 p-4 lg:p-8 rounded-lg">
          <div className="mb-6">
            <span className="font-bold font-inktrap text-sm">1/1</span>
            <h3 className="font-black font-inktrap text-2xl">Own the unique</h3>
          </div>
          <div className="">
            <p className="">Current bid:</p>
            <p className="font-black font-inktrap mt-1 text-4xl">
              F{parseFloat(get(drop, "currentPrice")).toFixed(2)}
            </p>
            <p className="font-bold mt-1 opacity-50"></p>
            {get(user, "addr") === get(drop, "uniqueStatus.leader") &&
            get(drop, "uniqueStatus.leader") ? (
              <p className="mt-2 text-lg font-bold absolute w-full text-center left-0">
                You are the highest bidder
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mt-12 mb-2">
            {ended ? (
              <p>
                Highest bid by{" "}
                <Link
                  href={`/profile/${get(drop, "uniqueStatus.leader")}`}
                  className="underline"
                >
                  <a>{get(drop, "uniqueStatus.leader")}</a>
                </Link>
              </p>
            ) : (
              <form
                className="relative w-full uppercase flex flex-col sm:block"
                onSubmit={openBidBox}
                ref={form}
              >
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Enter Bid"
                    name="bid"
                    className="placeholder-black-200 w-full bg-white text-black-500 rounded border-none px-4 py-3 outline-none no-show-drop"
                    step="0.01"
                  />
                  <Lock className="absolute h-4 right-4 top-1/2 transform -translate-y-1/2" />
                </div>
                <input
                  type="submit"
                  className="standard-button full-button mt-6 h-full px-6 w-full"
                  value="Place Bid"
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DutchBidBox;
