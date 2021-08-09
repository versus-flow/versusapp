import React, { useState, useEffect } from "react";
import { filter, find, map, uniqBy, get } from "lodash";
import Link from "next/link";

import Arrow from "../../assets/arrow.svg";
import ArrowButton from "../general/ArrowButton";
import DropPreview from "../marketplace/DropPreview";
import { getGraffleUrl } from "../general/helpers";
import moment from "moment";
import { getPiecesByIds } from "../../pages/marketplace";
import Loading from "../general/Loading";

const MarketplacePreview = () => {
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true);
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
  return (
    <div className="py-12">
      <div className="container">
        <h2 className="font-bold font-inktrap text-3xl sm:text-5xl">
          Marketplace
        </h2>
        {loading ? (
          <div className="w-full h-24 flex justify-center items-center">
            <Loading />
          </div>
        ) : pieces.length ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-x-8 gap-y-4 lg:gap-x-16 lg:gap-y-8">
              {map(pieces.slice(0, 6), (p) => (
                <DropPreview
                  key={p.id}
                  id={get(p, "data.id", get(p, "blockEventData.id"))}
                  shadow
                  img={p.img}
                  title={p.data.art.name}
                  artist={p.data.art.artist}
                  edition={`#${p.data.art.edition}/${p.data.art.maxEdition}`}
                  zoom
                  img={p.img}
                  price={parseFloat(p.data.price).toFixed(1)}
                  button={
                    <Link href={`/listing/${p.blockEventData.id}`}>
                      <a className="standard-button small-button block mt-2">
                        Buy
                      </a>
                    </Link>
                  }
                />
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <ArrowButton
                text="Visit marketplace"
                href="/marketplace"
                className="transparent-button lg-button"
              />
            </div>
          </>
        ) : (
          <div className="text-2xl mt-12 pb-12 text-center">
            Everything is currently sold out!
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePreview;
