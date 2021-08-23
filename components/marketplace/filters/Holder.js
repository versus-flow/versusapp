import React, { useEffect, useState } from "react";
import { Filter } from "react-feather";

import StatusFilter from "./StatusFilter";
import PriceFilter from "./PriceFilter";
import ArtistFilter from "./ArtistFilter";
import classNames from "classnames";

const Holder = ({ setPrice, setArtists, defaultArtists }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="cursor-pointer flex justify-center md:hidden mb-2"
        onClick={() => setOpen(!open)}
      >
        <Filter className="mr-2" /> {open ? "Close" : "Open"} Filters
      </div>
      <div
        className={classNames("mt-2 sm:mt-0", {
          "hidden md:block": !open,
        })}
      >
        {/* <StatusFilter /> */}
        <PriceFilter setPrice={(v) => setPrice(v)} />
        <ArtistFilter setArtists={setArtists} defaultArtists={defaultArtists} />
      </div>
    </>
  );
};

export default Holder;
