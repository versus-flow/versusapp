import ReactAudioPlayer from "react-audio-player";

const Audio = ({ src }) => {
  return (
    <div>
      <ReactAudioPlayer src={`https://gateway.pinata.cloud/${src}`} controls />
    </div>
  );
};

export default Audio;
