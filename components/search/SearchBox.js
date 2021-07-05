import React, { useState, useRef, useEffect } from "react";
import { filter, get, includes, map } from "lodash";
import useOnClickOutside from "use-onclickoutside";
import * as fcl from "@onflow/fcl";
import Fuse from "fuse.js";

import Search from "../../assets/search.svg";
import SearchResult from "./SearchResult";
import { getAllDrops } from "../drop/transactions";
import moment from "moment";

async function fetchAllDrops() {
  const response = await fcl.send([fcl.script(getAllDrops)]);
  return await fcl.decode(response);
}

const SearchBox = () => {
  const [show, setShow] = useState(true);
  const [query, setQuery] = useState(null);
  const [drops, setDrops] = useState(null);
  const bar = useRef(null);
  useOnClickOutside(bar, () => setShow(false));
  useEffect(async () => {
    const dropSetTime = localStorage.getItem("dropSetTime");
    setDrops(JSON.parse(localStorage.getItem("drops") || "{}"));
    if (
      !dropSetTime ||
      moment().subtract(1, "h").isAfter(moment.unix(dropSetTime))
    ) {
      const drops = await fetchAllDrops();
      const realdrops =
        process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet"
          ? filter(drops, (d) => !includes([1, 6, 9], d.dropId))
          : drops;
      const mappedDrops = map(realdrops, (d) => ({
        id: d.dropId,
        name: get(d, "metadata.name"),
        artist: get(d, "metadata.artist"),
      }));
      localStorage.setItem("drops", JSON.stringify(mappedDrops));
      localStorage.setItem("dropSetTime", moment().unix());
    }
  }, []);

  const filteredDrops = (drops, query) => {
    const options = {
      keys: ["name", "artist"],
    };

    const fuse = new Fuse(drops, options);
    const result = fuse.search(query);
    return map(result, (r) => r.item);
  };

  return (
    <div className="relative pl-12">
      <form className="relative" onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          onChange={(e) => {
            setShow(true);
            setQuery(e.currentTarget.value);
          }}
          placeholder="Search Versus"
          className="bg-white placeholder-black-100 text-black-500 text-sm rounded-full border-none pl-10 pr-8 py-3 outline-none"
        />
        <Search className="absolute text-black-200 fill-current left-4 h-4 w-4 top-1/2 transform -translate-y-1/2" />
      </form>
      {query && show ? (
        <div
          ref={bar}
          className="absolute left-0 w-full top-full shadow-sm rounded-sm bg-white mt-2 z-50 max-w-full"
        >
          {map(filteredDrops(drops, query), (r) => (
            <SearchResult key={r.id} result={r} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBox;
