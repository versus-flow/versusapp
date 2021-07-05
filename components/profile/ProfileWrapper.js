import React, { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { map } from "lodash";

import ProfileSummary from "./ProfileSummary";
import { fetchProfile } from "../../pages/profile/[name]";
import ProfileTabs from "./ProfileTabs";
import { fetchMyArt, fetchOneArt } from "./transactions";
import Collection from "./Collection";
import Loading from "../general/Loading";

export const getArt = async (addr) => {
  const response = await fcl.send([
    fcl.script(fetchMyArt),
    fcl.args([fcl.arg(addr, t.Address)]),
  ]);
  const artResponse = await fcl.decode(response);
  const allPieces = await Promise.all(
    map(artResponse, async (r) => {
      const oneArtResponse = await fcl.send([
        fcl.script(fetchOneArt),
        fcl.args([fcl.arg(addr, t.Address), fcl.arg(r.id, t.UInt64)]),
      ]);
      return { ...r, img: await fcl.decode(oneArtResponse) };
    })
  );
  return allPieces;
};

const ProfileWrapper = ({ self, user }) => {
  useEffect(async () => {
    if (self && user && user.addr) {
      // const profile = await fetchProfile(user.addr);
      // console.log(profile);
    }
  }, [self, user]);
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const allPieces = await getArt(user.addr);
    setPieces(allPieces);
    setLoading(false);
  }, []);
  return (
    <>
      <ProfileSummary />
      <ProfileTabs />
      {loading ? (
        <div className="bg-white">
          <div className="flex flex-col items-center mx-auto pb-36 pt-24 text-center w-60">
            <Loading />{" "}
          </div>
        </div>
      ) : (
        <Collection pieces={pieces} />
      )}
    </>
  );
};

export default ProfileWrapper;
