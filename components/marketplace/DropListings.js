import React, { useState, useEffect } from "react";
import { filter, find, map, uniqBy, get, each, sortBy } from "lodash";
import Link from "next/link";
import Carousel from "react-grid-carousel";

import Arrow from "../../assets/arrow.svg";
import ArrowButton from "../general/ArrowButton";
import DropPreview from "../marketplace/DropPreview";
import {
  getCacheThumbnail,
  getGraffleUrl,
  isVideoDrop,
} from "../general/helpers";
import moment from "moment";
import { getPiecesByIds } from "../../pages/marketplace";
import Loading from "../general/Loading";
import { oneArt } from "../profile/ProfileWrapper";
import { ChevronLeft, ChevronRight } from "react-feather";

const DropListings = ({ drop }) => {
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const findActivePieces = async () => {
      let r = uniqBy(
        await (
          await fetch(
            getGraffleUrl(`?eventType=A.CONTRACT.Marketplace.ForSale`)
          )
        ).json(),
        (i) => i.blockEventData.id
      );
      let sold = uniqBy(
        await (
          await fetch(
            getGraffleUrl(`?eventType=A.CONTRACT.Marketplace.TokenPurchased`)
          )
        ).json(),
        (i) => i.blockEventData.id
      );
      let withdrawn = uniqBy(
        await (
          await fetch(
            getGraffleUrl(`?eventType=A.CONTRACT.Marketplace.SaleWithdrawn`)
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
      const piecesOrig = await getPiecesByIds(filtered);
      const piecesFilt = filter(
        piecesOrig,
        (p) => p.metadata.name === drop.metadata.name
      );
      const pieces = sortBy(piecesFilt, (p) => p.blockEventData.price);
      setPieces(pieces);
      setLoading(false);
      each(pieces, async (p) => {
        try {
          const img =
            (await getCacheThumbnail(
              p.data.cacheKey,
              600,
              get(p, "data.art.type")
            )) || (await oneArt(p.blockEventData.from, p.blockEventData.id));
          setPieces((listings) =>
            map(listings, (l) =>
              l.data.cacheKey === p.data.cacheKey ? { ...l, img } : l
            )
          );
        } catch (e) {
          console.log(e);
        }
      });
    };
    findActivePieces();
  }, []);
  return (
    <div className="py-12">
      <div className="container">
        <h2 className="font-bold font-inktrap text-3xl sm:text-5xl">
          Missed the Drop?
        </h2>
        <h3 className="text-lg sm:text-2xl font-inktrap font-bold mt-2">
          Marketplace Listings
        </h3>
        {loading ? (
          <div className="w-full h-24 flex justify-center items-center">
            <Loading />
          </div>
        ) : pieces.length ? (
          <div className="mt-6">
            <Carousel
              cols={3}
              gap={40}
              arrowLeft={
                <ChevronLeft className="absolute top-1/2 -translate-y-1/2 -left-4 cursor-pointer" />
              }
              arrowRight={
                <ChevronRight className="absolute top-1/2 -translate-y-1/2 -right-4 cursor-pointer" />
              }
              containerStyle={{ paddingBottom: "10px" }}
              responsiveLayout={[
                {
                  breakpoint: 1024,
                  cols: 2,
                  rows: 1,
                },
                {
                  breakpoint: 640,
                  cols: 1,
                  rows: 1,
                },
              ]}
            >
              {map(pieces, (p) => (
                <Carousel.Item>
                  <DropPreview
                    key={p.id}
                    id={get(p, "data.id", get(p, "blockEventData.id"))}
                    shadow
                    img={p.img}
                    title={p.data.art.name}
                    artist={p.data.art.artist}
                    edition={`#${p.data.art.edition}/${p.data.art.maxEdition}`}
                    zoom
                    src={p.img}
                    video={isVideoDrop(p)}
                    price={parseFloat(p.data.price).toFixed(1)}
                    button={
                      <Link href={`/listing/${p.blockEventData.id}`}>
                        <a className="standard-button small-button block mt-2">
                          View
                        </a>
                      </Link>
                    }
                    className="mb-16"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        ) : (
          <div className="text-2xl mt-12 pb-12 text-center">
            No pieces from this drop are currently listed!
          </div>
        )}
      </div>
    </div>
  );
};

export default DropListings;
