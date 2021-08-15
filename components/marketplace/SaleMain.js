import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { find, get } from "lodash";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { tx } from "../drop/transactions";
import { removeFromSale } from "./transactions";

import dropsData from "../../components/general/drops.json";
import testDropsData from "../../components/general/testdrops.json";
import BuyItem from "./BuyItem";
import { isMainnet } from "../general/helpers";
import Link from "next/link";

const SaleMain = ({ piece, address, user, unlisted }) => {
  const [showList, setShowList] = useState(false);
  const [listingText, setListingText] = useState("Unlist");
  const {
    art: { name, edition, maxEdition, description, artist },
    price,
    owner,
  } = piece;
  const dropInfo = find(
    process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet" ? dropsData : testDropsData,
    (d) =>
      (d.id == process.env.NEXT_PUBLIC_FLOW_ENV) === "mainnet" ? piece.id : "1"
  );
  const isVersus = artist === "Versus";
  const unlist = async () => {
    if (get(user, "addr") !== address) return;
    if (listingText !== "Unlist") return;
    setListingText("Loading");
    try {
      await tx(
        [
          fcl.transaction(removeFromSale),
          fcl.args([fcl.arg(piece.id, t.UInt64)]),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(9999),
        ],
        {
          onStart() {
            setListingText("Loading");
          },
          onSubmission() {
            setListingText("Unlisting");
          },
          async onSuccess(status) {
            setListingText("Unlisted!");
          },
          async onError(error) {
            setListingText("Error");
          },
        }
      );
    } catch (e) {
      setListingText("Unlist");
      console.log(e);
    }
  };
  return (
    <>
      {showList && <BuyItem close={() => setShowList(false)} piece={piece} />}
      <div className="container my-12">
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="order-1">
            <p className="text-regGrey">
              Edition {edition} of {maxEdition}
            </p>
            <h1 className="font-black font-inktrap text-5xl">{name}</h1>
            <p className="mt-12 w-9/12">{description}</p>
            <p className="font-black font-inktrap mt-8 text-5xl">
              {unlisted ? "Unlisted" : `${`F${parseFloat(price).toFixed(1)}`}`}
            </p>
            {!unlisted && (
              <div className="flex items-center mt-6">
                {get(user, "addr") === address ? (
                  <div
                    className="small-button standard-button transparent-button"
                    onClick={unlist}
                  >
                    {listingText}
                  </div>
                ) : (
                  <div
                    className="small-button standard-button"
                    onClick={() => setShowList(piece)}
                  >
                    Buy
                  </div>
                )}
              </div>
            )}
            <div className="flex items-center mt-8">
              <div className="flex items-center mr-6">
                <div className="bg-white h-12 mr-3 p-1 rounded-full shadow-lg w-12 flex justify-center items-center">
                  {isVersus ? (
                    <span className="font-bold text-xl">v</span>
                  ) : (
                    <Zoom>
                      <img
                        src={get(dropInfo, "smallImage")}
                        className="h-full object-cover rounded-full w-full"
                      />
                    </Zoom>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-regGrey text-sm">Artist</span>
                  <span className="font-bold">
                    @{isVersus ? "versus" : get(dropInfo, "handle")}
                  </span>
                </div>
              </div>
              {owner ? (
                <div className="flex items-center">
                  <div className="bg-white h-12 mr-3 p-1 rounded-full shadow-lg w-12 flex justify-center items-center">
                    {owner.avatar ? (
                      <img
                        src={owner.avatar}
                        className="h-full object-cover rounded-full w-full"
                      />
                    ) : (
                      <span className="font-bold text-xl">
                        {owner.name ? owner.name.substring(0, 1) : "?"}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-regGrey text-sm">Owner</span>
                    <Link href={`/profile/${owner.address}`}>
                      <a className="font-bold">@{owner.name}</a>
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="w-full sm:order-2">
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
