import React, { useState } from "react";
import { get, includes, map } from "lodash";
import Link from "next/link";

import ArrowButton from "../general/ArrowButton";
import DropPreview from "../marketplace/DropPreview";
import ListItem from "../marketplace/ListItem";
import CollectionOnboard from "./CollectionOnboard";
import SendItem from "../marketplace/SendItem";

const Collection = ({ pieces, other, self, user, name }) => {
  const [listItem, setListItem] = useState(false);
  const [sendItem, setSendItem] = useState(false);
  const isMarketPlace = (p) => get(p, "art.name");
  return (
    <>
      {listItem && (
        <ListItem piece={listItem} close={() => setListItem(false)} />
      )}
      {sendItem && (
        <SendItem piece={sendItem} close={() => setSendItem(false)} />
      )}
      <div className="bg-white py-12">
        <div className="container">
          {pieces.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 lg:gap-x-16 lg:gap-y-8">
              {map(pieces, (p) => (
                <DropPreview
                  key={p.id}
                  id={p.id}
                  title={p.metadata.name}
                  artist={p.metadata.artist}
                  edition={`#${p.metadata.edition}/${p.metadata.maxEdition}`}
                  shadow
                  zoom
                  img={p.img}
                  price={p.price ? parseFloat(p.price).toFixed(1) : false}
                  showMoveNoti={
                    self &&
                    includes(["Bryan Brinkman", "MiraRuido"], p.metadata.name)
                  }
                  button={
                    self ? (
                      isMarketPlace(p) ? (
                        <div className="flex items-center">
                          <ArrowButton
                            text="View on market"
                            className="transparent-button"
                            href={`/listing/${p.id}`}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <ArrowButton
                            text="List your item"
                            className="transparent-button"
                            onClick={() => setListItem(p)}
                          />
                          <Link href={`/piece/${user.addr}/${p.id}`}>
                            <a className="ml-4 font-bold underline cursor-pointer text-sm">
                              View
                            </a>
                          </Link>
                          <span
                            onClick={() => setSendItem(p)}
                            className="ml-4 font-bold underline cursor-pointer text-sm"
                          >
                            Send
                          </span>
                        </div>
                      )
                    ) : isMarketPlace(p) ? (
                      <ArrowButton
                        text="View on market"
                        className="transparent-button"
                        href={`/listing/${p.id}`}
                      />
                    ) : (
                      <ArrowButton
                        text="View on market"
                        className="transparent-button"
                        href={`/piece/${user.addr || name}/${p.id}`}
                      />
                    )
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center mx-auto pb-36 pt-24 text-center w-60">
              {other ? (
                <>
                  <h2 className="font-black font-inktrap leading-6 text-2xl">
                    This user does not own any art
                  </h2>
                  <p className="mb-3 mt-3">
                    When they have bought or won a bid their item will show up
                    here
                  </p>
                </>
              ) : (
                <>
                  {self && <CollectionOnboard user={user} />}
                  <h2 className="font-black font-inktrap leading-6 text-2xl">
                    {self ? "Your" : "This user's"} collection will be shown
                    here
                  </h2>
                  <p className="mb-3 mt-3">
                    {self
                      ? "When you have bought or won a bid your item will show up here"
                      : "When they have bought or won a bid their item will show up here"}
                  </p>
                </>
              )}
              {/* <ArrowButton text="Visit marketplace" className="lg-button" /> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Collection;
