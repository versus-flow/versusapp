import React, { useState, useEffect } from "react";
import { filter, includes, map, reverse, sortBy, uniqBy } from "lodash";
import Link from "next/link";
import Head from "next/head";

import Main from "../components/layouts/Main";
import { fetchAllDrops } from "../components/search/SearchBox";
import Loading from "../components/general/Loading";
import DropPreview from "../components/marketplace/DropPreview";
import { getDropThumbnail, isVideoDrop } from "../components/general/helpers";
import SEOBoilerplate from "../components/general/SEOBoilerplate";
import StandardLoadWrapper from "../components/general/StandardLoadWrapper";

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
              !includes([1, 6, 9, 11, 12, 13, 15, 20, 22, 37, 38], d.dropId) &&
              d.expired
          )
        : drops;
    const sortedDrops = reverse(sortBy(realdrops, "dropId"));
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
    <Main seo={<SEOBoilerplate title="Recent Drops | Versus" url="drops" />}>
      {() => (
        <>
          {loading ? (
            <StandardLoadWrapper />
          ) : (
            <div className="py-12">
              <div className="container">
                <h2 className="font-bold font-inktrap text-3xl sm:text-5xl">
                  Recent Drops
                </h2>
                <div className="min-h-screen py-12">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-x-8 gap-y-12 lg:gap-x-16 lg:gap-y-16">
                    {map(drops, (d) => (
                      <DropPreview
                        key={d.dropId}
                        // id={false}
                        shadow
                        src={d.img}
                        video={isVideoDrop(d)}
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
                        dropped={d.startTime}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Main>
  );
}
