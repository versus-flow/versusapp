import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { find } from "lodash";

import dropsData from "../../components/general/drops.json";
import testDropsData from "../../components/general/testdrops.json";
import BuyItem from "./BuyItem";

const SaleMain = ({ piece }) => {
  const [showList, setShowList] = useState(false);
  const {
    art: { name, edition, maxEdition, description },
    price,
    owner,
  } = piece;
  const dropInfo = find(
    process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet" ? dropsData : testDropsData,
    (d) => d.id == "1"
  );
  return (
    <>
      {showList && <BuyItem close={() => setShowList(false)} piece={piece} />}
      <div className="container my-12">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-regGrey">
              Edition {edition} of {maxEdition}
            </p>
            <h1 className="font-black font-inktrap text-5xl">{name}</h1>
            <p className="mt-12 w-9/12">{description}</p>
            <p className="font-black font-inktrap mt-8 text-5xl">
              F{parseFloat(price).toFixed(1)}
            </p>
            <div className="flex items-center mt-6">
              <div
                className="small-button standard-button"
                onClick={() => setShowList(piece)}
              >
                Buy
              </div>
            </div>
            <div className="flex items-center mt-8">
              <div className="flex items-center mr-6">
                <div className="bg-white h-12 mr-3 p-1 rounded-full shadow-lg w-12">
                  <Zoom>
                    <img
                      src={dropInfo.smallImage}
                      className="h-full object-cover rounded-full w-full"
                    />
                  </Zoom>
                </div>
                <div className="flex flex-col">
                  <span className="text-regGrey text-sm">Artist</span>
                  <span className="font-bold">@{dropInfo.handle}</span>
                </div>
              </div>
              {owner ? (
                <div className="flex items-center">
                  <div className="bg-white h-12 mr-3 p-1 rounded-full shadow-lg w-12">
                    <img
                      src={owner.avatar}
                      className="h-full object-cover rounded-full w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-regGrey text-sm">Arist</span>
                    <span className="font-bold">@{owner.handle}</span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="w-full">
            <Zoom>
              <img
                src={piece.img}
                className="w-full sm:h-full sm:object-contain"
              />
            </Zoom>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleMain;
