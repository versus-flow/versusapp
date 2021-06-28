import React, { useEffect, useState } from "react";
import { includes, without, union } from "lodash";

import Chevron from "../../../assets/chevron.svg";
import X from "../../../assets/x.svg";

const StatusFilter = (props) => {
  const [open, setOpen] = useState(true);
  const [filters, setFilters] = useState(["buynow"]);
  const filterClass =
    "cursor-pointer px-4 py-1 transition transform-colors duration-200 border rounded-full hover:bg-black-500 hover:text-white inline-flex items-center";
  const activeFilterClass = "bg-black-500 text-white";
  const filterChange = (e, text) => {
    e.stopPropagation();
    setFilters(without(filters, text));
  };
  return (
    <div className="flex flex-col mb-4 border border-lightGrey rounded-lg">
      <div className="bg-cream-500 px-6 py-3 flex items-center justify-between rounded-t-lg">
        <h4 className="text-2xl font-bold font-inktrap text-darkGrey">
          Status
        </h4>
        <Chevron className="cursor-pointer w-4 h-4" />
      </div>
      <div className="px-6 py-6 grid grid-cols-2 gap-y-6">
        <div>
          <span
            className={`${filterClass} ${
              includes(filters, "buynow") && activeFilterClass
            }`}
            onClick={() => setFilters(union(filters, ["buynow"]))}
          >
            Buy Now{" "}
            {includes(filters, "buynow") && (
              <X className="ml-2" onClick={(e) => filterChange(e, "buynow")} />
            )}
          </span>
        </div>
        <div>
          <span
            className={`${filterClass} ${
              includes(filters, "onauction") && activeFilterClass
            }`}
            onClick={() => setFilters(union(filters, ["onauction"]))}
          >
            On auction{" "}
            {includes(filters, "onauction") && (
              <X
                className="ml-2"
                onClick={(e) => filterChange(e, "onauction")}
              />
            )}
          </span>
        </div>
        <div>
          <span
            className={`${filterClass} ${
              includes(filters, "new") && activeFilterClass
            }`}
            onClick={() => setFilters(union(filters, ["new"]))}
          >
            New{" "}
            {includes(filters, "new") && (
              <X className="ml-2" onClick={(e) => filterChange(e, "new")} />
            )}
          </span>
        </div>
        <div>
          <span
            className={`${filterClass} ${
              includes(filters, "hasoffers") && activeFilterClass
            }`}
            onClick={() => setFilters(union(filters, ["hasoffers"]))}
          >
            Has offers{" "}
            {includes(filters, "hasoffers") && (
              <X
                className="ml-2"
                onClick={(e) => filterChange(e, "hasoffers")}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusFilter;
