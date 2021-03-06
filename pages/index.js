import React from "react";

import Main from "../components/layouts/Main";
import Landing from "../components/home/Landing";
import MarketplacePreview from "../components/home/MarketplacePreview";
import Rewarded from "../components/home/Rewarded";
import BetterForArt from "../components/home/BetterForArt";
import dropsData from "../components/general/drops.json";
import testDropsData from "../components/general/testdrops.json";
import { filter, first, last } from "lodash";
import { fetchDrop } from "./drop/[slug]";
import moment from "moment";

const Home = ({ latestDrop }) => {
  return (
    <Main>
      {() => (
        <>
          <Landing drop={latestDrop} />
          <MarketplacePreview />
          <Rewarded />
          <BetterForArt />
        </>
      )}
    </Main>
  );
};

export async function getServerSideProps(context) {
  const dropList =
    process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet" ? dropsData : testDropsData;
  const latest = last(dropList);
  const drop = await fetchDrop(parseInt(latest.id, 10));
  const latestDrop = { ...drop, info: latest };
  return { props: { latestDrop } };
}

export default Home;
