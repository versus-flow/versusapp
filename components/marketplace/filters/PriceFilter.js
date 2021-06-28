import React, { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";

import Chevron from "../../../assets/chevron.svg";

const STEP = 1;
const MIN = 15;
const MAX = 500;

const PriceFilter = (props) => {
  const [open, setOpen] = useState(true);
  const [values, setValues] = React.useState([15, 500]);

  return (
    <div className="flex flex-col mb-4 border border-lightGrey rounded-lg">
      <div className="bg-cream-500 px-6 py-3 flex items-center justify-between rounded-t-lg">
        <h4 className="text-2xl font-bold font-inktrap text-darkGrey">Price</h4>
        <Chevron className="cursor-pointer w-4 h-4" />
      </div>
      <div className="px-12 py-12">
        <div className="flex items-center flex-wrap">
          <Range
            values={values}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={(values) => setValues(values)}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "36px",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values,
                      colors: ["#FAFAFA", "#212121", "#FAFAFA"],
                      min: MIN,
                      max: MAX,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ index, props, isDragged }) => (
              <div {...props} className="bg-black-500 rounded-full h-4 w-4">
                <div className="absolute -top-10 text-sm bg-black-500 text-white font-bold font-sourceSansPro px-2 py-1 rounded-sm transform -translate-x-1/2">
                  F{Math.round(values[index])}
                </div>
                <div
                  style={{
                    height: "16px",
                    width: "5px",
                  }}
                />
              </div>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            className="px-4 py-4 bg-lightGrey"
            value={values[0]}
            onChange={(e) => setValues([e.currentTarget.value, values[1]])}
          />
          <input
            type="number"
            className="px-4 py-4 bg-lightGrey"
            value={values[1]}
            onChange={(e) => setValues([values[0], e.currentTarget.value])}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
