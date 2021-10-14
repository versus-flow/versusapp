import React from "react";

import DropArt from "./DropArt";
import DropCounter from "./DropCounter";

export const getWrittenTimer = (seconds) => {
  var days = Math.floor(seconds / (3600 * 24));
  var hours = Math.floor((seconds % (3600 * 24)) / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var seconds = Math.floor(seconds % 60);
  if (!days && !hours && !minutes && !seconds) return false;
  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const DropContent = ({ drop, art, timeUntil, timeRemaining }) => {
  return (
    <div className="bg-white">
      <div className="container">
        <div className="pt-16 pb-8 sm:container md:grid grid-cols-2 gap-16">
          <DropArt drop={drop} art={art} />
          <DropCounter
            drop={drop}
            timeRemaining={timeRemaining}
            timeUntil={timeUntil}
          />
        </div>
      </div>
    </div>
  );
};

export default DropContent;
