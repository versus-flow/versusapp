import ArrowButton from "./ArrowButton";

const JoinCommunity = () => {
  return (
    <div className="pb-8 pt-12 px-12 vs-gradient rounded-lg">
      <h2 className="font-black font-inktrap text-4xl w-6/12 mb-8">
        Become a member of this growing community
      </h2>
      <ArrowButton
        text="Join our Discord"
        href="#"
        className="standard-button arrow-button lg-button"
      />
    </div>
  );
};

export default JoinCommunity;
