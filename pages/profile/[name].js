import React, { useEffect } from "react";
import { get, includes } from "lodash";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import Main from "../../components/layouts/Main";
import {
  getFindProfile,
  getFindProfileInfo,
  profileGet,
} from "../../components/profile/transactions";
import ProfileWrapper from "../../components/profile/ProfileWrapper";
import SEOBoilerplate from "../../components/general/SEOBoilerplate";

export async function fetchProfile(addr) {
  let addrlookup = addr;
  if (includes(addr, "0x") && addr.length === 18) {
  } else {
    const findResponse = await fcl.send([
      fcl.script(getFindProfile),
      fcl.args([fcl.arg(addr, t.String)]),
    ]);
    addrlookup = await fcl.decode(findResponse);
    const findProfileResponse = await fcl.send([
      fcl.script(getFindProfileInfo),
      fcl.args([fcl.arg(addr, t.String)]),
    ]);
    const findProfile = await fcl.decode(findProfileResponse);
    return { ...findProfile, type: "find" };
  }
  const response = await fcl.send([
    fcl.script(profileGet),
    fcl.args([fcl.arg(addrlookup, t.Address)]),
  ]);
  return await fcl.decode(response);
}

export default function Profile({ self, name, profile }) {
  return (
    <Main
      seo={
        profile ? (
          <SEOBoilerplate
            title={`${
              profile.name || profile.address
                ? profile.name
                  ? `@${profile.name} Profile`
                  : `@${profile.address} Profile`
                : "Profile"
            } | Versus`}
            description={get(profile, "description")}
            image={get(profile, "avatar")}
            url={`profile/${profile.address}`}
          />
        ) : null
      }
    >
      {(user) =>
        (user.addr || name) && (
          <ProfileWrapper
            user={user}
            self={self}
            name={name}
            profile={profile}
          />
        )
      }
    </Main>
  );
}

export async function getServerSideProps(context) {
  const name = get(context, "params.name");
  if (name === "me") return { props: { self: true } };
  const profile = await fetchProfile(name);
  return { props: { name: get(profile, "address", name), profile } };
}
