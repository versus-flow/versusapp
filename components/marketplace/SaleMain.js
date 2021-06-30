import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const SaleMain = () => {
  return (
    <div className="container my-12">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="text-regGrey">Edition 1 of 10</p>
          <h1 className="font-black font-inktrap text-5xl">Destroying David</h1>
          <p className="mt-12 w-9/12">
            Destroying David is a peculiar guy, depending on the time of the day
            he is angry or very happy, or both at the same time. Not many people
            know.
          </p>
          <p className="font-black font-inktrap mt-8 text-5xl">F200</p>
          <div className="flex items-center mt-6">
            <div className="small-button standard-button">Buy</div>
            <div className="ml-6 standard-button transparent-button">
              Make Offer
            </div>
          </div>
          <div className="flex items-center mt-8">
            <div className="flex items-center mr-6">
              <div className="bg-white h-12 mr-3 p-1 rounded-full shadow-lg w-12">
                <img
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                  className="h-full object-cover rounded-full w-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-regGrey text-sm">Arist</span>
                <span className="font-bold">@kaneda99</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-white h-12 mr-3 p-1 rounded-full shadow-lg w-12">
                <img
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                  className="h-full object-cover rounded-full w-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-regGrey text-sm">Arist</span>
                <span className="font-bold">@kaneda99</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Zoom>
            <img
              src="https://www.versus-flow.art/images/skan.jpeg"
              className="w-full sm:h-full sm:object-contain"
            />
          </Zoom>
        </div>
      </div>
    </div>
  );
};

export default SaleMain;
