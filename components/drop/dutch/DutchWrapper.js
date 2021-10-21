import React, { useState, useEffect } from "react";
import { find, get } from "lodash";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import DropArtist from "../DropArtist";
import DropContent from "../DropContent";
import DutchBidBox from "./DutchBidBox";
import DutchBidHistory from "./DutchBidHistory";
import { getAddressDutchBids, getAuctionBids } from "./transactions";
import dutchData from "../../general/dutch.json";
import testDutchData from "../../general/testdutch.json";

export const dutchBidsList = async (id) => {
  const response = await fcl.send([
    fcl.script(getAuctionBids),
    fcl.args([fcl.arg(parseInt(id), t.UInt64)]),
  ]);
  return await fcl.decode(response);
};

export const dutchBidsListOne = async (addr, id) => {
  try {
    const response = await fcl.send([
      fcl.script(getAddressDutchBids),
      fcl.args([fcl.arg(addr, t.Address), fcl.arg(parseInt(id, 10), t.UInt64)]),
    ]);
    return await fcl.decode(response);
  } catch (e) {
    return [];
  }
};

const DutchWrapper = ({ drop, id, user, art }) => {
  console.log(drop);
  const [updatedDrop, setUpdatedDrop] = useState(drop);
  const [bids, setBids] = useState(null);
  const [myBids, setMyBids] = useState(null);
  console.log(myBids, bids);
  const dropInfo = find(
    process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet" ? dutchData : testDutchData,
    (d) => d.id == id
  );
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setBids(await dutchBidsList(id));
    if (get(user, "addr")) setMyBids(await dutchBidsListOne(user.addr, id));
  }, [user]);
  return (
    <>
      <DropArtist drop={drop} dropInfo={dropInfo} dutch />
      <DropContent drop={drop} art={art} dutch />
      <div className="bg-white py-12">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-4">
              <DutchBidBox drop={updatedDrop} art={art} user={user} id={id} />
            </div>
            <div className="col-span-8"></div>
          </div>
          {myBids && <DutchBidHistory id={id} myBids={myBids} bids={bids} />}
        </div>
      </div>
    </>
  );
};

export default DutchWrapper;
