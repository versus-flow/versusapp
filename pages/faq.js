import { map } from "lodash";

import SEOBoilerplate from "../components/general/SEOBoilerplate";
import Main from "../components/layouts/Main";

const items = [
  {
    question: "What is Versus?",
    answer: (
      <p>
        Versus is a curated digital auction house and art marketplace. All art
        on Versus is tokenized as an NFT on the Flow Blockchain.
        <br />
        <br />
        Originally, Versus will have one drop/auction each week, with the goal
        to increase the frequency of drops in the future to accommodate any
        increases in demand.
      </p>
    ),
  },
  {
    question: "What is an NFT?",
    answer: (
      <p>
        An NFT (or non-fungible token) is a unique tokenized collectable on the
        blockchain.
        <br />
        <br />
        The blockchain allows for verifiable scarcity, easy provenance, and
        users to control their own assets.
      </p>
    ),
  },
  {
    question: "What makes a Versus NFT valuable?",
    answer: (
      <p>
        Our NFTs are future oriented and decentralized. All the data related to
        each NFT (image, art name, artist’s name, and edition number) is stored
        directly on the Flow Blockchain.
        <br />
        <br />
        Versus will be the first art maketplace to store high quality, full
        resolution static artworks on chain.
        <br />
        <br />
        This means that buyers can be comfortable knowing that their NFT is not
        reliant on any centralized company or service. There is no image or data
        hosting that could lead to dead NFTs if anything ever happens to Versus.
        <br />
        <br />
        Buyers have complete control over their art.
      </p>
    ),
  },
  {
    question: "How can I buy art on Versus?    ",
    answer: (
      <p>
        Purchases on Versus will be made using the native token of the Flow
        Blockchain, Flow, through the Blocto wallet. We will also accommodate
        other wallets in the future.
        <br />
        <br />
        We are aware that Flow is not yet available in some jurisdictions,
        notably the US and Canada, but we are confidient that Flow will be made
        available to all in the near future.
      </p>
    ),
  },
  {
    question: "How does a Versus auction work?",
    answer: (
      <p>
        Versus auctions are not your average english auctions.
        <br />
        <br />
        Biders will have the ability to place bids on exclusive (1/1) artworks
        or edition artworks (1/10-25+). Whichever auction will generate more
        revenue for the artist (exclusive or editions) wins the auction, and the
        respective number of NFTs are then minted.
        <br />
        <br />
        In summary, there will be three separate types of english auctions
        ongoing during a Versus drop. There is the simple engilsh auction for
        the 1/1 piece, an engilsh auction for each /10-25+ piece, and the
        auction that tallies the sum of all bids for both sides and determines
        which side will win.
        <br />
        <br />
        This unique auction system of “exclusive” versus “edition” is meant to
        allow those looking to spend less to still be able to participate in an
        exhilarating auction for a high quality NFT artwork. It will also allow
        for thorough price discovery and democratization of the auction process.
        <br />
        <br />
        If a bid is placed in the last 5 minutes of an auction the time
        remaining in the auction resets to 5 minutes.
      </p>
    ),
  },
  {
    question: "How can I sell art I bought from a Versus drop?",
    answer: (
      <p>
        Versus has a native secondary marketplace! This means you won’t have to
        leave our site to either sell or buy NFTs from past auctions.
        <br />
        <br />
        Our marketplace can be found at{" "}
        <a
          href="https://www.versus.auction/marketplace/"
          target="_blank"
          className="underline"
        >
          https://www.versus.auction/marketplace/
        </a>
      </p>
    ),
  },
  {
    question: "How can I join Versus as an artist?",
    answer: (
      <p>
        Versus is a curated art marketplace.
        <br />
        <br />
        In order to be accepted into Versus you have to fill out our application
        form:
        <br />
        <br />
        <a
          href="https://capturinginsights.typeform.com/to/kf9JZtdY?typeform"
          target="_blank"
          className="underline"
        >
          https://capturinginsights.typeform.com/to/kf9JZtdY?typeform
        </a>
      </p>
    ),
  },
];

const FAQ = () => {
  return (
    <Main seo={<SEOBoilerplate title="FAQ - Versus" url="faq" />}>
      {() => (
        <div className="pt-12 pb-24 bg-white">
          <div className="container">
            <h1 className="text-4xl font-bold font-lato mt-4 mb-1">FAQ</h1>
            <div className="mt-8 text-lg">
              {map(items, (i, index) => (
                <div key={`faq-${index}`} className="mb-12">
                  <h3 className="text-2xl font-bold">{i.question}</h3>
                  <div className="text-lg mt-6">{i.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Main>
  );
};

export default FAQ;
