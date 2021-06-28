import UniqueBidBox from "./UniqueBidBox";
import Logo from "../../assets/vslogo.svg";
import EditionBidBox from "./EditionBidBox";

const DropBids = () => {
  return (
    <div className="bg-white pb-24">
      <div className="container">
        <div className="container mx-auto md:mx-0 md:max-w-none md:grid grid-cols-10 items-stretch pt-12 pb-3">
          <div className="col-span-4">
            <UniqueBidBox />
          </div>
          <div className="py-8 md:py-0 col-span-2 h-full flex items-center justify-center">
            <Logo />
          </div>
          <div className="col-span-4 mt-6 sm:mt-0">
            <EditionBidBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropBids;
