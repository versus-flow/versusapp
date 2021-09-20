import React, { useState, useEffect } from "react";

import Main from "../components/layouts/Main";
import Landing from "../components/home/Landing";
import MarketplacePreview from "../components/home/MarketplacePreview";
import Rewarded from "../components/home/Rewarded";
import BetterForArt from "../components/home/BetterForArt";
import dropsData from "../components/general/drops.json";
import testDropsData from "../components/general/testdrops.json";
import Loading from "../components/general/Loading";
import { last } from "lodash";
import { fetchDrop } from "./drop/[slug]";

export default function Home() {
  const [latestDrop, setLatestDrop] = useState(false);
  useEffect(async () => {
    const dropList =
      process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet"
        ? dropsData
        : testDropsData;
    const latest = last(dropList);
    const drop = await fetchDrop(parseInt(latest.id, 10));
    setLatestDrop({ ...drop, info: latest });
  }, []);
  return (
    <Main>
      {() =>
        latestDrop ? (
          <>
            <Landing drop={latestDrop} />
            <MarketplacePreview />
            <Rewarded />
            <BetterForArt />
          </>
        ) : (
          <div className="h-64 flex justify-center items-center">
            <Loading />
          </div>
        )
      }
    </Main>
  );
}
