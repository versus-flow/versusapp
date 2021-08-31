import React, { useState, useEffect } from "react";
import { filter, includes, map, reverse, sortBy, uniqBy } from "lodash";
import Link from "next/link";

import Main from "../components/layouts/Main";
import { fetchAllDrops } from "../components/search/SearchBox";
import Loading from "../components/general/Loading";
import DropPreview from "../components/marketplace/DropPreview";
import { getDropThumbnail, getGraffleUrl } from "../components/general/helpers";

export default function Drops() {
  const [loading, setLoading] = useState(true);
  const [drops, setDrops] = useState([]);
  useEffect(async () => {
    const allDrops = await fetchAllDrops();
    const realdrops =
      process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet"
        ? filter(
            allDrops,
            (d) =>
              !includes([1, 6, 9, 11, 12, 13, 15, 20, 22], d.dropId) &&
              d.expired
          )
        : drops;
    const sortedDrops = reverse(sortBy(realdrops, "dropId"));
    let sold = uniqBy(
      await (
        await fetch(
          getGraffleUrl("?eventType=A.CONTRACT.Marketplace.TokenPurchased")
        )
      ).json(),
      (i) => i.blockEventData.id
    );
    const dropsWithImages = await Promise.all(
      map(sortedDrops, async (s) => {
        return {
          ...s,
          img: await getDropThumbnail(s.dropId, 600),
        };
      })
    );
    setDrops(dropsWithImages);
    setLoading(false);
  }, []);
  return (
    <Main>
      {() => (
        <div className="py-12">
          <div className="container">
            <h2 className="font-bold font-inktrap text-3xl sm:text-5xl">
              Recent Drops
            </h2>
            <div className="min-h-screen py-12">
              {loading ? (
                <div className="flex justify-center items-center">
                  <Loading />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-x-8 gap-y-4 lg:gap-x-16 lg:gap-y-8">
                  {map(drops, (d) => (
                    <DropPreview
                      key={d.dropId}
                      // id={false}
                      shadow
                      img={d.img}
                      title={d.metadata.name}
                      artist={d.metadata.artist}
                      zoom
                      price={
                        d.winning === "EDITIONED"
                          ? parseFloat(d.editionPrice).toFixed(1)
                          : parseFloat(d.uniquePrice).toFixed(1)
                      }
                      isEdition={d.winning === "EDITIONED"}
                      isUnique={d.winning === "UNIQUE"}
                      edition={
                        d.winning === "EDITIONED"
                          ? `${
                              map(d.editionsStatuses, (d) => {}).length
                            } editions`
                          : "1 edition"
                      }
                      button={
                        <Link href={`/drop/${d.dropId}`}>
                          <a className="standard-button block mt-2">
                            View drop
                          </a>
                        </Link>
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Main>
  );
}
