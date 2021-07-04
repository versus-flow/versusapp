import React, { useState } from "react";
import { map } from "lodash";

import ArrowButton from "../general/ArrowButton";
import DropPreview from "../marketplace/DropPreview";
import ListItem from "../marketplace/ListItem";

const Collection = ({ pieces }) => {
  const [listItem, setListItem] = useState(false);
  return (
    <>
      {listItem && (
        <ListItem piece={listItem} close={() => setListItem(false)} />
      )}
      <div className="bg-white py-12">
        <div className="container">
          {pieces.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 lg:gap-x-16 lg:gap-y-8">
              {map(pieces, (p) => (
                <DropPreview
                  key={p.id}
                  title={p.metadata.name}
                  artist={p.metadata.artist}
                  edition={`#${p.metadata.edition}/${p.metadata.maxEdition}`}
                  shadow
                  zoom
                  img={p.img}
                  button={
                    <ArrowButton
                      text="List your item"
                      className="transparent-button"
                      onClick={() => setListItem(p)}
                    />
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center mx-auto pb-36 pt-24 text-center w-60">
              <h2 className="font-black font-inktrap leading-6 text-2xl">
                Your collection will be shown here
              </h2>
              <p className="mb-3 mt-3">
                When you have bought or won a bid your item will show up here
              </p>
              <ArrowButton text="Visit marketplace" className="lg-button" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Collection;
