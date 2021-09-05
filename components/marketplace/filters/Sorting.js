import Chevron from "../../../assets/chevron.svg";
import commaNumber from "comma-number";

const Sorting = ({ numResults, setSortBy }) => {
  return (
    <div className="flex items-center justify-between">
      <p>
        <span className="font-bold">{commaNumber(numResults)}</span> art piece
        {numResults === 1 ? "" : "s"}
      </p>
      <div>
        <div className="border flex font-bold justify-between p-1 rounded-xl w-36 sm:w-48 cursor-pointer relative">
          <Chevron className="w-3 absolute top-1/2 right-6 transform -translate-y-1/2" />
          <select
            className="px-5 py-1 sm:py-2 w-full hide-select cursor-pointer relative bg-transparent"
            onChange={(e) => setSortBy(e.currentTarget.value)}
          >
            <option value="">Sort by</option>
            <option value="pricelth">Price Low to High</option>
            <option value="pricehtl">Price High to Low</option>
            <option value="atoz">A to Z</option>
            <option value="ztoa">Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sorting;
