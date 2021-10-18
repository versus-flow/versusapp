import { isAudioDrop, isVideoDrop } from "../../general/helpers";
import Audio from "./Audio";
import VideoPlayer from "./VideoPlayer";

const ArtPreview = ({ drop, art }) => {
  let Preview = "";
  if (art && isAudioDrop(drop)) {
    Preview = (
      <div className="h-36">
        <Audio src={art} />
      </div>
    );
  } else if (art && isVideoDrop(drop)) {
    Preview = (
      <div className="h-36 mt-3">
        <VideoPlayer
          src={art}
          autoPlay
          className="max-h-full max-w-full sm:max-w-xs"
          muted
        />
      </div>
    );
  } else Preview = <img className="h-auto mt-6 w-64" src={art} />;
  return Preview;
};

export default ArtPreview;
