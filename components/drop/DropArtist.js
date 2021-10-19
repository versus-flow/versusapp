import React from "react";
import { get } from "lodash";

import Twitter from "../../assets/twitter.svg";
import Instagram from "../../assets/instagram.svg";
import classNames from "classnames";

const DropArtist = ({ drop, dropInfo = {}, dutch }) => {
  return (
    <>
      <div className="container my-12">
        <div
          className={classNames("flex justify-between", {
            "flex-col-reverse md:flex-row": dutch,
          })}
        >
          <div>
            <div
              className={classNames("sm:w-1/2", {
                "sm:w-3/4 text-center md:text-left w-full mx-auto md:mx-0":
                  dutch,
              })}
            >
              {!dutch && (
                <div className="flex items-center">
                  <div className="bg-white h-20 p-1 rounded-full shadow-lg w-20">
                    <img
                      src={get(dropInfo, "smallImage")}
                      className="h-full object-cover rounded-full w-full"
                    />
                  </div>
                </div>
              )}
              <div className="mt-4">
                <h2 className="font-bold font-inktrap text-3xl">
                  {drop.metadata.artist}
                </h2>
                <p className="">@{dropInfo.handle}</p>
                <p className="mt-4">{dropInfo.aboutArtist}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div
                className={classNames("mt-2", {
                  "mx-auto md:mx-0": dutch,
                })}
              >
                <h5 className="text-black-100 text-sm">Social accounts</h5>
                <div
                  className={classNames("flex items-center mt-2", {
                    "justify-center md:justify-start": dutch,
                  })}
                >
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
            </div>
          </div>
          {dropInfo.brandImage && (
            <div className="w-full max-h-48 h-36 md:h-auto md:block">
              <img
                src={dropInfo.brandImage}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DropArtist;
