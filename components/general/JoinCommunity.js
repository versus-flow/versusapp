import ArrowButton from "./ArrowButton";

const JoinCommunity = () => {
  return (
    <div className="pb-8 pt-12 px-6 sm:px-12 vs-gradient rounded-lg">
      <h2 className="font-black font-inktrap text-3xl sm:text-4xl sm:w-6/12 mb-8">
        Become a member of this growing community
      </h2>
      <ArrowButton
        text="Join our Discord"
        href="https://discord.gg/aRjPpU9A8t"
        className="standard-button arrow-button lg-button"
      />
    </div>
  );
};

export default JoinCommunity;
