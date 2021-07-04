import { reduce, get } from "lodash";
import moment from "moment";

import UniqueBidBox from "./UniqueBidBox";
import Logo from "../../assets/vslogo.svg";
import EditionBidBox from "./EditionBidBox";

const DropBids = ({ drop, art, user, timeRemaining }) => {
  const uniqueTotal = parseFloat(get(drop, "uniqueStatus.price"));
  const editionTotal = reduce(
    drop.editionsStatuses,
    (sum, e) => sum + parseFloat(e.price),
    0
  );
  const ended = !drop.active && drop.winning !== "TIE";
  const hasntStarted = parseFloat(drop.startTime) - moment().unix() > 0;
  return (
    <div className="bg-white pb-6 sm:pb-24">
      <div className="container">
        <div className="sm:container mx-auto md:mx-0 md:max-w-none md:grid grid-cols-10 items-stretch pt-12 pb-3">
          <div className="col-span-4">
            <UniqueBidBox
              drop={drop}
              art={art}
              winning={uniqueTotal > editionTotal}
              ended={ended}
              hasntStarted={hasntStarted}
              user={user}
              timeRemaining={timeRemaining}
            />
          </div>
          <div className="py-8 md:py-0 col-span-2 h-full flex items-center justify-center">
            <Logo className="h-12 ml-2 relative" />
          </div>
          <div className="col-span-4">
            <EditionBidBox
              drop={drop}
              art={art}
              winning={editionTotal > uniqueTotal}
              ended={ended}
              hasntStarted={hasntStarted}
              user={user}
              timeRemaining={timeRemaining}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropBids;
