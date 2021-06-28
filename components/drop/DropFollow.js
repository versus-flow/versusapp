import Facebook from "../../assets/facebook.svg";
import Twitter from "../../assets/twitter.svg";
import Instagram from "../../assets/instagram.svg";
import Youtube from "../../assets/youtube.svg";

const DropFollow = () => {
  return (
    <div className="bg-white py-16">
      <div class="container">
        <div class="py-16 px-12 vs-gradient rounded-lg">
          <h2 class="font-black font-inktrap mb-6 text-4xl">Follow artist</h2>
          <div className="flex items-center">
            <a target="_blank" href="#">
              <Facebook class="mr-6 h-6" />
            </a>
            <a target="_blank" href="#">
              <Twitter class="mr-6 h-5" />
            </a>
            <a target="_blank" href="#">
              <Instagram class="mr-6 h-6" />
            </a>
            <a target="_blank" href="#">
              <Youtube class="mr-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropFollow;
