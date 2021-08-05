import { get, map, pick } from "lodash";
import Link from "next/link";

import DropPreview from "./DropPreview";

const Results = ({ pieces }) => {
  return pieces.length ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap mt-4 gap-x-10 gap-y-6">
      {map(pieces, (p) => (
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
          price={p.blockEventData.price.toFixed(1)}
          button={
            <Link href={`/listing/${p.blockEventData.id}`}>
              <a className="standard-button small-button block mt-2">Buy</a>
            </Link>
          }
        />
      ))}
    </div>
  ) : (
    <div className="text-2xl mt-12">There are no results for this search</div>
  );
};

export default Results;
