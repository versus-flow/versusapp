import Link from "next/link";
import { map } from "lodash";

import Arrow from "../../assets/arrow.svg";
import JoinCommunity from "../general/JoinCommunity";

const features = [
  {
    image: "/icons/group.png",
    title: "Competitive Auctions",
    desc: "Our unique auction system allows for the artist to receive fair value for their work, while also remaining accessible to a wide variety of collectors.",
    link: "#",
  },
  {
    image: "/icons/palette.png",
    title: "Curated Artists",
    desc: "We spend a lot of time getting to know our artists before their drops. We think very highly of them and know our collectors will too.",
    link: "#",
  },
  {
    image: "/icons/arrow.png",
    title: "Uses Flow Blockchain",
    desc: "The blockchain allows for collectors to have true ownership over their digital assets. When compared to other chains Flow has much lower fees.",
    link: "#",
  },
  {
    image: "/icons/menu.png",
    title: "Onchain Art",
    desc: "All Versus NFTs are stored entirely on the Flow blockchain. Each and every artist can be proud of the fact that their art will live forever onchain.",
    link: "#",
  },
];

const Feature = ({ feature }) => {
  const { image, title, desc, link } = feature;
  return (
    <div className="flex flex-col justify-between">
      <div className="mb-6">
        <img src={image} />
        <h3 className="font-bold font-inktrap mb-3 mt-4 text-2xl w-7/12">
          {title}
        </h3>
        <p>{desc}</p>
      </div>
      <Link href={link}>
        <a className="flex font-bold font-roboto items-center tracking-wide">
          Know more
          <Arrow className="ml-2" />
        </a>
      </Link>
    </div>
  );
};

const BetterForArt = () => {
  return (
    <div className="pt-24 pb-12">
      <div className="container">
        <h2 className="font-bold font-inktrap text-5xl">Better for art</h2>
        <div className="gap-16 grid grid-cols-4 mt-12">
          {map(features, (f) => (
            <Feature key={f.image} feature={f} />
          ))}
        </div>
        <div className="mt-16">
          <JoinCommunity />
        </div>
      </div>
    </div>
  );
};

export default BetterForArt;
