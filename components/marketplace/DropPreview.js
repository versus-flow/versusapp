import classNames from "classnames";
import React from "react";

import ArrowButton from "../general/ArrowButton";

const DropPreview = ({ shadow }) => {
  return (
    <div
      className={classNames("bg-white p-3 rounded", {
        "shadow-2xl": shadow,
      })}
    >
      <div className="h-80 w-full">
        <img
          className="h-full object-cover w-full rounded"
          src="https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
        />
      </div>
      <div className="py-3 px-2">
        <h3 className="font-bold font-inktrap">Title of the Art</h3>
        <div className="flex justify-between mb-2 mt-2">
          <div className="flex flex-col text-black-100 text-sm">
            <span className="">Artist Name</span>
            <span>#000/000</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="font-bold text-xl">F150</span>
            <span className="text-sm">
              Last sold <span className="font-bold">F150</span>
            </span>
          </div>
        </div>
        <ArrowButton className="small-button" text="Buy" />
      </div>
    </div>
  );
};

export default DropPreview;
