import Facebook from "../../assets/facebook.svg";
import Twitter from "../../assets/twitter.svg";
import Instagram from "../../assets/instagram.svg";
import Youtube from "../../assets/youtube.svg";

const DropFollow = ({ dropInfo }) => {
  return (
    <div className="bg-white py-16">
      <div className="container">
        <div className="py-8 sm:py-16 px-6 sm:px-12 vs-gradient rounded-lg">
          <h2 className="font-black font-inktrap mb-6 text-4xl">
            Follow artist
          </h2>
          <div className="flex items-center">
            {/* <a target="_blank" href="#">
              <Facebook className="mr-6 h-6" />
            </a> */}
            <a target="_blank" href={dropInfo.twitter}>
              <Twitter className="mr-6 h-5" />
            </a>
            <a target="_blank" href={dropInfo.instagram}>
              <Instagram className="mr-6 h-6" />
            </a>
            {/* <a target="_blank" href="#">
              <Youtube className="mr-6 h-6" />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropFollow;
