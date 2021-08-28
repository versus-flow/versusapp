import React, { useState, useEffect } from "react";
import { map, find } from "lodash";
import moment from "moment";
import Link from "next/link";

import Cart from "../../assets/cart.svg";
import { getDropFromArtist, getGraffleUrl } from "../general/helpers";
import { fetchProfile } from "../../pages/profile/[name]";
import { fetchDrop } from "../../pages/drop/[slug]";
import dropsData from "../../components/general/drops.json";
import testDropsData from "../../components/general/testdrops.json";

const PurchaseHistory = ({ id, piece }) => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [initialSale, setInitialSale] = useState({});
  const {
    art: { artist, edition },
  } = piece;
  const isVersus = artist === "Versus";
  const dropInfo = isVersus ? {} : getDropFromArtist(artist, piece.cacheKey);
  useEffect(async () => {
    let sold = await (
      await fetch(
        getGraffleUrl(
          `?eventType=A.CONTRACT.Marketplace.TokenPurchased&id=${id}`
        )
      )
    ).json();
    sold = await Promise.all(
      map(sold, async (s) => ({
        ...s,
        profile:
          (await fetchProfile(s.blockEventData.to)) || s.blockEventData.to,
        from:
          (await fetchProfile(s.blockEventData.from)) || s.blockEventData.from,
      }))
    );
    setHistory(sold);
    if (isVersus || !dropInfo) return setLoading(false);
    const drop = await fetchDrop(dropInfo.id);
    if (drop.winning === "EDITIONED") {
      let num = 1;
      let currentEdition = {};
      for (let ed in drop.editionsStatuses) {
        if (num === edition) currentEdition = ed;
        num++;
      }
      const orig = drop.editionsStatuses[currentEdition];
      setInitialSale({
        price: parseFloat(orig.price).toFixed(1),
        owner: (await fetchProfile(orig.leader)) || orig.leader,
        endTime: parseFloat(drop.endTime),
      });
    } else if (drop.winning === "UNIQUE") {
      setInitialSale({
        price: parseFloat(drop.uniqueStatus.price).toFixed(1),
        owner:
          (await fetchProfile(drop.uniqueStatus.leader)) ||
          drop.uniqueStatus.leader,
        endTime: parseFloat(drop.endTime),
      });
    }
    setLoading(false);
  }, [id]);
  return (
    <div className="bg-black-900 text-white py-12">
      <div className="container">
        <h3 className="font-black font-inktrap text-2xl">Purchase History</h3>
        <div className="mt-4">
          {loading ? (
            ""
          ) : (
            <>
              {map(history, (i, index) => (
                <div
                  key={`${index}-${i.address}`}
                  className="flex flex-col sm:flex-row sm:items-center mb-4"
                >
                  <div className="flex items-center">
                    <Cart className="h-8 mr-2" />
                    <span className="mr-6">
                      {moment(i.eventDate).format("LL")}
                    </span>
                    <div className="bg-white h-12 mr-3 p-1 rounded-full shadow-lg w-12 flex justify-center items-center">
                      {i.profile && typeof i.profile !== "string" ? (
                        i.profile.avatar ? (
                          <img
                            src={i.profile.avatar}
                            className="h-full object-cover rounded-full w-full"
                          />
                        ) : (
                          <span className="font-bold text-xl text-black-500">
                            {i.profile.name
                              ? i.profile.name.substring(0, 1)
                              : "?"}
                          </span>
                        )
                      ) : (
                        <span className="font-bold text-xl text-black-500">
                          ?
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="mt-2 sm:mt-0">
                    <Link
                      href={`/profile/${
                        typeof i.profile === "string"
                          ? i.profile
                          : i.profile.address
                      }`}
                    >
                      <a className="font-bold cursor-pointer">
                        @
                        {typeof i.profile === "string"
                          ? i.profile.substring(0, 6)
                          : i.profile.name || i.profile.address.substring(0, 6)}
                      </a>
                    </Link>{" "}
                    purchased the item for{" "}
                    <span className="font-bold">F{i.blockEventData.price}</span>{" "}
                    from{" "}
                    <Link
                      href={`/profile/${
                        typeof i.from === "string" ? i.from : i.from.address
                      }`}
                    >
                      <a className="font-bold cursor-pointer">
                        @
                        {typeof i.from === "string"
                          ? i.from.substring(0, 6)
                          : i.from.name || i.from.address.substring(0, 6)}
                      </a>
                    </Link>
                  </span>
                </div>
              ))}
              {initialSale.owner && (
                <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                  <div className="flex items-center">
                    <Cart className="h-8 mr-2" />
                    <span className="mr-6">
                      {moment.unix(initialSale.endTime).format("LL")}
                    </span>
                    <div className="bg-white h-12 mr-3 p-1 rounded-full shadow-lg w-12 flex justify-center items-center">
                      {initialSale.owner &&
                      typeof initialSale.owner !== "string" ? (
                        initialSale.owner.avatar ? (
                          <img
                            src={initialSale.owner.avatar}
                            className="h-full object-cover rounded-full w-full"
                          />
                        ) : (
                          <span className="font-bold text-xl text-black-500">
                            {initialSale.owner.name
                              ? initialSale.owner.name.substring(0, 1)
                              : "?"}
                          </span>
                        )
                      ) : (
                        <span className="font-bold text-xl text-black-500">
                          ?
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="mt-2 sm:mt-0">
                    <Link
                      href={`/profile/${
                        typeof initialSale.owner === "string"
                          ? initialSale.owner
                          : initialSale.owner.address
                      }`}
                    >
                      <a className="font-bold cursor-pointer">
                        @
                        {typeof initialSale.owner === "string"
                          ? initialSale.owner.substring(0, 6)
                          : initialSale.owner.name ||
                            initialSale.owner.address.substring(0, 6)}
                      </a>
                    </Link>{" "}
                    originally minted for{" "}
                    <span className="font-bold">F{initialSale.price}</span>.
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
