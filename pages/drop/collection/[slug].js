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
import { getArt } from "../../../components/profile/ProfileWrapper";
import Loading from "../../../components/general/Loading";
import Collection from "../../../components/profile/Collection";

export default function Drop({ drop, id }) {
  const dropInfo = find(dropsData, (d) => d.id == id);
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const allPieces = await getArt(drop.metadata.artistAddress);
    setPieces(allPieces);
    setLoading(false);
  }, [id]);
  return (
    <Main>
      {(user) => (
        <>
          <Head>
            <title>
              {drop.metadata.name} by {drop.metadata.artist}
            </title>
          </Head>
          <DropArtist drop={drop} dropInfo={dropInfo} />
          <DropTabs id={id} collection />
          {loading ? (
            <div className="bg-white">
              <div className="flex flex-col items-center mx-auto pb-36 pt-24 text-center w-60">
                <Loading />{" "}
              </div>
            </div>
          ) : (
            <Collection pieces={pieces} other />
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
  const drop = await fetchDrop(id);

  return { props: { drop, id } };
}
