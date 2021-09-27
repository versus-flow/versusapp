import React from "react";
import { find, get } from "lodash";

import FullItem, { oneListedItem } from "../../components/marketplace/FullItem";
import {
  getCacheThumbnail,
  getGraffleUrl,
} from "../../components/general/helpers";
import Main from "../../components/layouts/Main";
import { fetchProfile } from "../profile/[name]";
import SEOBoilerplate from "../../components/general/SEOBoilerplate";

export default function Listing({ id, piece, address, art }) {
  return (
    <>
      <Main
        seo={
          <SEOBoilerplate
            title={`${get(piece, "art.name")} by ${get(
              piece,
              "art.artist"
            )} | Versus`}
            description={get(piece, "art.description")}
            url={`https://www.versus.auction/listing/${id}`}
            image={art}
          />
        }
      >
        {(user) => (
          <FullItem
            address={address}
            id={parseInt(id, 10)}
            user={user}
            piece={piece}
          />
        )}
      </Main>
    </>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { id },
  } = context;
  let forSale = await (
    await fetch(
      getGraffleUrl(`?eventType=A.CONTRACT.Marketplace.ForSale&id=${id}`)
    )
  ).json();
  const item = find(forSale, (i) => i.blockEventData.id === parseInt(id, 10));
  const address = get(item, "blockEventData.from");
  const i = await oneListedItem(address, parseInt(id, 10));
  const piece = {
    ...i,
    metadata: i.art,
    owner: await fetchProfile(address),
  };
  const art = await getCacheThumbnail(i.cacheKey, 1400, i.art.type);

  return { props: { id, item, piece, address, art } };
}
