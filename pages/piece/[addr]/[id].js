import React from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { find, get } from "lodash";

import FullItem from "../../../components/marketplace/FullItem";
import Main from "../../../components/layouts/Main";
import { fetchMyArt } from "../../../components/profile/transactions";
import { fetchProfile } from "../../profile/[name]";
import { getCacheThumbnail } from "../../../components/general/helpers";
import SEOBoilerplate from "../../../components/general/SEOBoilerplate";

export default function OneItem({ addr, id, piece, art }) {
  return (
    <Main
      seo={
        <SEOBoilerplate
          title={`${get(piece, "art.name")} by ${get(
            piece,
            "art.artist"
          )} | Versus`}
          description={get(piece, "art.description")}
          url={`piece/${addr}/${id}`}
          title={art}
        />
      }
    >
      {(user) => (
        <FullItem
          address={addr}
          id={parseInt(id, 10)}
          unlisted
          user={user}
          piece={piece}
        />
      )}
    </Main>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { id, addr },
  } = context;
  const response = await fcl.send([
    fcl.script(fetchMyArt),
    fcl.args([fcl.arg(addr, t.Address)]),
  ]);
  const artResponse = await fcl.decode(response);
  const thisArt = find(artResponse, (a) => a.id === parseInt(id, 10));
  const i = thisArt;
  i.art = thisArt.metadata;
  const owner = await fetchProfile(addr);
  const piece = {
    ...i,
    metadata: i.art,
    owner,
  };
  const art = await getCacheThumbnail(i.cacheKey, "1400", i.art.type);
  return { props: { id, addr, piece, art } };
}
