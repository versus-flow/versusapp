import React, { useState, useEffect, useRef } from "react";
import { get, find, includes, clone, size, reduce } from "lodash";
import moment from "moment";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import DropArtist from "../../components/drop/DropArtist";
import DropBids from "../../components/drop/DropBids";
import DropContent from "../../components/drop/DropContent";
import DropFollow from "../../components/drop/DropFollow";
import DropProperties from "../../components/drop/DropProperties";
import DropTabs from "../../components/drop/DropTabs";
import Main from "../../components/layouts/Main";
import {
  fetchVersusArt,
  fetchVersusDrop,
} from "../../components/profile/transactions";
import dropsData from "../../components/general/drops.json";
import testDropsData from "../../components/general/testdrops.json";
import {
  getDropThumbnail,
  isSpecialDrop,
} from "../../components/general/helpers";
import StandardLoadWrapper from "../../components/general/StandardLoadWrapper";
import SEOBoilerplate from "../../components/general/SEOBoilerplate";
import GraffleSDK from "../../components/general/graffle";
import UniqueBidBox from "../../components/drop/UniqueBidBox";
import DropArt from "../../components/drop/DropArt";
import DropCounter from "../../components/drop/DropCounter";
import SingleBidHistory from "../../components/drop/special/SingleBidHistory";
import DropListings from "../../components/marketplace/DropListings";

export default function Drop({ id, drop, img }) {
  const [updatedDrop, setUpdatedDrop] = useState(drop);
  const [updatedArt, setUpdatedArt] = useState(null);
  const [timeUntil, setTimeUntil] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [loading, setloading] = useState(true);
  const [latestMessage, setLatestMessage] = useState({});
  const dropInfo = find(
    process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet" ? dropsData : testDropsData,
    (d) => d.id == id
  );
  useEffect(async () => {
    setloading(true);
    const art = isSpecialDrop(drop)
      ? await fetchArt(id)
      : await getDropThumbnail(id, "auto", drop.metadata.type);
    setUpdatedArt(art);
    setloading(false);
    if (!art) setUpdatedArt(await fetchArt(id));
    // window.fetches = setInterval(async () => {
    //   const drop = await fetchDrop(id);
    //   setUpdatedDrop(drop);
    // }, 30000);
    // return () => {
    // };
  }, [id]);
  useEffect(async () => {
    if (includes([60, 40, 20, 10, 4], timeRemaining)) {
      const drop = await fetchDrop(id);
      setUpdatedDrop(drop);
    }
  }, [timeRemaining]);
  useEffect(() => {
    if (loading) return;
    if (
      parseFloat(updatedDrop.timeRemaining) - timeRemaining > 15 &&
      timeRemaining
    ) {
      setTimeRemaining(parseFloat(updatedDrop.timeRemaining));
    } else {
      setTimeUntil(parseFloat(updatedDrop.startTime) - moment().unix());
      setTimeRemaining(parseFloat(updatedDrop.timeRemaining));
      const timer = setInterval(async () => {
        setTimeUntil((t) => t - 1);
        setTimeRemaining((t) => t - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [loading, updatedDrop.timeRemaining]);
  const clientConfig = {
    projectId: process.env.NEXT_PUBLIC_GRAFFLE_PROJECT_ID,
    mainNetApiKey:
      process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet"
        ? process.env.NEXT_PUBLIC_GRAFFLE_PRIMARY_KEY
        : "",
    testNetApiKey:
      process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet"
        ? ""
        : process.env.NEXT_PUBLIC_GRAFFLE_PRIMARY_KEY,
  };

  const streamSDK = new GraffleSDK(
    clientConfig,
    process.env.NEXT_PUBLIC_FLOW_ENV !== "mainnet"
  );
  const feed = async (message) => {
    if (get(message, "blockEventData.dropId") != id) return;
    const isBid = includes(get(message, "flowEventId"), "Bid");
    if (isBid) {
      setLatestMessage(message);
      const {
        blockEventData: { auctionId, bidder, price },
      } = message;
      let newDrop = clone(drop);
      if (get(newDrop, "uniqueStatus.id") === auctionId) {
        const { uniqueStatus } = newDrop;
        newDrop.uniqueStatus = {
          ...uniqueStatus,
          bids: uniqueStatus.bids + 1,
          leader: bidder,
          price,
          minNextBid: parseFloat(uniqueStatus.bidIncrement) + price,
        };
        setUpdatedDrop(newDrop);
      } else {
        const edition = find(
          newDrop.editionsStatuses,
          (e) => e.id === auctionId
        );
        if (edition) {
          newDrop.editionsStatuses[auctionId] = {
            ...edition,
            bids: edition.bids + 1,
            leader: bidder,
            price,
            minNextBid: parseFloat(edition.bidIncrement) + price,
          };
        }
        setUpdatedDrop(newDrop);
      }
      return;
    }
    const isSettle = includes(get(message, "flowEventId"), "Settle");
    if (isSettle) {
      const d = await fetchDrop(id);
      setUpdatedDrop(d);
    }
    const isExtended = includes(get(message, "flowEventId"), "ExtendedBid");
    if (isExtended) {
    }
  };
  let conn = useRef();
  useEffect(async () => {
    conn.current = await streamSDK.stream(feed);
  }, [id]);
  useEffect(() => () => conn.current.stop(), []);
  const oneSidedDrop = size(updatedDrop.editionsStatuses) === 0;
  const uniqueTotal = parseFloat(get(updatedDrop, "uniqueStatus.price"));
  const editionTotal = reduce(
    updatedDrop.editionsStatuses,
    (sum, e) => sum + parseFloat(e.price),
    0
  );
  const ended = !updatedDrop.active && updatedDrop.winning !== "TIE";
  const hasntStarted = parseFloat(updatedDrop.startTime) - moment().unix() > 0;
  return (
    <Main
      seo={
        <SEOBoilerplate
          title={`${get(updatedDrop, "metadata.name")} by ${get(
            updatedDrop,
            "metadata.artist"
          )} | Versus Auction`}
          description={get(updatedDrop, "metadata.description")}
          url={`drop/${id}`}
          image={img}
        />
      }
    >
      {(user) => (
        <>
          {loading ? (
            <StandardLoadWrapper large />
          ) : (
            <>
              <DropArtist drop={updatedDrop} dropInfo={dropInfo} />
              <DropTabs id={id} />
              {oneSidedDrop ? (
                <div>
                  <div className="bg-white py-6 sm:py-12">
                    <div className="container md:h-120">
                      <DropArt drop={updatedDrop} art={updatedArt} full />
                    </div>
                  </div>
                  <div className="bg-white pb-6 sm:pb-24">
                    <div className="container">
                      <div className="sm:container mx-auto md:mx-0 md:max-w-none md:grid grid-cols-2 items-stretch md:pt-12 pb-3">
                        <DropCounter
                          drop={updatedDrop}
                          timeRemaining={timeRemaining}
                          timeUntil={timeUntil}
                          noCount
                        />
                        <UniqueBidBox
                          drop={updatedDrop}
                          art={updatedArt}
                          winning={uniqueTotal > editionTotal}
                          ended={ended}
                          hasntStarted={hasntStarted}
                          user={user}
                          timeRemaining={timeRemaining}
                          single
                        />
                      </div>
                      <div className="py-6 sm:py-12">
                        <SingleBidHistory
                          drop={updatedDrop}
                          latestMessage={latestMessage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <DropContent
                    drop={updatedDrop}
                    art={updatedArt}
                    timeUntil={timeUntil}
                    timeRemaining={timeRemaining}
                  />{" "}
                  {timeUntil <= 0 && (
                    <DropBids
                      drop={updatedDrop}
                      art={updatedArt}
                      timeRemaining={timeRemaining}
                      user={user}
                    />
                  )}
                </>
              )}
              <DropProperties drop={updatedDrop} art={updatedArt} />
              {drop.settledAt && <DropListings drop={drop} />}
              <DropFollow dropInfo={dropInfo} />
            </>
          )}
        </>
      )}
    </Main>
  );
}

export async function fetchDrop(id) {
  const response = await fcl.send([
    fcl.script(fetchVersusDrop),
    fcl.args([fcl.arg(parseInt(id), t.UInt64)]),
  ]);
  return await fcl.decode(response);
}

async function fetchArt(id) {
  const idP = parseInt(id, 10);
  // const cachedImage = getCachedDrop(idP);
  // if (cachedImage) return cachedImage;
  const response = await fcl.send([
    fcl.script(fetchVersusArt),
    fcl.args([fcl.arg(idP, t.UInt64)]),
  ]);
  const img = await fcl.decode(response);
  // console.log(img);
  // setCachedDrop(idP, img);
  return img;
}

export async function getServerSideProps(context) {
  const id = get(context, "params.slug");
  if (includes(["11", "12", "13", "15", "20", "22", "37", "38"], id))
    return { props: { id, drop: {}, art: null } };
  if (includes([1, 6, 9, 11, 12, 13, 15, 20, 22, 37, 38], id))
    return { props: { id, drop: {}, art: null } };
  const drop = await fetchDrop(id);
  const dropInfo = find(
    process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet" ? dropsData : testDropsData,
    (d) => d.id == id
  );
  const img = await getDropThumbnail(
    id,
    "1400",
    dropInfo.gif ? "gif" : drop.metadata.type
  );
  return { props: { id, drop, img } };
}
