import React, { useState, useRef } from "react";
import classnames from "classnames";

import Drop from "../../assets/drop.svg";
import BidOnEdition from "./BidOnEdition";

const EditionBidBox = () => {
  const [openBid, setOpenBid] = useState(false);
  const form = useRef(null);
  const chooseEdition = (e) => {
    e.preventDefault();
    const { bid } = form.current;
    if (bid.value != 0) setOpenBid(bid.value);
  };
  return (
    <>
      {openBid && <BidOnEdition close={() => setOpenBid(false)} />}
      <div className="bg-cream-500 text-center p-8 relative w-full rounded-lg flex flex-col transform">
        <div className="mb-6">
          <span className="font-bold font-inktrap text-sm">1/25</span>
          <h3 className="font-black font-inktrap text-2xl">Own the edition</h3>
        </div>
        <div className="">
          <p className="">Combined total:</p>
          <p className="font-black font-inktrap mt-1 text-4xl">F32</p>
          <p className="font-bold mt-1 opacity-50">$0</p>
        </div>
        <div className="mt-12 mb-2">
          <form
            className="relative w-full uppercase flex flex-col sm:block"
            ref={form}
            onSubmit={chooseEdition}
          >
            <div className="relative">
              <select
                type="number"
                placeholder="Enter Bid"
                name="bid"
                className="placeholder-black-200 w-full bg-white text-black-500 rounded border-none px-4 py-3 outline-none h-12 no-show-drop"
                step="0.1"
              >
                <option value={0} className="text-white">
                  Select edition...
                </option>
                <option value="3">3</option>
              </select>
              <Drop className="absolute h-1 right-4 top-1/2 transform -translate-y-1/2" />
            </div>
            <input
              type="submit"
              className="standard-button full-button mt-6 h-full px-6 w-full"
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

export default EditionBidBox;
