import React, { useState, useRef } from "react";
import classnames from "classnames";
import { find, map, reduce, includes, get } from "lodash";

import Drop from "../../assets/drop.svg";
import BidOnEdition from "./BidOnEdition";
import { getWrittenTimer } from "./DropContent";

const EditionBidBox = ({
  drop,
  winning,
  ended,
  hasntStarted,
  user,
  timeRemaining,
}) => {
  const [editionNum, setOpenEdition] = useState(false);
  const form = useRef(null);
  const { editionsStatuses } = drop;
  const totalPrice = reduce(
    editionsStatuses,
    (sum, e) => sum + parseFloat(e.price),
    0
  );
  const totalEditions = reduce(editionsStatuses, (sum) => sum + 1, 0);
  const chooseEdition = (e) => {
    e.preventDefault();
    const { edition } = form.current;
    if (edition.value != 0) setOpenEdition(edition.value);
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
      {editionNum && (
        <BidOnEdition
          close={() => setOpenEdition(false)}
          editionNum={editionNum}
          totalEditions={totalEditions}
          drop={drop}
          ended={ended}
        />
      )}
      <div className="bg-cream-500 text-center p-8 relative w-full rounded-lg flex flex-col transform">
        <div className="mb-6">
          <span className="font-bold font-inktrap text-sm">
            ?/{totalEditions}
          </span>
          <h3 className="font-black font-inktrap text-2xl">Own the edition</h3>
        </div>
        <div className="">
          <p className="">Combined total:</p>
          <p className="font-black font-inktrap mt-1 text-4xl">
            F{totalPrice.toLocaleString()}
          </p>
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
                placeholder="Select edition..."
                name="edition"
                className="placeholder-black-200 w-full bg-white text-black-500 rounded border-none px-4 py-3 outline-none h-12 no-show-drop"
                step="0.1"
              >
                <option value={0} className="text-white">
                  Select edition...
                </option>
                {map(editionsStatuses, (e, index) => (
                  <option
                    key={`edition-${e.edition}`}
                    value={e.edition}
                    selected={index === 0}
                  >
                    Edition #{e.edition} - F{parseFloat(e.price).toFixed(2)}{" "}
                    {get(user, "addr") === e.leader && e.leader
                      ? "- Your Bid"
                      : ""}
                  </option>
                ))}
              </select>
              <Drop className="absolute h-1 right-4 top-1/2 transform -translate-y-1/2" />
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

export default EditionBidBox;
