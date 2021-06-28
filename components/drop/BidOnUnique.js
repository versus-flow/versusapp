import React, { useRef } from "react";
import useOnClickOutside from "use-onclickoutside";

import Logo from "../../assets/vslogo.svg";
import FlowLogo from "../../assets/flowlogo.svg";
import Arrow from "../../assets/arrow.svg";
import ArrowButton from "../general/ArrowButton";

const BidOnUnique = ({ close }) => {
  const modal = useRef(null);
  useOnClickOutside(modal, close);
  return (
    <div class="fixed flex h-screen items-center justify-center left-0 top-0 w-screen z-50 py-12">
      <div class="absolute bg-black-600 bg-opacity-90 h-full left-0 top-0 w-full" />
      <div
        ref={modal}
        class="bg-cream-500 flex flex-col items-center max-w-full px-20 py-8 rounded-2xl w-128 z-10 modal-scroll"
      >
        <Logo class="h-10" />
        <h4 class="font-black font-inktrap mt-8 text-xl">Own the unique</h4>
        <img
          class="h-auto mt-6 w-64"
          src="https://www.versus-flow.art/images/skan.jpeg"
        />
        <div class="mt-6">
          <span>
            The current bid is <span class="font-bold">F160.00</span>
          </span>
          <div class="border border-regGrey flex items-center justify-between mt-2 mx-auto px-3 py-1 rounded-full text-xs">
            <div class="flex items-center">
              <FlowLogo class="h-6" /> <span class="ml-2">Your balance:</span>
            </div>
            <span class="font-bold">F340</span>
          </div>
        </div>
        <div class="mt-3 w-full">
          <input
            type="number"
            placeholder="Enter Bid"
            name="bid"
            class="bg-white border border-regGrey outline-none placeholder-black-200 px-4 py-3 rounded text-black-500 w-full"
            step="0.1"
          />
          <p class="mt-2 text-xs">You must place a bid higher than F165</p>
        </div>
        <div class="flex justify-between mt-12 w-full">
          <ArrowButton text="Confirm" />
          <span className="flex font-bold font-roboto items-center text-sm tracking-wide cursor-pointer">
            Cancel
            <Arrow className="ml-2" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default BidOnUnique;
