import ReactAudioPlayer from "react-audio-player";

const Audio = ({ src }) => {
  return (
    <div>
      <ReactAudioPlayer src={`https://ipfs.io/ipfs/${src}`} controls />
    </div>
  );
};

export default Audio;
