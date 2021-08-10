import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { first, get } from "lodash";

import { getGraffleUrl } from "../general/helpers";

const DropPreview = ({
  shadow,
  zoom,
  img,
  title,
  artist,
  edition,
  button,
  price,
  id,
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
  return (
    <div
      className={classNames("bg-white p-3 rounded", {
        "shadow-2xl": shadow,
      })}
    >
      <div className="h-80 w-full zoom-holder">
        {zoom ? (
          <Zoom>
            <img className="h-full object-cover w-full rounded" src={img} />
          </Zoom>
        ) : (
          <img className="h-full object-cover w-full rounded" src={img} />
        )}
      </div>
      <div className="py-3 px-2 relative">
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
    </div>
  );
};

export default DropPreview;
