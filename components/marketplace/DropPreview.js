import classNames from "classnames";
import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const DropPreview = ({
  shadow,
  zoom,
  img,
  title,
  artist,
  edition,
  button,
  price,
  lastSold,
}) => {
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
      <div className="py-3 px-2">
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
            {lastSold && (
              <span className="text-sm">
                Last sold <span className="font-bold">F{lastSold}</span>
              </span>
            )}
          </div>
        </div>
        {button}
      </div>
    </div>
  );
};

export default DropPreview;
