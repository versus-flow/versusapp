import React, { useEffect } from "react";
import { get } from "lodash";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import Main from "../../components/layouts/Main";
import { profileGet } from "../../components/profile/transactions";
import ProfileWrapper from "../../components/profile/ProfileWrapper";

export async function fetchProfile(addr) {
  const response = await fcl.send([
    fcl.script(profileGet),
    fcl.args([fcl.arg(addr, t.Address)]),
  ]);
  return await fcl.decode(response);
}

export default function Profile({ self }) {
  return <Main>{(user) => <ProfileWrapper user={user} self={self} />}</Main>;
}

export async function getServerSideProps(context) {
  const name = get(context, "params.name");
  if (name === "me") return { props: { self: true } };
  return { props: {} };
}
