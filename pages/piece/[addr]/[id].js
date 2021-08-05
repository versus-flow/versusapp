import React from "react";

import FullItem from "../../../components/marketplace/FullItem";

export default function OneItem({ addr, id }) {
  return <FullItem address={addr} id={parseInt(id, 10)} unlisted />;
}

export async function getServerSideProps(context) {
  const {
    params: { id, addr },
  } = context;
  return { props: { id, addr } };
}
