import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import classNames from "classnames";

import Audio from "./special/Audio";
import Loading from "../general/Loading";
import {
  isARDrop,
  isAudioDrop,
  isSpecialDrop,
  isVideoDrop,
} from "../general/helpers";
import VideoPlayer from "./special/VideoPlayer";
import ARViewer from "./special/ARViewer";

const DropArt = ({ art, drop, full }) => {
  let Special = "";
  if (art && isAudioDrop(drop)) {
    Special = <Audio src={art} />;
  }
  if (art && isVideoDrop(drop)) {
    Special = <VideoPlayer src={art} autoPlay controls />;
  }
  if (art && isARDrop(drop)) {
    Special = <ARViewer src={JSON.parse(art)} />;
  }
  return (
    <div
      className={classNames("mx-auto mb-3 md:mb-0", {
        "h-auto md:h-full full-holder w-full md:w-auto": full,
        "w-3/4 md:w-full": !full,
      })}
    >
      {art ? (
        isSpecialDrop(drop) ? (
          Special
        ) : (
          <Zoom>
            <img
              className={classNames("", {
                "h-full object-cover object-center mx-auto": full,
                "h-auto w-full": !full,
              })}
              src={art}
            />
          </Zoom>
        )
      ) : (
        <div className="w-full h-48 flex justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default DropArt;
