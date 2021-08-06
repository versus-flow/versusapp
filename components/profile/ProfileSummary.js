import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import ArrowButton from "../general/ArrowButton";
import Twitter from "../../assets/twitter.svg";
import Instagram from "../../assets/instagram.svg";
import Youtube from "../../assets/youtube.svg";
import Discord from "../../assets/discord.svg";
import EditProfile from "../profile/EditProfile";
import { find, get, includes } from "lodash";
import { tx } from "../drop/transactions";
import { followUser, unfollowUser } from "./transactions";

const ProfileSummary = ({ self, drop, name, profile = {}, user }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [followText, setFollowText] = useState("");
  const { avatar, followers, following, description, address } = profile;
  const [numFollowers, setNumFollowers] = useState(
    (followers || []).length || 0
  );
  useEffect(() => {
    const followers = get(profile, "followers", []);
    setNumFollowers(followers.length);
    if (profile.address && user && user.addr) {
      const doIFollow = find(followers, (f) => f.follower === user.addr);
      setFollowText(doIFollow ? "Unfollow" : "Follow");
    }
  }, [profile.followers]);
  const twitter = get(profile, "links.twitter.url");
  const instagram = get(profile, "links.instagram.url");
  const youtube = get(profile, "links.youtube.url");
  const discord = get(profile, "links.discord.url");
  const followAction = async () => {
    const currentState = followText;
    if (includes(["Follow", "Unfollow"], currentState)) {
      setFollowText("Following");
      try {
        await tx(
          [
            fcl.transaction(
              currentState === "Follow" ? followUser : unfollowUser
            ),
            fcl.args([fcl.arg(address, t.Address)]),
            fcl.proposer(fcl.currentUser().authorization),
            fcl.payer(fcl.currentUser().authorization),
            fcl.authorizations([fcl.currentUser().authorization]),
            fcl.limit(9999),
          ],
          {
            onStart() {
              setFollowText(
                currentState === "Follow" ? "Following" : "Unfollowing"
              );
            },
            onSubmission() {
              setFollowText(
                currentState === "Follow" ? "Following" : "Unfollowing"
              );
            },
            async onSuccess(status) {
              setFollowText(
                currentState === "Follow" ? "Followed" : "Unfollowed"
              );
              setNumFollowers(
                currentState === "Follow" ? numFollowers + 1 : numFollowers - 1
              );
              setTimeout(
                () =>
                  setFollowText(
                    currentState === "Follow" ? "Unfollow" : "Follow"
                  ),
                3000
              );
            },
            async onError(error) {
              setFollowText("Error");
              setTimeout(
                () =>
                  setFollowText(
                    currentState === "Follow" ? "Unfollow" : "Follow"
                  ),
                3000
              );
              console.log(error);
            },
          }
        );
      } catch (e) {
        console.log(e);
        setFollowText("Error");
        setTimeout(
          () =>
            setFollowText(currentState === "Follow" ? "Unfollow" : "Follow"),
          3000
        );
      }
    }
  };
  return (
    <>
      {openEdit && (
        <EditProfile profile={openEdit} close={() => setOpenEdit(false)} />
      )}
      <div className="container my-12">
        <div className="w-1/2">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="bg-white h-20 p-1 rounded-full shadow-lg w-20 flex justify-center items-center">
              {avatar ? (
                <img
                  src={avatar}
                  className="h-full object-cover rounded-full w-full"
                />
              ) : (
                <span className="font-bold text-4xl text-black-500">
                  {profile.name ? profile.name.substring(0, 1) : "?"}
                </span>
              )}
            </div>
            {following ? (
              <div className="flex sm:items-center mt-4 sm:mt-0">
                <div className="sm:ml-8">
                  <p className="text-black-100 text-sm">Following</p>
                  <p className="font-bold text-xl">{following.length || 0}</p>
                </div>
                <div className="ml-8">
                  <p className="text-black-100 text-sm">Followers</p>
                  <p className="font-bold text-xl">{numFollowers}</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mt-4">
            <h2 className="font-bold font-inktrap text-3xl">
              {self ? "My " : ""}Profile
            </h2>
            <p className="">{profile.name ? `@${profile.name}` : ""}</p>
            <p className="mt-4">{description}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="mt-2">
            {twitter || instagram || youtube || discord ? (
              <>
                <h5 className="text-black-100 text-sm">Social accounts</h5>
                <div className="flex items-center mt-2">
                  {twitter && (
                    <a
                      href={twitter}
                      target="_blank"
                      className="cursor-pointer"
                    >
                      <Twitter className="fill-current mr-4 h-4" />
                    </a>
                  )}
                  {instagram && (
                    <a
                      href={instagram}
                      target="_blank"
                      className="cursor-pointer"
                    >
                      <Instagram className="fill-current mr-4 h-4" />
                    </a>
                  )}
                  {youtube && (
                    <a
                      href={youtube}
                      target="_blank"
                      className="cursor-pointer"
                    >
                      <Youtube className="fill-current mr-4 h-4" />
                    </a>
                  )}
                  {discord && (
                    <a
                      href={discord}
                      target="_blank"
                      className="cursor-pointer"
                    >
                      <Discord className="fill-current h-4" />
                    </a>
                  )}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          {self && (
            <ArrowButton
              text="Edit"
              className="standard-button arrow-button transparent-button"
              onClick={() => setOpenEdit(profile)}
            />
          )}
          {!self && user && user.addr && followText && (
            <ArrowButton
              text={followText}
              className="standard-button arrow-button transparent-button"
              onClick={followAction}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileSummary;
