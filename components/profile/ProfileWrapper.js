import React, { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { each, find, findIndex, map } from "lodash";

import ProfileSummary from "./ProfileSummary";
import { fetchProfile } from "../../pages/profile/[name]";
import ProfileTabs from "./ProfileTabs";
import { fetchMyArt, fetchOneArt } from "./transactions";
import Collection from "./Collection";
import Loading from "../general/Loading";
import { getArtContent, getMarketpaceItems } from "../marketplace/transactions";
import {
  getCacheThumbnail,
  resizedataURL,
  uploadFile,
} from "../general/helpers";
import Head from "next/head";

export const getArt = async (addr) => {
  const response = await fcl.send([
    fcl.script(fetchMyArt),
    fcl.args([fcl.arg(addr, t.Address)]),
  ]);
  const artResponse = await fcl.decode(response);
  const allPieces = await Promise.all(
    map(artResponse, async (r) => {
      // const imgUrl = await getCacheThumbnail(r.cacheKey, 600);
      // if (imgUrl) return { ...r, img: imgUrl };
      const oneArtResponse = await fcl.send([
        fcl.script(fetchOneArt),
        fcl.args([fcl.arg(addr, t.Address), fcl.arg(r.id, t.UInt64)]),
      ]);
      const img = await fcl.decode(oneArtResponse);
      setCachedImage(r.id, img);
      return { ...r, img };
    })
  );
  return allPieces;
};

export const getArtDrawing = async (addr, id) => {
  const oneArtResponse = await fcl.send([
    fcl.script(fetchOneArt),
    fcl.args([fcl.arg(addr, t.Address), fcl.arg(id, t.UInt64)]),
  ]);
  return fcl.decode(oneArtResponse);
};

export const getArtNoDrawing = async (addr) => {
  const response = await fcl.send([
    fcl.script(fetchMyArt),
    fcl.args([fcl.arg(addr, t.Address)]),
  ]);
  const artResponse = await fcl.decode(response);
  return artResponse;
};

export async function oneArt(addr, artId) {
  const oneArtResponse = await fcl.send([
    fcl.script(getArtContent),
    fcl.args([fcl.arg(addr, t.Address), fcl.arg(artId, t.UInt64)]),
  ]);
  return fcl.decode(oneArtResponse);
}

export async function getMyListings(addr) {
  const response = await fcl.send([
    fcl.script(getMarketpaceItems),
    fcl.args([fcl.arg(addr, t.Address)]),
  ]);
  return await fcl.decode(response);
}

const ProfileWrapper = ({ self, user, name }) => {
  const [currentProfile, setCurrentProfile] = useState({});
  const [pieces, setPieces] = useState([]);
  const [marketPieces, setMarketPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [arts, setArts] = useState([]);
  useEffect(async () => {
    if ((self && user && user.addr) || name) {
      setLoading(true);
      setMarketPieces([]);
      const addr = self ? user.addr : name;
      const profile = await fetchProfile(addr);
      setCurrentProfile(profile || {});
      const myListings = await getMyListings(addr);
      setMarketPieces(map(myListings, (m) => ({ ...m, metadata: m.art })));
      each(myListings, async (e) => {
        try {
          const img =
            (await getCacheThumbnail(e.cacheKey, "600", e.art.type)) ||
            (await oneArt(addr, e.id));
          setMarketPieces((listings) =>
            map(listings, (l) =>
              l.cacheKey === e.cacheKey ? { ...l, img } : l
            )
          );
        } catch (e) {
          console.log(e);
        }
      });
    }
  }, [self, name]);
  useEffect(async () => {
    setLoading(true);
    setPieces([]);
    const allPieces = await getArtNoDrawing(name || user.addr);
    setPieces(allPieces);
    setLoading(false);
    each(allPieces, async (p) => {
      try {
        const pieceArt =
          (await getCacheThumbnail(p.cacheKey, "600", p.metadata.type)) ||
          (await getArtDrawing(name || user.addr, p.id));
        setPieces((currentPieces) =>
          map(currentPieces, (ap) =>
            ap.cacheKey === p.cacheKey ? { ...ap, img: pieceArt } : ap
          )
        );
        // await uploadFile(pieceArt, `piece${p.cacheKey}`);
      } catch (e) {}
    });
    const refetchProfile = async () => {
      const profile = await fetchProfile(name || user.addr);
      setCurrentProfile(profile);
    };
    document.addEventListener("refetch", refetchProfile, false);
    return () => document.removeEventListener("refetch", refetchProfile, false);
  }, [self, name]);
  return (
    <>
      <Head>
        <title>
          {currentProfile.name || currentProfile.address
            ? currentProfile.name
              ? `@${currentProfile.name}`
              : `@${currentProfile.address}`
            : "Profile"}{" "}
          | Versus
        </title>
      </Head>
      <ProfileSummary
        self={self}
        name={name}
        profile={currentProfile}
        user={user}
      />
      <ProfileTabs />
      {loading ? (
        <div className="bg-white">
          <div className="flex flex-col items-center mx-auto pb-36 pt-24 text-center w-60">
            <Loading />{" "}
          </div>
        </div>
      ) : (
        <Collection
          pieces={[...pieces, ...marketPieces]}
          self={self}
          user={user}
          name={name}
        />
      )}
    </>
  );
};

export default ProfileWrapper;
