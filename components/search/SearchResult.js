import React from "react";
import Link from "next/link";

const SearchResult = ({ result }) => {
  return (
    <Link href={`/drop/${result.id}`}>
      <a>
        <div className="flex items-center cursor-pointer py-4 px-2 transition duration-300 hover:bg-black-50 hover:bg-opacity-30">
          {/* <div className="h-10 w-10 rounded-full">
            <img src={result.image} className="object-cover rounded-full" />
          </div> */}
          <div className="flex items-center ml-4 text-xs text-black-500">
            <span className="font-bold">{result.name}</span>
            <span className="h-3 bg-black-500 w-px mx-2"></span>
            <span>{result.artist}</span>
          </div>
        </div>
        <span className="w-9/12 bg-black-50 opacity-30 h-px mx-auto block last:hidden"></span>
      </a>
    </Link>
  );
};

export default SearchResult;
