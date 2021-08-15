import Link from "next/link";
import { find, get } from "lodash";

import dropsData from "../../components/general/drops.json";
import testDropsData from "../../components/general/testdrops.json";

const AboutCreator = ({ piece }) => {
  const dropInfo = find(
    process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet" ? dropsData : testDropsData,
    (d) =>
      (d.id == process.env.NEXT_PUBLIC_FLOW_ENV) === "mainnet" ? piece.id : "1"
  );
  return (
    <div className="bg-white py-12">
      <div className="container">
        <h3 className="font-black font-inktrap text-2xl">About the Creator</h3>
        <div className="gap-12 sm:grid grid-cols-12 mt-4">
          <div className="bg-cream-500 col-span-6 md:col-span-4 flex flex-col items-center justify-center px-12 py-12 rounded">
            <div className="bg-white h-20 p-1 rounded-full shadow-lg w-20">
              <img
                src={get(dropInfo, "smallImage")}
                className="h-full object-cover rounded-full w-full"
              />
            </div>
            <h4 className="font-black font-inktrap text-2xl text-center">
              {piece.metadata.artist}
            </h4>
            <p className="font-bold font-inktrap mb-2 text-center">
              @{get(dropInfo, "handle")}
            </p>
            <Link href={`/profile/${piece.metadata.artistAddress}`}>
              <a className="standard-button transparent-button">
                Artist profile
              </a>
            </Link>
          </div>
          <div className="col-span-6 md:col-span-8 text-lg mt-6 sm:mt-0">
            <p>{get(dropInfo, "aboutArtist")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCreator;
