import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import Audio from "./special/Audio";
import Loading from "../general/Loading";
import { isAudioDrop, isSpecialDrop } from "../general/helpers";

const DropArt = ({ art, drop }) => {
  let Special = "";
  if (art && isAudioDrop(drop)) {
    Special = <Audio src={art} />;
  }
  return (
    <div className="w-3/4 mx-auto mb-3 md:mb-0 md:w-full">
      {art ? (
        isSpecialDrop(drop) ? (
          Special
        ) : (
          <Zoom>
            <img className="h-auto w-full" src={art} />
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
