import React, { useState, useEffect } from "react";
import { get, find } from "lodash";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import * as sdk from "@onflow/sdk";

import DropArtist from "../../../components/drop/DropArtist";
import DropTabs from "../../../components/drop/DropTabs";
import Main from "../../../components/layouts/Main";
import { fetchVersusDrop } from "../../../components/profile/transactions";
import Head from "next/head";
import dropsData from "../../../components/general/drops.json";
import testDropsData from "../../../components/general/testdrops.json";
import { getArt } from "../../../components/profile/ProfileWrapper";
import Loading from "../../../components/general/Loading";
import Collection from "../../../components/profile/Collection";

export default function DropCollection({ id }) {
  const dropInfo = find(
    process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet" ? dropsData : testDropsData,
    (d) => d.id == id
  );
  const [pieces, setPieces] = useState([]);
  const [drop, setDrop] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const d = await fetchDrop(id);
    setDrop(d);
    const allPieces = await getArt(d.metadata.artistAddress);
    setPieces(allPieces);
    setLoading(false);
  }, [id]);
  return (
    <Main>
      {(user) => (
        <>
          {loading ? (
            <>
              <div className="bg-white">
                <div className="flex flex-col items-center mx-auto pb-36 pt-24 text-center w-60">
                  <Loading />{" "}
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <Head>
                <title>
                  {drop.metadata.name} by {drop.metadata.artist}
                </title>
              </Head>
              <DropArtist drop={drop} dropInfo={dropInfo} />
              <DropTabs id={id} collection />
              <Collection pieces={pieces} other />
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

export async function getServerSideProps(context) {
  const id = get(context, "params.slug");

  return { props: { id } };
}
