import React, { useState } from "react";

import ArrowButton from "../general/ArrowButton";
import Twitter from "../../assets/twitter.svg";
import Instagram from "../../assets/instagram.svg";
import EditProfile from "../profile/EditProfile";

const DropArtist = ({ drop }) => {
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <>
      {/* {true && <EditProfile close={() => setOpenEdit(false)} />} */}
      <div className="container my-12">
        <div className="sm:w-1/2">
          <div className="flex items-center">
            <div className="bg-white h-20 p-1 rounded-full shadow-lg w-20">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                className="h-full object-cover rounded-full w-full"
              />
            </div>
            <div className="ml-4">
              <p className="text-black-100 text-sm">Following</p>
              <p className="font-bold text-xl">24</p>
            </div>
            <div className="ml-8">
              <p className="text-black-100 text-sm">Followers</p>
              <p className="font-bold text-xl">11</p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="font-bold font-inktrap text-3xl">
              Alessandro Pautoasso
            </h2>
            <p className="">@kanea99</p>
            <p className="mt-4">
              Alessandro Pautasso is a digital artist living in California
              inspired by futurism, innovation and how current events will be
              judged by future.
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="mt-2">
            <h5 className="text-black-100 text-sm">Social accounts</h5>
            <div className="flex items-center mt-2">
              <a
                href="https://twitter.com/FlowVersus"
                target="_blank"
                className="cursor-pointer"
              >
                <Twitter className="fill-current mr-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/flowversus/"
                target="_blank"
                className="cursor-pointer"
              >
                <Instagram className="fill-current h-4" />
              </a>
            </div>
          </div>
          <ArrowButton
            text="Follow"
            className="standard-button arrow-button transparent-button"
          />
        </div>
      </div>
    </>
  );
};

export default DropArtist;
