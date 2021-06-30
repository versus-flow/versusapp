import React, { useState, useEffect } from "react";
import moment from "moment";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export const getWrittenTimer = (seconds) => {
  var days = Math.floor(seconds / (3600 * 24));
  var hours = Math.floor((seconds % (3600 * 24)) / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var seconds = Math.floor(seconds % 60);
  if (!days && !hours && !minutes && !seconds) return false;
  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const DropContent = ({ drop, art, timeUntil, timeRemaining }) => {
  const {
    metadata: { artist, name, description },
  } = drop;
  let Counter = <></>;
  if (timeUntil > 0 || timeRemaining > 0) {
    const timer = getWrittenTimer(timeUntil > 0 ? timeUntil : timeRemaining);
    Counter = (
      <div className="border-regGrey border-t mt-16 pt-6 w-full">
        <h4 className="font-inktrap font-semibold tracking-wide">
          {timeUntil > 0 ? "Auction starts in" : "Auction ends in"}
        </h4>
        <div className="gap-6 grid grid-cols-4 mb-6 mt-2 mx-auto w-64">
          {timer.days ? (
            <div className="flex flex-col">
              <span className="block font-black text-3xl">{timer.days}</span>
              <span className="mt-1 text-xs">Days</span>
            </div>
          ) : (
            ""
          )}
          {timer.hours || timer.days ? (
            <div className="flex flex-col">
              <span className="block font-black text-3xl">{timer.hours}</span>
              <span className="mt-1 text-xs">hours</span>
            </div>
          ) : (
            ""
          )}
          {timer.minutes || timer.hours || timer.days ? (
            <div className="flex flex-col">
              <span className="block font-black text-3xl">{timer.minutes}</span>
              <span className="mt-1 text-xs">Minutes</span>
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col">
            <span className="block font-black text-3xl">
              {timer.seconds.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              }) || "00"}
            </span>
            <span className="mt-1 text-xs">Seconds</span>
          </div>
        </div>
      </div>
    );
  } else if (drop.winning === "TIE") {
    Counter = (
      <span>
        Auction is currently Tied.
        <br /> For the auction to end one side has to win!
      </span>
    );
  } else {
    Counter = (
      <>
        This auction has ended
        <p className="text-lg font-normal mt-2">
          {drop.settledAt
            ? "Versus has finalized this auction"
            : "Versus has yet to finalize this auction"}
        </p>
      </>
    );
  }
  return (
    <div className="bg-white">
      <div className="container">
        <div className="pt-16 pb-8 container grid grid-cols-2 gap-16">
          <div className="w-full">
            <Zoom>
              <img className="h-auto w-full" src={art} />
            </Zoom>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-108">
              <h5 className="font-bold font-inktrap text-xl">{artist}</h5>
              <h2 className="font-black font-inktrap text-5xl">{name}</h2>
              <p className="mt-8 mx-auto text-lg w-9/12">{description}</p>
            </div>
            {Counter}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropContent;
