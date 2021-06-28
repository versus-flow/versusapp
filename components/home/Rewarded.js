import React from "react";
import Link from "next/link";

import Arrow from "../../assets/arrow.svg";

const Rewarded = () => {
  return (
    <div className="pt-24 pb-12 text-center vs-gradient">
      <h2 className="font-bold font-inktrap mx-auto text-4xl">
        Artists should be properly
        <br /> rewarded for their work
      </h2>
      <div className="flex justify-center mt-6 text-center">
        <Link href="#">
          <a className="flex font-bold font-roboto items-center text-sm tracking-wide">
            Become a Versus artist
            <Arrow className="ml-2" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Rewarded;
