import React, { useState } from "react";

import ArrowButton from "../general/ArrowButton";
import Twitter from "../../assets/twitter.svg";
import Instagram from "../../assets/instagram.svg";
import Youtube from "../../assets/youtube.svg";
import Discord from "../../assets/discord.svg";
import EditProfile from "../profile/EditProfile";
import { get } from "lodash";

const ProfileSummary = ({ self, drop, name, profile = {} }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const { avatar, followers, following, description } = profile;
  const twitter = get(profile, "links.twitter.url");
  const instagram = get(profile, "links.instagram.url");
  const youtube = get(profile, "links.youtube.url");
  const discord = get(profile, "links.discord.url");
  return (
    <>
      {openEdit && (
        <EditProfile profile={openEdit} close={() => setOpenEdit(false)} />
      )}
      <div className="container my-12">
        <div className="w-1/2">
          <div className="flex items-center">
            {avatar && (
              <div className="bg-white h-20 p-1 rounded-full shadow-lg w-20">
                <img
                  src={avatar}
                  className="h-full object-cover rounded-full w-full"
                />
              </div>
            )}
            {following ? (
              <>
                <div className="ml-8">
                  <p className="text-black-100 text-sm">Following</p>
                  <p className="font-bold text-xl">{following.length || 0}</p>
                </div>
                <div className="ml-8">
                  <p className="text-black-100 text-sm">Followers</p>
                  <p className="font-bold text-xl">{followers.length || 0}</p>
                </div>
              </>
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
        </div>
      </div>
    </>
  );
};

export default ProfileSummary;
