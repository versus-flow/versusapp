import React, { useState } from "react";
import classnames from "classnames";

import BidOnUnique from "./BidOnUnique";
import Lock from "../../assets/lock.svg";

const UniqueBidBox = () => {
  const [openBid, setOpenBid] = useState(false);
  return (
    <>
      {openBid && <BidOnUnique close={() => setOpenBid(false)} />}
      <div class="bg-cream-500 text-center p-8 relative w-full rounded-lg flex flex-col transform">
        <div class="mb-6">
          <span class="font-bold font-inktrap text-sm">1/1</span>
          <h3 class="font-black font-inktrap text-2xl">Own the unique</h3>
        </div>
        <div class="">
          <p class="">Current bid:</p>
          <p class="font-black font-inktrap mt-1 text-4xl">F32</p>
          <p class="font-bold mt-1 opacity-50">$0</p>
        </div>
        <div class="mt-12 mb-2">
          <form
            class="relative w-full uppercase flex flex-col sm:block"
            onSubmit={(e) => {
              e.preventDefault();
              setOpenBid(true);
            }}
          >
            <div className="relative">
              <input
                type="number"
                placeholder="Enter Bid"
                name="bid"
                class="placeholder-black-200 w-full bg-white text-black-500 rounded border-none px-4 py-3 outline-none"
                step="0.1"
              />
              <Lock className="absolute h-4 right-4 top-1/2 transform -translate-y-1/2" />
            </div>
            <input
              type="submit"
              class="standard-button full-button mt-6 h-full px-6 w-full"
              value="Place Bid"
            />
            <div className="border-regGrey border-t mt-16 pt-6 w-full">
              <h4 className="font-inktrap font-semibold tracking-wide">
                Auction ending in
              </h4>
              <div className="gap-12 grid grid-cols-3 mb-6 mt-2 mx-auto w-64">
                <div className="flex flex-col">
                  <span className="block font-black text-3xl">22</span>
                  <span className="mt-1 text-xs">Hours</span>
                </div>
                <div className="flex flex-col">
                  <span className="block font-black text-3xl">11</span>
                  <span className="mt-1 text-xs">Minutes</span>
                </div>
                <div className="flex flex-col">
                  <span className="block font-black text-3xl">08</span>
                  <span className="mt-1 text-xs">Seconds</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UniqueBidBox;
