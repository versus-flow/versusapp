import React from "react";
import Main from "../../../components/layouts/Main";

import FullItem from "../../../components/marketplace/FullItem";

export default function OneItem({ addr, id }) {
  return (
    <Main>
      {(user) => (
        <FullItem address={addr} id={parseInt(id, 10)} unlisted user={user} />
      )}
    </Main>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { id, addr },
  } = context;
  return { props: { id, addr } };
}
