import React, { useState, useEffect } from "react";
import { get, find, includes } from "lodash";
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
import { getDropThumbnail } from "../../components/general/helpers";
import StandardLoadWrapper from "../../components/general/StandardLoadWrapper";
import SEOBoilerplate from "../../components/general/SEOBoilerplate";

export default function Drop({ id, drop, img }) {
  const [updatedDrop, setUpdatedDrop] = useState(drop);
  const [updatedArt, setUpdatedArt] = useState(null);
  const [timeUntil, setTimeUntil] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [loading, setloading] = useState(true);
  const dropInfo = find(
    process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet" ? dropsData : testDropsData,
    (d) => d.id == id
  );
  useEffect(async () => {
    setloading(true);
    const art = await getDropThumbnail(id, "auto", drop.metadata.type);
    setUpdatedArt(art);
    setloading(false);
    window.fetches = setInterval(async () => {
      const drop = await fetchDrop(id);
      setUpdatedDrop(drop);
    }, 30000);
    document.addEventListener("bid", () => fetchDrop(id), false);
    if (!art) setUpdatedArt(await fetchArt(id));
    return () => {
      clearInterval(window.fetches);
      document.removeEventListener("bid", () => fetchDrop(id), false);
    };
  }, [id]);
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
      const timer = setInterval(() => {
        setTimeUntil((t) => t - 1);
        setTimeRemaining((t) => t - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [loading, updatedDrop.timeRemaining]);
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
              <DropProperties drop={updatedDrop} art={updatedArt} />
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
  if (includes(["11", "12", "13", "15", "20", "22"], id))
    return { props: { id, drop: {}, art: null } };
  if (includes([1, 6, 9, 11, 12, 13, 15, 20, 22], id))
    return { props: { id, drop: {}, art: null } };
  const drop = await fetchDrop(id);
  const img = await getDropThumbnail(id, "1400", drop.metadata.type);
  return { props: { id, drop, img } };
}
