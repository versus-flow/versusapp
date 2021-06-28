import Link from "next/link";

const DropTabs = () => {
  return (
    <div className="bg-lightGrey pt-8 pb-10 border-b border-regGrey">
      <div className="container">
        <div className="inline-flex tab-border relative flex-col sm:flex-row border-b border-mediumGrey">
          <Link href="#">
            <a
              aria-current="page"
              className="sm:text-center pb-3 cursor-pointer hover:font-semibold font-lato font-semibold px-12 border-b-2 border-black-600"
            >
              Drops
            </a>
          </Link>
          <Link href="#">
            <a className="sm:text-center pb-3 cursor-pointer hover:font-semibold font-sourceSansPro px-12">
              Collection
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DropTabs;
