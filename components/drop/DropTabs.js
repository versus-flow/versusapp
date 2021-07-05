import classNames from "classnames";
import Link from "next/link";

const DropTabs = ({ id, collection }) => {
  return (
    <div className="bg-lightGrey pt-8 pb-10 border-b border-regGrey">
      <div className="container">
        <div className="inline-flex tab-border relative flex-col sm:flex-row border-b border-mediumGrey">
          <Link href={`/drop/${id}`}>
            <a
              aria-current="page"
              className={classNames(
                "sm:text-center pb-1 sm:pb-3 cursor-pointer hover:font-semibold font-lato px-3 sm:px-12",
                {
                  "font-semibold border-b-2 border-black-600": !collection,
                }
              )}
            >
              Drops
            </a>
          </Link>
          <Link href={`/drop/collection/${id}`}>
            <a
              className={classNames(
                "mt-4 sm:mt-0 sm:text-center pb-1 sm:pb-3 cursor-pointer hover:font-semibold font-sourceSansPro px-3 sm:px-12",
                {
                  "font-semibold border-b-2 border-black-600": collection,
                }
              )}
            >
              Collection
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DropTabs;
