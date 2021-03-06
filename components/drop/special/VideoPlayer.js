import ReactPlayer from "react-player";
import {
  getCacheThumbnail,
  getImgThumbnail,
  getVidThumbnail,
} from "../../general/helpers";

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
        className={`${className} max-h-134`}
        autoPlay={autoPlay}
        loop={true}
        controls={controls}
        muted={muted}
        playsInline
        tabIndex="0"
        preload="auto"
        poster={getImgThumbnail(src.slice(0, -1))}
      >
        <source src={getVidThumbnail(src)} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
