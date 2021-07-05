import React from "react";
import Link from "next/link";

import Arrow from "../../assets/arrow.svg";

const Rewarded = () => {
  return (
    <div className="px-6 sm:px-0 pt-12 sm:pt-24 pb-12 text-center vs-gradient">
      <h2 className="font-bold font-inktrap mx-auto text-4xl">
        Artists should be properly
        <br /> rewarded for their work
      </h2>
      <div className="flex justify-center mt-6 text-center">
        <a
          className="flex font-bold font-roboto items-center text-sm tracking-wide"
          href="https://capturinginsights.typeform.com/to/kf9JZtdY"
          target="_blank"
        >
          Become a Versus artist
          <Arrow className="ml-2" />
        </a>
      </div>
    </div>
  );
};

export default Rewarded;
