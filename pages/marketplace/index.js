import React, { useState, useEffect } from "react";
import Head from "next/head";
import { filter, map, uniq, sortBy, reverse, uniqBy, find } from "lodash";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import Main from "../../components/layouts/Main";
import Holder from "../../components/marketplace/filters/Holder";
import Sorting from "../../components/marketplace/filters/Sorting";
import Results from "../../components/marketplace/Results";
import Loading from "../../components/general/Loading";
import { getGraffleUrl } from "../../components/general/helpers";
import { getOneMarketplaceItem } from "../../components/marketplace/transactions";
import { oneArt } from "../../components/profile/ProfileWrapper";
import { oneListedItem } from "../../components/marketplace/FullItem";
import moment from "moment";

export const getPiecesByIds = async (pieces) => {
  const allItems = await Promise.all(
    map(pieces, async (p) => ({
      ...p,
      data: await oneListedItem(p.blockEventData.from, p.blockEventData.id),
      img: await oneArt(p.blockEventData.from, p.blockEventData.id),
    }))
  );
  return allItems;
};

export default function Marketplace() {
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState([0, 100000]);
  const [artists, setArtists] = useState([]);
  const [sb, setSortBy] = useState("");
  useEffect(() => {
    const findActivePieces = async () => {
      let r = uniqBy(
        await (
          await fetch(
            getGraffleUrl("?eventType=A.CONTRACT.Marketplace.ForSale")
          )
        ).json(),
        (i) => i.blockEventData.id
      );
      let sold = uniqBy(
        await (
          await fetch(
            getGraffleUrl("?eventType=A.CONTRACT.Marketplace.TokenPurchased")
          )
        ).json(),
        (i) => i.blockEventData.id
      );
      let withdrawn = uniqBy(
        await (
          await fetch(
            getGraffleUrl("?eventType=A.CONTRACT.Marketplace.SaleWithdrawn")
          )
        ).json(),
        (i) => i.blockEventData.id
      );
      const filtered = filter(r, (item) => {
        const soldVersion = find(
          sold,
          (s) => s.blockEventData.id === item.blockEventData.id
        );
        const withdrawnVersion = find(
          withdrawn,
          (s) => s.blockEventData.id === item.blockEventData.id
        );
        if (!soldVersion && !withdrawnVersion) return true;
        if (!soldVersion) {
          return moment(item.eventDate).isAfter(
            moment(withdrawnVersion.eventDate)
          );
        } else if (!withdrawnVersion) {
          return moment(item.eventDate).isAfter(moment(soldVersion.eventDate));
        } else {
          const mostRecentDate = moment(soldVersion.eventDate).isAfter(
            moment(withdrawnVersion.eventDate)
          )
            ? moment(soldVersion.eventDate)
            : moment(withdrawnVersion.eventDate);
          return moment(item.eventDate).isAfter(mostRecentDate);
        }
      });
      const pieces = await getPiecesByIds(filtered);
      setPieces(pieces);
      setLoading(false);
    };
    findActivePieces();
  }, []);
  const defaultArtists = uniq(map(pieces, (p) => p.data.art.artist));
  const filteredPieces = filter(pieces, (p) => {
    if (p.blockEventData.price < price[0] || p.blockEventData.price > price[1])
      return false;
    return true;
  });
  let sortedPieces = sortBy(filteredPieces, [
    (p) => {
      if (sb === "price") return p.blockEventData.price;
      else if (sb === "atoz" || sb === "ztoa") return p.data.art.name;
      return;
    },
  ]);
  if (sb === "ztoa") sortedPieces = reverse(sortedPieces);
  return (
    <Main>
      {() => (
        <>
          <Head>
            <title>Marketplace</title>
          </Head>
          <div className="bg-white min-h-screen pb-20">
            <div className="container pt-12">
              {!loading ? (
                <div className="w-full md:grid grid-cols-12 gap-12">
                  <div className="col-span-4">
                    <Holder
                      setPrice={(v) => setPrice(v)}
                      setArtists={setArtists}
                      defaultArtists={defaultArtists}
                    />
                  </div>
                  <div className="col-span-8 md:pr-12">
                    <Sorting
                      numResults={sortedPieces.length}
                      setSortBy={(s) => setSortBy(s)}
                    />
                    <Results pieces={sortedPieces} />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center h-64">
                  {" "}
                  <Loading />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </Main>
  );
}
