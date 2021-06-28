import React, { useEffect, useState } from "react";

import StatusFilter from "./StatusFilter";
import PriceFilter from "./PriceFilter";
import ArtistFilter from "./ArtistFilter";

const Holder = (props) => {
  return (
    <div>
      <StatusFilter />
      <PriceFilter />
      <ArtistFilter />
    </div>
  );
};

export default Holder;
