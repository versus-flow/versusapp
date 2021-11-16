import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { first, get } from "lodash";
import moment from "moment";

import { getGraffleUrl, getVidThumbnail } from "../general/helpers";
import Loading from "../general/Loading";
import MoveDropNoti from "./MoveDropNoti";

const DropPreview = ({
  shadow,
  zoom,
  src,
  title,
  artist,
  edition,
  button,
  price,
  id,
  showMoveNoti,
  isEdition,
  isUnique,
  dropped,
  video,
}) => {
  const [lastSold, setLastSold] = useState(false);
  useEffect(async () => {
    if (id) {
      let sold = first(
        await (
          await fetch(
            getGraffleUrl(
              `?eventType=A.CONTRACT.Marketplace.TokenPurchased&id=${id}`
            )
          )
        ).json()
      );
      if (get(sold, "blockEventData.price"))
        setLastSold(sold.blockEventData.price);
    }
  }, [id]);
  let Media = "";
  if (video)
    Media = (
      <video
        src={getVidThumbnail(`${src}v`)}
        className="h-full object-cover w-full rounded"
        controls
        poster={src}
      />
    );
  else Media = <img className="h-full object-cover w-full rounded" src={src} />;
  return (
    <div
      className={classNames("bg-white p-3 rounded relative", {
        "shadow-2xl": shadow,
      })}
    >
      <div className="h-80 w-full zoom-holder bg-lightGrey flex justify-center items-center">
        {src ? zoom && !video ? <Zoom>{Media}</Zoom> : Media : <Loading />}
      </div>
      <div className="py-3 px-2 relative">
        {showMoveNoti && <MoveDropNoti />}
        <h3 className="font-bold font-inktrap">{title}</h3>
        <div
          className={classNames("flex justify-between mt-2", {
            "mb-2": !!button,
          })}
        >
          <div className="flex flex-col text-black-100 text-sm">
            <span className="">{artist}</span>
            <span>{edition}</span>
          </div>
          <div className="flex flex-col text-right">
            {isEdition && (
              <span className="text-xs absolute -mt-4 right-2 text-mediumGrey">
                Editions sold for:
              </span>
            )}
            {isUnique && (
              <span className="text-xs absolute -mt-4 right-2 text-mediumGrey">
                Unique sold for:
              </span>
            )}
            {price && <span className="font-bold text-xl">F{price}</span>}
            <span
              className={"text-sm bottom-0 absolute flex right-0 text-right"}
            >
              {lastSold ? (
                <>
                  Last sold <span className="font-bold ml-1">F{lastSold}</span>
                </>
              ) : (
                <span className="opacity-0">-</span>
              )}
            </span>
          </div>
        </div>
        {button}
      </div>
      {dropped && (
        <div className="absolute flex justify-center left-0 top-full w-full">
          <span className="py-1 sm:py-2 rounded-b text-center text-xs sm:text-sm vs-gradient w-3/4">
            <span className="font-bold">Dropped:</span>{" "}
            {moment.unix(parseInt(dropped, 10)).format("MMMM D, YYYY")}
          </span>
        </div>
      )}
    </div>
  );
};

export default DropPreview;
