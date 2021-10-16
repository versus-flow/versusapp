import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { find, get } from "lodash";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { tx } from "../drop/transactions";
import { removeFromSale } from "./transactions";

import BuyItem from "./BuyItem";
import { getDropFromArtist, isMainnet, isVideoDrop } from "../general/helpers";
import Link from "next/link";
import Loading from "../general/Loading";

const SaleMain = ({ piece, address, user, unlisted, art, isVideo }) => {
  const [showList, setShowList] = useState(false);
  const [listingText, setListingText] = useState("Unlist");
  const {
    art: { name, edition, maxEdition, description, artist },
    price,
    owner,
  } = piece;
  const dropInfo = getDropFromArtist(artist);
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
      {showList && (
        <BuyItem
          close={() => setShowList(false)}
          piece={piece}
          user={user}
          address={address}
          art={art}
        />
      )}
      <div className="container my-12">
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="order-1">
            <p className="text-regGrey">
              Edition {edition} of {maxEdition}
            </p>
            <h1 className="font-black font-inktrap text-3xl sm:text-5xl">
              {name}
            </h1>
            <p className="mt-12 sm:w-9/12">{description}</p>
            <p className="font-black font-inktrap mt-8 text-3xl sm:text-5xl">
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
            <div className="flex flex-col sm:flex-row sm:items-center mt-8">
              <div className="flex items-center mb-3 sm:mb-0 sm:mr-6">
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
              {owner || address ? (
                <div className="flex items-center">
                  <div className="bg-white h-12 mr-3 p-1 rounded-full shadow-lg w-12 flex justify-center items-center">
                    {owner && owner.avatar ? (
                      <img
                        src={owner.avatar}
                        className="h-full object-cover rounded-full w-full"
                      />
                    ) : (
                      <span className="font-bold text-xl">
                        {owner
                          ? owner.name
                            ? owner.name.substring(0, 1)
                            : "?"
                          : "?"}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-regGrey text-sm">Owner</span>
                    <Link href={`/profile/${address}`}>
                      <a className="font-bold">
                        {owner
                          ? owner.name
                            ? owner.name
                            : "?"
                          : address.substring(0, 6)}
                      </a>
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="w-full sm:order-2">
            {art ? (
              isVideo ? (
                <video
                  src={`https://gateway.pinata.cloud/ipfs/${art}`}
                  className="h-full object-cover w-full rounded"
                  controls
                  autoPlay
                  muted
                />
              ) : (
                <Zoom>
                  <img
                    src={art}
                    className="w-full sm:h-full sm:object-contain"
                  />
                </Zoom>
              )
            ) : (
              <div className="h-24 sm:h-48 flex justify-center items-center">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleMain;
