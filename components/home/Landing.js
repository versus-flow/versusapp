import ArrowButton from "../general/ArrowButton";
import TopTri from "../../assets/toptri.svg";

const Landing = () => {
  return (
    <>
      {/* <TopTri /> */}
      <div className="fd-section bg-cream-500 z-10 relative">
        <div className="container flex flex-col-reverse gap-16 grid-cols-2 hero-height items-center relative sm:grid z-10">
          <div className="h-full flex flex-col justify-center sm:items-start sm:py-0 text-center sm:text-left">
            <h3 className="-backdrop-hue-rotate-15 font-inktrap text-lg">
              Ben Mauro
            </h3>
            <h2 className="2xl:text-8xl font-bold font-inktrap leading-loose lg:text-7xl relative sm:-left-1 sm:text-5xl text-3xl">
              Mech Auctions
            </h2>
            <div className="mt-8">
              <h4 className="font-inktrap font-semibold tracking-wide">
                Auctions July 6th-8th
              </h4>
              {/* <div className="grid grid-cols-4 mb-6 mt-2 w-64">
                <div className="flex flex-col">
                  <span className="block font-bold text-3xl">1</span>
                  <span className="mt-1 text-xs">Days</span>
                </div>
                <div className="flex flex-col">
                  <span className="block font-bold text-3xl">22</span>
                  <span className="mt-1 text-xs">Hours</span>
                </div>
                <div className="flex flex-col">
                  <span className="block font-bold text-3xl">11</span>
                  <span className="mt-1 text-xs">Minutes</span>
                </div>
                <div className="flex flex-col">
                  <span className="block font-bold text-3xl">08</span>
                  <span className="mt-1 text-xs">Seconds</span>
                </div>
              </div> */}
            </div>
            <ArrowButton text="Coming soon" className="mx-auto sm:mx-0 mt-2" />
          </div>
          <div className="mt-6 sm:h-5/6 sm:mt-0 w-full">
            <img
              src="/images/mauro.jpg"
              className="w-full sm:h-full sm:object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
