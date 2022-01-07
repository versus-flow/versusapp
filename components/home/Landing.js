import { useEffect, useState } from "react";

import ArrowButton from "../general/ArrowButton";
import TopTri from "../../assets/toptri.svg";
import moment from "moment";
import { getWrittenTimer } from "../drop/DropContent";
import classNames from "classnames";
import { getDropThumbnail, getImgThumbnail } from "../general/helpers";

const Landing = ({ drop }) => {
  const [dropImage, setDropImage] = useState(null);
  useEffect(async () => {
    setDropImage(getImgThumbnail(`maindr${drop.dropId}`));
  }, [drop.dropId]);
  const [timeRemaining, settimeRemaining] = useState(
    parseInt(drop.startTime, 10) - moment().unix()
  );
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        settimeRemaining((t) => t - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, []);
  const timer = timeRemaining > 0 ? getWrittenTimer(timeRemaining) : false;
  const start = moment.unix(parseInt(drop.startTime, 10));
  return (
    <>
      {/* <TopTri /> */}
      <div className="fd-section bg-cream-500 z-10 relative sm:py-6">
        <div className="container flex flex-col-reverse sm:gap-16 grid-cols-2 hero-height items-center relative sm:grid z-10">
          <div className="h-full flex flex-col justify-center sm:items-start sm:py-0 text-center sm:text-left">
            <h3 className="-backdrop-hue-rotate-15 font-inktrap text-xl">
              {drop.metadata.artist}
            </h3>
            <h2 className="2xl:text-8xl font-bold font-inktrap leading-loose lg:text-7xl relative sm:-left-1 sm:text-5xl text-3xl">
              {drop.metadata.name}
            </h2>
            <div className="mt-4 sm:mt-8">
              <h4 className="font-inktrap font-semibold tracking-wide">
                {timer
                  ? `The auction starts ${start.format("MMMM")} ${start.format(
                      "Do"
                    )} at ${start.utcOffset(-5).format("hA")} EST`
                  : moment().unix() - parseInt(drop.endTime, 10) < 0
                  ? "Auction now open!"
                  : "Auction finished!"}
              </h4>
              {timer && (
                <div
                  className={classNames(
                    "grid mb-6 mt-2 w-64 max-w-full mx-auto sm:mx-0",
                    {
                      "grid-cols-4": timer.days && timer.days > 0,
                      "grid-cols-3": !timer.days && timer.hours,
                      "grid-cols-2":
                        !timer.days && !timer.hours && timer.minutes,
                      "grid-cols-1":
                        !timer.days && !timer.hours && !timer.minutes,
                    }
                  )}
                >
                  {timer.days ? (
                    <div className="flex flex-col">
                      <span className="block font-black text-3xl">
                        {timer.days}
                      </span>
                      <span className="mt-1 text-xs">Days</span>
                    </div>
                  ) : (
                    ""
                  )}
                  {timer.hours || timer.days ? (
                    <div className="flex flex-col">
                      <span className="block font-black text-3xl">
                        {timer.hours}
                      </span>
                      <span className="mt-1 text-xs">Hours</span>
                    </div>
                  ) : (
                    ""
                  )}
                  {timer.minutes || timer.hours || timer.days ? (
                    <div className="flex flex-col">
                      <span className="block font-black text-3xl">
                        {timer.minutes}
                      </span>
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
              )}
            </div>
            <ArrowButton
              href={`/drop/${drop.dropId}`}
              text="View Drop"
              className="mx-auto sm:mx-0 mt-2"
            />
          </div>
          <div className="mt-6 mb-6 sm:mb-0 sm:h-full sm:mt-0 w-full max-h-112">
            <img
              src={dropImage}
              className="h-full max-h-112 sm:h-full sm:object-contain w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
