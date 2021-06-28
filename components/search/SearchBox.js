import React, { useState, useRef } from "react";
import { map } from "lodash";
import useOnClickOutside from "use-onclickoutside";

import Search from "../../assets/search.svg";
import SearchResult from "./SearchResult";

const SearchBox = () => {
  const [show, setShow] = useState(true);
  const [query, setQuery] = useState(null);
  const bar = useRef(null);
  useOnClickOutside(bar, () => setShow(false));
  const results = [
    {
      id: 1,
      image:
        "https://lh3.googleusercontent.com/ogw/ADea4I4TggB1GCdvgQaIkX0S9zbSZH-evkipl6fX5p6i=s64-c-mo",
      name: "Vince Kamp",
      handle: "@vincekamp",
    },
    {
      id: 2,
      image:
        "https://lh3.googleusercontent.com/ogw/ADea4I4TggB1GCdvgQaIkX0S9zbSZH-evkipl6fX5p6i=s64-c-mo",
      name: "Vince Kamp",
      handle: "@vincekamp",
    },
    {
      id: 3,
      image:
        "https://lh3.googleusercontent.com/ogw/ADea4I4TggB1GCdvgQaIkX0S9zbSZH-evkipl6fX5p6i=s64-c-mo",
      name: "Vince Kamp",
      handle: "@vincekamp",
    },
    {
      id: 4,
      image:
        "https://lh3.googleusercontent.com/ogw/ADea4I4TggB1GCdvgQaIkX0S9zbSZH-evkipl6fX5p6i=s64-c-mo",
      name: "Vince Kamp",
      handle: "@vincekamp",
    },
    {
      id: 5,
      image:
        "https://lh3.googleusercontent.com/ogw/ADea4I4TggB1GCdvgQaIkX0S9zbSZH-evkipl6fX5p6i=s64-c-mo",
      name: "Vince Kamp",
      handle: "@vincekamp",
    },
  ];
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
          {map(results, (r, index) => (
            <SearchResult
              key={r.id}
              result={r}
              isLast={index === results.length - 1}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBox;
