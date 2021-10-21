import React from "react";
import { get } from "lodash";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import { fetchDutchDrop } from "../../components/drop/dutch/transactions";
import Main from "../../components/layouts/Main";
import SEOBoilerplate from "../../components/general/SEOBoilerplate";
import DutchWrapper from "../../components/drop/dutch/DutchWrapper";

export const fetchDutch = async (id) => {
  const response = await fcl.send([
    fcl.script(fetchDutchDrop),
    fcl.args([fcl.arg(parseInt(id), t.UInt64)]),
  ]);
  return await fcl.decode(response);
};

const Dutch = ({ drop, id }) => {
  const img =
    "https://asset-preview.nbatopshot.com/packs/common/pack_common_baseset.png";
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
      {(user) => <DutchWrapper drop={drop} id={id} user={user} art={img} />}
    </Main>
  );
};

export default Dutch;

export async function getServerSideProps(context) {
  const id = get(context, "params.id");
  const drop = await fetchDutch(id);
  return { props: { id, drop } };
}
