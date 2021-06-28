import { times } from "lodash";

import DropPreview from "./DropPreview";

const Results = () => {
  return (
    <div className="grid grid-cols-2 gap mt-4 gap-x-10 gap-y-6">
      {times(6, () => (
        <DropPreview shadow />
      ))}
    </div>
  );
};

export default Results;
