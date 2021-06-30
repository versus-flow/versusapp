import { times } from "lodash";
import React from "react";
import Link from "next/link";

import Arrow from "../../assets/arrow.svg";
import ArrowButton from "../general/ArrowButton";
import DropPreview from "../marketplace/DropPreview";

const MarketplacePreview = () => {
  return (
    <div className="py-12">
      <div className="container">
        <h2 className="font-bold font-inktrap text-3xl sm:text-5xl">
          Marketplace
        </h2>
        <div className="flex flex-col sm:flex-row font-inktrap sm:items-center justify-between mt-3">
          <h3 className="text-lg text-left">Featured Artists</h3>
          <Link href="#">
            <a className="flex font-bold font-roboto items-center text-sm tracking-wide">
              Visit marketplace
              <Arrow className="ml-2" />
            </a>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-x-8 gap-y-4 lg:gap-x-16 lg:gap-y-8">
          {times(6, () => (
            <DropPreview />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <ArrowButton
            text="Visit marketplace"
            className="transparent-button lg-button"
          />
        </div>
      </div>
    </div>
  );
};

export default MarketplacePreview;
