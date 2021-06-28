import Chevron from "../../../assets/chevron.svg";

const Sorting = () => {
  return (
    <div className="flex items-center justify-between">
      <p>
        <span className="font-bold">1,250</span> art pieces
      </p>
      <div>
        <div className="border flex font-bold justify-between px-6 py-3 rounded-xl w-48 cursor-pointer">
          <span>Sort by</span>
          <Chevron className="w-3" />
        </div>
      </div>
    </div>
  );
};

export default Sorting;
