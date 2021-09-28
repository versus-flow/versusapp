import Loading from "./Loading";

const StandardLoadWrapper = ({ large, background = "bg-cream-500" }) => {
  return (
    <div className={background}>
      <div
        className={`flex flex-col items-center mx-auto pb-36 pt-24 text-center w-60 ${
          large ? "min-h-screen" : ""
        }`}
      >
        <Loading />
      </div>
    </div>
  );
};

export default StandardLoadWrapper;
