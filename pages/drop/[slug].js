import React, { useState, useEffect } from "react";
import { get, find, includes } from "lodash";
import moment from "moment";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import * as sdk from "@onflow/sdk";

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
import Head from "next/head";
import dropsData from "../../components/general/drops.json";
import testDropsData from "../../components/general/testdrops.json";
import Loading from "../../components/general/Loading";
import { getDropThumbnail } from "../../components/general/helpers";

export default function Drop({ id }) {
  const [updatedDrop, setUpdatedDrop] = useState({});
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
    setUpdatedDrop({});
    setUpdatedArt(null);
    if (includes(["11", "12", "13", "15"], id)) return null;
    if (includes([1, 6, 9, 11, 12, 13, 15, 20, 22], id)) return null;
    const drop = await fetchDrop(id);
    setUpdatedDrop(drop);
    setloading(false);
    setUpdatedArt(await getDropThumbnail(id));
    window.fetches = setInterval(async () => {
      const drop = await fetchDrop(id);
      setUpdatedDrop(drop);
    }, 30000);
    document.addEventListener("bid", () => fetchDrop(id), false);
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
    <Main>
      {(user) => (
        <>
          <Head>
            <title>
              {get(updatedDrop, "metadata.name")} by{" "}
              {get(updatedDrop, "metadata.artist")}
            </title>
          </Head>
          {loading ? (
            <div className="h-96 flex justify-center items-center">
              <Loading />
            </div>
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

async function fetchDrop(id) {
  const response = await fcl.send([
    fcl.script(fetchVersusDrop),
    fcl.args([fcl.arg(parseInt(id), t.UInt64)]),
  ]);
  return await fcl.decode(response);
}

async function fetchArt(id) {
  const response = await fcl.send([
    fcl.script(fetchVersusArt),
    fcl.args([fcl.arg(parseInt(id), t.UInt64)]),
  ]);
  return await fcl.decode(response);
}

export async function getServerSideProps(context) {
  const id = get(context, "params.slug");
  // const drop = await fetchDrop(id);
  // const art = await fetchArt(id);

  return { props: { id } };
}
