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
        className={className}
        autoPlay={autoPlay}
        loop={true}
        controls={controls}
        muted={muted}
        playsInline
        tabIndex="0"
        className="max-h-134"
        preload="auto"
      >
        <source src={getVidThumbnail(src)} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
