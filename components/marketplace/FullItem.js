import React, { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import Head from "next/head";

import SaleMain from "./SaleMain";
import DropProperties from "../drop/DropProperties";
import AboutCreator from "./AboutCreator";
import PurchaseHistory from "./PurchaseHistory";
import JoinCommunity from "../general/JoinCommunity";
import Loading from "../general/Loading";
import { oneArt } from "../profile/ProfileWrapper";
import { getOneMarketplaceItem } from "./transactions";
import { get } from "lodash";
import { getCacheThumbnail } from "../general/helpers";

export async function oneListedItem(addr, tokenID) {
  const oneArtResponse = await fcl.send([
    fcl.script(getOneMarketplaceItem),
    fcl.args([fcl.arg(addr, t.Address), fcl.arg(tokenID, t.UInt64)]),
  ]);
  return fcl.decode(oneArtResponse);
}

export default function FullItem({ id, address, unlisted, user, piece }) {
  const [art, setArt] = useState("");
  useEffect(async () => {
    let img = "";
    if (unlisted) {
      const imgUrl = await getCacheThumbnail(
        piece.cacheKey,
        "auto",
        piece.art.type
      );
      setArt(imgUrl);
      if (!imgUrl) {
        const oneArtResponse = await fcl.send([
          fcl.script(fetchOneArt),
          fcl.args([fcl.arg(address, t.Address), fcl.arg(piece.id, t.UInt64)]),
        ]);
        img = await fcl.decode(oneArtResponse);
        setArt(img);
      }
    } else {
      const imgUrl = await getCacheThumbnail(
        piece.cacheKey,
        "auto",
        piece.art.type
      );
      setArt(imgUrl);
      if (!imgUrl) {
        img = await oneArt(address, parseInt(id, 10));
        setArt(img);
      }
    }
  }, []);
  return piece ? (
    <>
      <Head>
        <title>
          {get(piece, "art.name")} by {get(piece, "art.artist")} | Versus
        </title>
      </Head>
      <SaleMain
        piece={piece}
        address={address}
        user={user}
        unlisted={unlisted}
        art={art}
      />
      <DropProperties drop={piece} art={art} />
      <AboutCreator piece={piece} />
      <PurchaseHistory id={id} piece={piece} />
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
  );
}
