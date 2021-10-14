import classNames from "classnames";

import { getWrittenTimer } from "./DropContent";

const DropCounter = ({ drop, timeUntil, timeRemaining }) => {
  const {
    metadata: { artist, name, description },
  } = drop;
  let Counter = <></>;
  if (timeUntil > 0 || timeRemaining > 0) {
    const timer = getWrittenTimer(timeUntil > 0 ? timeUntil : timeRemaining);
    Counter = (
      <div className="border-regGrey border-t mt-4 md:mt-16 pt-6 w-full">
        <h4 className="font-inktrap font-semibold tracking-wide">
          {timeUntil > 0 ? "Auction starts in" : "Auction ends in"}
        </h4>
        <div
          className={classNames("gap-6 grid mb-6 mt-2 mx-auto w-64", {
            "grid-cols-4": timer.days,
            "grid-cols-3": !timer.days && timer.hours,
            "grid-cols-2": !timer.days && !timer.hours && timer.minutes,
            "grid-cols-1": !timer.days && !timer.hours && !timer.minutes,
          })}
        >
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
    <div className="flex flex-col items-center justify-center text-center">
      <div className="w-108 max-w-full">
        <h5 className="font-bold font-inktrap text-lg sm:text-xl">{artist}</h5>
        <h2 className="font-black font-inktrap text-3xl sm:text-5xl">{name}</h2>
        <p className="mt-8 mx-auto text-lg w-11/12 whitespace-pre-line">
          {description}
        </p>
      </div>
      {Counter}
    </div>
  );
};

export default DropCounter;
