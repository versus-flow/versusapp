import classNames from "classnames";
import { filter, includes, map, xor } from "lodash";
import React, { useState } from "react";

import Chevron from "../../../assets/chevron.svg";
import Search from "../../../assets/search.svg";

const ArtistFilter = ({ setArtists, defaultArtists }) => {
  const [open, setOpen] = useState(true);
  const [activeArtists, setActiveArtists] = useState([]);
  const [search, setSearch] = useState("");
  const filteredArtists = search
    ? filter(defaultArtists, (a) =>
        includes(a.toLowerCase(), search.toLowerCase())
      )
    : defaultArtists;
  return (
    <div className="flex flex-col border border-lightGrey rounded-lg">
      <div className="bg-cream-500 px-6 py-3 flex items-center justify-between rounded-t-lg">
        <h4 className="text-2xl font-bold font-inktrap text-darkGrey">
          Artist
        </h4>
        {/* <Chevron className="cursor-pointer w-4 h-4" /> */}
      </div>
      <div className="px-4 lg:px-6 py-6">
        <div className="relative">
          <input
            type="search"
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Search"
            className="bg-lightGrey w-full placeholder-black-100 text-sm rounded-lg border-none pl-16 pr-4 py-4 outline-none"
          />
          <Search className="absolute top-1/2 transform -translate-y-1/2 left-6 w-6 h-6 text-regGrey fill-current" />
        </div>
        <div className="mt-4">
          <p className="font-bold">Artists</p>
          <div className="mt-4 border-b border-lightGrey text-mediumGrey mb-4 pb-6">
            {map(filteredArtists, (a) => (
              <p
                key={a}
                className={classNames("mb-1 cursor-pointer", {
                  "font-bold text-black-500": includes(activeArtists, a),
                })}
                onClick={() => {
                  setActiveArtists(xor(activeArtists, [a]));
                  setArtists(xor(activeArtists, [a]));
                }}
              >
                {a}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistFilter;
