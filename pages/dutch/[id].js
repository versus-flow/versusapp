import React, { useState, useEffect, useRef } from "react";
import { find, get } from "lodash";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import {
  fetchDutchDrop,
  getAuctionBids,
} from "../../components/drop/dutch/transactions";
import Main from "../../components/layouts/Main";
import SEOBoilerplate from "../../components/general/SEOBoilerplate";
import StandardLoadWrapper from "../../components/general/StandardLoadWrapper";
import DropArtist from "../../components/drop/DropArtist";
import dutchData from "../../components/general/dutch.json";
import testDutchData from "../../components/general/testdutch.json";
import DropContent from "../../components/drop/DropContent";
import DutchBidBox from "../../components/drop/dutch/DutchBidBox";
import DutchBidHistory from "../../components/drop/dutch/DutchBidHistory";

export const fetchDutch = async (id) => {
  const response = await fcl.send([
    fcl.script(fetchDutchDrop),
    fcl.args([fcl.arg(parseInt(id), t.UInt64)]),
  ]);
  return await fcl.decode(response);
};

export const dutchBidsList = async (id) => {
  const response = await fcl.send([
    fcl.script(getAuctionBids),
    fcl.args([fcl.arg(parseInt(id), t.UInt64)]),
  ]);
  return await fcl.decode(response);
};

const Dutch = ({ drop, id }) => {
  console.log(drop);
  const [updatedDrop, setUpdatedDrop] = useState(drop);
  const [bids, setBids] = useState(null);
  console.log(bids);
  const dropInfo = find(
    process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet" ? dutchData : testDutchData,
    (d) => d.id == id
  );
  const [loading, setLoading] = useState(false);
  const img =
    "https://asset-preview.nbatopshot.com/packs/common/pack_common_baseset.png";
  useEffect(async () => setBids(await dutchBidsList(id)), []);
  return (
    <Main
      seo={
        <SEOBoilerplate
          title={`${get(drop, "metadata.name")} by ${get(
            drop,
            "metadata.artist"
          )} | Versus Dutch Auction`}
          description={get(drop, "metadata.description")}
          url={`dutch/${id}`}
          image={img}
        />
      }
    >
      {(user) =>
        loading ? (
          <StandardLoadWrapper large />
        ) : (
          <>
            <DropArtist drop={drop} dropInfo={dropInfo} dutch />
            <DropContent drop={drop} art={img} dutch />
            <div className="bg-white py-12">
              <div className="container">
                <div className="grid grid-cols-12">
                  <div className="col-span-4">
                    <DutchBidBox
                      drop={updatedDrop}
                      art={img}
                      user={user}
                      id={id}
                    />
                  </div>
                  <div className="col-span-8"></div>
                </div>
                {bids && <DutchBidHistory id={id} bids={bids} />}
              </div>
            </div>
          </>
        )
      }
    </Main>
  );
};

export default Dutch;

export async function getServerSideProps(context) {
  const id = get(context, "params.id");
  const drop = await fetchDutch(id);
  console.log(drop);
  return { props: { id, drop } };
}
