import React, { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import Main from "../../../components/layouts/Main";
import SaleMain from "../../../components/marketplace/SaleMain";
import DropProperties from "../../../components/drop/DropProperties";
import AboutCreator from "../../../components/marketplace/AboutCreator";
import PurchaseHistory from "../../../components/marketplace/PurchaseHistory";
import BetterForArt from "../../../components/home/BetterForArt";
import JoinCommunity from "../../../components/general/JoinCommunity";
import Loading from "../../../components/general/Loading";
import { oneArt } from "../../../components/profile/ProfileWrapper";
import { getOneMarketplaceItem } from "../../../components/marketplace/transactions";
import { fetchProfile } from "../../profile/[name]";

export async function oneListedItem(addr, tokenID) {
  const oneArtResponse = await fcl.send([
    fcl.script(getOneMarketplaceItem),
    fcl.args([fcl.arg(addr, t.Address), fcl.arg(tokenID, t.UInt64)]),
  ]);
  return fcl.decode(oneArtResponse);
}

export default function Sale({ id, address }) {
  const [piece, setPiece] = useState(null);
  useEffect(async () => {
    let i = await oneListedItem(address, parseInt(id, 10));
    const img = await oneArt(address, parseInt(id, 10));
    const artist = await fetchProfile(i.art.artistAddress);
    const owner = await fetchProfile(address);
    setPiece({
      ...i,
      metadata: i.art,
      img,
      owner,
    });
  }, []);
  return (
    <Main>
      {(user) =>
        piece ? (
          <>
            <SaleMain piece={piece} />
            <DropProperties drop={piece} art={piece.img} />
            <AboutCreator piece={piece} />
            <PurchaseHistory id={id} />
            <div className="py-12">
              <div className="container">
                <JoinCommunity />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-48 min-h-screen flex justify-center pt-36">
            <Loading />
          </div>
        )
      }
    </Main>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { id, address },
  } = context;
  return { props: { id, address } };
}
