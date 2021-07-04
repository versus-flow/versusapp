import React, { useState, useEffect } from "react";
import { get } from "lodash";
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

export default function Drop({ drop, art }) {
  const [updatedDrop, setUpdatedDrop] = useState(drop);
  const [timeUntil, setTimeUntil] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  useEffect(() => {
    if (parseFloat(drop.timeRemaining) - timeRemaining > 15 && timeRemaining) {
      setTimeRemaining(parseFloat(drop.timeRemaining));
    } else {
      setTimeUntil(parseFloat(drop.startTime) - moment().unix());
      setTimeRemaining(parseFloat(drop.timeRemaining));
      const timer = setInterval(() => {
        setTimeUntil((t) => t - 1);
        setTimeRemaining((t) => t - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [drop.timeRemaining]);
  return (
    <Main>
      {(user) => (
        <>
          <Head>
            <title>
              {drop.metadata.name} by {drop.metadata.artist}
            </title>
          </Head>
          <DropArtist drop={drop} />
          <DropTabs />
          <DropContent
            drop={drop}
            art={art}
            timeUntil={timeUntil}
            timeRemaining={timeRemaining}
          />{" "}
          {timeUntil <= 0 && (
            <DropBids
              drop={drop}
              art={art}
              timeRemaining={timeRemaining}
              user={user}
            />
          )}
          <DropProperties drop={drop} art={art} />
          <DropFollow />
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
  // if (drop == null) {
  const drop = await fetchDrop(id);
  const art = await fetchArt(id);
  // window.fetches = setInterval(() => {
  //   fetchDrop();
  // }, 30000);
  // }
  // document.addEventListener(
  //   "bid",
  //   () => {
  //     fetchDrop();
  //   },
  //   false
  // );

  // Pass data to the page via props
  return { props: { drop, art } };
}
