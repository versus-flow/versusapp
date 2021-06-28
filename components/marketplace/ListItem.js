import React, { useRef } from "react";
import useOnClickOutside from "use-onclickoutside";

import Logo from "../../assets/vslogo.svg";
import Arrow from "../../assets/arrow.svg";
import ArrowButton from "../general/ArrowButton";
import DropPreview from "./DropPreview";

const ListItem = ({ close }) => {
  const modal = useRef(null);
  useOnClickOutside(modal, close);
  return (
    <div class="fixed flex h-screen items-center justify-center left-0 top-0 w-screen z-50 py-12">
      <div class="absolute bg-black-600 bg-opacity-90 h-full left-0 top-0 w-full" />
      <form
        ref={modal}
        class="bg-cream-500 flex flex-col items-center px-20 py-8 rounded-2xl w-full max-w-md z-10 modal-scroll"
      >
        <Logo class="h-10" />
        <h4 class="font-black font-inktrap mt-8 text-2xl">
          List item for sale
        </h4>
        <div className="mt-6">
          <DropPreview />
        </div>
        <p className="text-center mt-4">
          You bought this for <span className="font-bold">F150.00</span>, please
          enter the sale price below:
        </p>
        <div className="form-group">
          <input
            type="text"
            name="amount"
            className="standard-input"
            placeholder="Enter the amount you want to sell it for"
          />
          <span class="block mt-1 text-xs">
            Small print legal jargon can go here.
          </span>
        </div>
        <div class="flex justify-between mt-6 w-full">
          <ArrowButton text="List for Sale" />
          <span
            className="flex font-bold font-roboto items-center text-sm tracking-wide cursor-pointer"
            onClick={close}
          >
            Cancel
            <Arrow className="ml-2" />
          </span>
        </div>
      </form>
    </div>
  );
};

export default ListItem;
