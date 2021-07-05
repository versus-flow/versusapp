import React, { useState } from "react";

import ArrowButton from "../general/ArrowButton";
import Twitter from "../../assets/twitter.svg";
import Instagram from "../../assets/instagram.svg";
import EditProfile from "../profile/EditProfile";

const DropArtist = ({ drop, dropInfo }) => {
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <>
      {/* {true && <EditProfile close={() => setOpenEdit(false)} />} */}
      <div className="container my-12">
        <div className="sm:w-1/2">
          <div className="flex items-center">
            <div className="bg-white h-20 p-1 rounded-full shadow-lg w-20">
              <img
                src={dropInfo.smallImage}
                className="h-full object-cover rounded-full w-full"
              />
            </div>
            {/* <div className="ml-4">
              <p className="text-black-100 text-sm">Following</p>
              <p className="font-bold text-xl">24</p>
            </div>
            <div className="ml-8">
              <p className="text-black-100 text-sm">Followers</p>
              <p className="font-bold text-xl">11</p>
            </div> */}
          </div>
          <div className="mt-4">
            <h2 className="font-bold font-inktrap text-3xl">
              {drop.metadata.artist}
            </h2>
            <p className="">@{dropInfo.handle}</p>
            <p className="mt-4">{dropInfo.aboutArtist}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="mt-2">
            <h5 className="text-black-100 text-sm">Social accounts</h5>
            <div className="flex items-center mt-2">
              <a
                href={dropInfo.twitter}
                target="_blank"
                className="cursor-pointer"
              >
                <Twitter className="fill-current mr-4 h-4" />
              </a>
              <a
                href={dropInfo.instagram}
                target="_blank"
                className="cursor-pointer"
              >
                <Instagram className="fill-current h-4" />
              </a>
            </div>
          </div>
          {/* <ArrowButton
            text="Follow"
            className="standard-button arrow-button transparent-button"
          /> */}
        </div>
      </div>
    </>
  );
};

export default DropArtist;
