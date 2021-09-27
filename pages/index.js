import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Main from "../components/layouts/Main";
import Landing from "../components/home/Landing";
import MarketplacePreview from "../components/home/MarketplacePreview";
import Rewarded from "../components/home/Rewarded";
import BetterForArt from "../components/home/BetterForArt";
import dropsData from "../components/general/drops.json";
import testDropsData from "../components/general/testdrops.json";
import { last } from "lodash";
import { fetchDrop } from "./drop/[slug]";
import StandardLoadWrapper from "../components/general/StandardLoadWrapper";

export default function Home() {
  const [latestDrop, setLatestDrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const start = () => setLoading(true);
    router.events.on("routeChangeStart", start);
    return () => router.events.off("routeChangeStart", start);
  }, []);
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
        latestDrop && !loading ? (
          <>
            <Landing drop={latestDrop} />
            <MarketplacePreview />
            <Rewarded />
            <BetterForArt />
          </>
        ) : (
          <StandardLoadWrapper />
        )
      }
    </Main>
  );
}
