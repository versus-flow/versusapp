import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const DropContent = () => {
  return (
    <div className="bg-white">
      <div className="container">
        <div className="pt-16 pb-8 container grid grid-cols-2 gap-16">
          <div className="w-full">
            <Zoom>
              <img
                className="h-auto w-full"
                src="https://www.versus-flow.art/images/skan.jpeg"
              />
            </Zoom>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-108">
              <h5 className="font-bold font-inktrap text-xl">
                Alessandro Pautoasso
              </h5>
              <h2 className="font-black font-inktrap text-5xl">
                Destroying David
              </h2>
              <p className="mt-8 mx-auto text-lg w-9/12">
                Destroying David is a peculiar guy, depending on the time of the
                day he is angry or very happy, or both at the same time. Not
                many people know.
              </p>
            </div>
            <div className="border-regGrey border-t mt-16 pt-6 w-11/12">
              <h4 className="font-inktrap font-semibold tracking-wide">
                Auction ending in
              </h4>
              <div className="gap-12 grid grid-cols-3 mb-6 mt-2 mx-auto w-64">
                <div className="flex flex-col">
                  <span className="block font-black text-3xl">22</span>
                  <span className="mt-1 text-xs">Hours</span>
                </div>
                <div className="flex flex-col">
                  <span className="block font-black text-3xl">11</span>
                  <span className="mt-1 text-xs">Minutes</span>
                </div>
                <div className="flex flex-col">
                  <span className="block font-black text-3xl">08</span>
                  <span className="mt-1 text-xs">Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropContent;
