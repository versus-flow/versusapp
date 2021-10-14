import ReactPlayer from "react-player";

const VideoPlayer = ({
  src,
  className = "",
  autoPlay = false,
  controls = false,
}) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <video
        src={`https://gateway.pinata.cloud/ipfs/${src}`}
        className={className}
        autoPlay={autoPlay}
        controls={controls}
      />
    </div>
  );
};

export default VideoPlayer;
