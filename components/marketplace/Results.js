import React, { useState } from "react";
import classNames from "classnames";
import { chunk, get, map, pick, times } from "lodash";
import Link from "next/link";

import DropPreview from "./DropPreview";

const Results = ({ pieces }) => {
  const [page, setPage] = useState(1);
  const perPage = 12;
  const numPages = Math.ceil(pieces.length / perPage);
  const pages = chunk(pieces, perPage);
  return pieces.length ? (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap mt-4 gap-x-10 gap-y-6">
        {map(pages[page - 1], (p) => (
          <DropPreview
            key={p.id}
            id={get(p, "data.id", get(p, "blockEventData.id"))}
            shadow
            img={p.img}
            title={p.data.art.name}
            artist={p.data.art.artist}
            edition={`#${p.data.art.edition}/${p.data.art.maxEdition}`}
            zoom
            img={p.img}
            price={parseFloat(p.data.price).toFixed(1)}
            button={
              <Link href={`/listing/${p.blockEventData.id}`}>
                <a className="standard-button small-button block mt-2">View</a>
              </Link>
            }
          />
        ))}
      </div>
      {numPages > 1 ? (
        <div className="flex items-center justify-center mt-16">
          {times(numPages, (n) => (
            <div
              className={classNames("pagination-button mx-3", {
                "pagination-active": page === n + 1,
              })}
              onClick={() => setPage(n + 1)}
              key={`${n}-page`}
            >
              {n + 1}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  ) : (
    <div className="text-2xl mt-12">There are no results for this search</div>
  );
};

export default Results;
