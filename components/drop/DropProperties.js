import React, { useEffect, useState } from "react";
import { get } from "lodash";

import {
  getVideoDimensionsOf,
  getVidThumbnail,
  isVideoDrop,
} from "../general/helpers";

const DropProperties = ({ drop, art }) => {
  const [dims, setDims] = useState(null);
  useEffect(async () => {
    if (isVideoDrop(drop)) {
      const vid = await getVideoDimensionsOf(getVidThumbnail(art));
      setDims(`${vid.width} x ${vid.height}`);
    } else {
      var i = new Image();
      i.onload = function () {
        setDims(`${i.width} x ${i.height}`);
      };
      i.src = art;
    }
  }, [art]);
  return (
    <div className="bg-lightGrey py-12">
      <div className="container">
        <h3 className="font-black font-inktrap text-2xl">Properties</h3>
        <div className="mt-4">
          <div className="flex flex-col sm:flex-row mb-2">
            <span className="w-56">Title</span>
            <span className="font-bold">{get(drop, "metadata.name")}</span>
          </div>
          <div className="flex flex-col sm:flex-row mb-2">
            <span className="w-56">Dimensions</span>
            <span className="font-bold">{dims}</span>
          </div>
          <div className="flex flex-col sm:flex-row">
            <span className="w-56">Kind</span>
            <span className="font-bold uppercase">
              {get(drop, "metadata.type")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropProperties;
