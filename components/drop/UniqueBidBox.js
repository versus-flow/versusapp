import React, { useState, useRef } from "react";
import classnames from "classnames";
import { includes, get } from "lodash";

import BidOnUnique from "./BidOnUnique";
import Lock from "../../assets/lock.svg";
import { getWrittenTimer } from "./DropContent";

const UniqueBidBox = ({
  drop,
  winning,
  ended,
  hasntStarted,
  user,
  timeRemaining,
}) => {
  const [openBid, setOpenBid] = useState(false);
  const form = useRef(null);
  const openBidBox = (e) => {
    e.preventDefault();
    const { bid } = form.current;
    setOpenBid(bid.value);
  };
  let Counter = <></>;
  if (timeRemaining > 0) {
    const timer = getWrittenTimer(timeRemaining);
    Counter = (
      <div className="border-regGrey border-t mt-16 pt-6 w-full">
        <h4 className="font-inktrap font-semibold tracking-wide">
          Auction ends in
        </h4>
        <div className="gap-6 grid grid-cols-4 mb-6 mt-2 mx-auto w-64">
          {timer.days ? (
            <div className="flex flex-col">
              <span className="block font-black text-3xl">{timer.days}</span>
              <span className="mt-1 text-xs">Days</span>
            </div>
          ) : (
            ""
          )}
          {timer.hours || timer.days ? (
            <div className="flex flex-col">
              <span className="block font-black text-3xl">{timer.hours}</span>
              <span className="mt-1 text-xs">hours</span>
            </div>
          ) : (
            ""
          )}
          {timer.minutes || timer.hours || timer.days ? (
            <div className="flex flex-col">
              <span className="block font-black text-3xl">{timer.minutes}</span>
              <span className="mt-1 text-xs">Minutes</span>
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col">
            <span className="block font-black text-3xl">
              {timer.seconds.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              }) || "00"}
            </span>
            <span className="mt-1 text-xs">Seconds</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {openBid && (
        <BidOnUnique
          close={() => setOpenBid(false)}
          defaultBid={openBid}
          drop={drop}
          ended={ended}
        />
      )}
      <div className="bg-cream-500 text-center p-8 relative w-full rounded-lg flex flex-col transform">
        <div className="mb-6">
          <span className="font-bold font-inktrap text-sm">1/1</span>
          <h3 className="font-black font-inktrap text-2xl">Own the unique</h3>
        </div>
        <div className="">
          <p className="">Current bid:</p>
          <p className="font-black font-inktrap mt-1 text-4xl">
            F{parseFloat(get(drop, "uniqueStatus.price")).toFixed(2)}
          </p>
          <p className="font-bold mt-1 opacity-50">$0</p>
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
                step="0.1"
              />
              <Lock className="absolute h-4 right-4 top-1/2 transform -translate-y-1/2" />
            </div>
            <input
              type="submit"
              className="standard-button full-button mt-6 h-full px-6 w-full"
              value="Place Bid"
            />
            {Counter}
          </form>
        </div>
      </div>
    </>
  );
};

export default UniqueBidBox;
