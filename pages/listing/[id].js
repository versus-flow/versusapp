import React, { useEffect, useState } from "react";
import { find, get } from "lodash";

import FullItem from "../../components/marketplace/FullItem";
import Loading from "../../components/general/Loading";
import { getGraffleUrl } from "../../components/general/helpers";
import Main from "../../components/layouts/Main";

export default function Listing({ id }) {
  const [address, setAddress] = useState(null);
  useEffect(async () => {
    let forSale = await (
      await fetch(
        getGraffleUrl(`?eventType=A.CONTRACT.Marketplace.ForSale&id=${id}`)
      )
    ).json();
    const item = find(forSale, (i) => i.blockEventData.id === parseInt(id, 10));
    setAddress(get(item, "blockEventData.from"));
  }, []);
  return (
    <Main>
      {(user) =>
        address ? (
          <FullItem address={address} id={parseInt(id, 10)} user={user} />
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
    params: { id },
  } = context;
  return { props: { id } };
}
