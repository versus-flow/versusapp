import ReactPlayer from "react-player";
import { getVidThumbnail } from "../../general/helpers";

const VideoPlayer = ({
  src,
  className = "",
  autoPlay = false,
  controls = false,
  muted = false,
}) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <video
        src={getVidThumbnail(src)}
        // src={`https://gateway.pinata.cloud/ipfs/${src}`}
        className={className}
        autoPlay={autoPlay}
        loop={true}
        controls={controls}
        muted={muted}
      />
    </div>
  );
};

export default VideoPlayer;
