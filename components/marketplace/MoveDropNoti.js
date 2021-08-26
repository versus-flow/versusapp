import React from "react";

const MoveDropNoti = () => {
  return (
    <div class="absolute group right-2 top-2">
      <span class="bg-cream-600 cursor-pointer flex font-bold h-6 items-center justify-center rounded-full w-6">
        i
      </span>
      <span class="hidden group-hover:block -translate-y-1/2 absolute bg-cream-500 p-4 right-8 rounded-2xl text-xs sm:text-sm top-1/2 transform w-48 sm:w-60">
        The name and artist of this NFT is swapped. Please send the art to
        0x80cd9c6d1ff10590 for a replacement.
      </span>
    </div>
  );
};

export default MoveDropNoti;
