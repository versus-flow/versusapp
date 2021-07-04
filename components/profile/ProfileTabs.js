import Link from "next/link";

const ProfileTabs = () => {
  return (
    <div className="bg-lightGrey pt-8 pb-10 border-b border-regGrey">
      <div className="container">
        <div className="inline-flex tab-border relative flex-col sm:flex-row border-b border-mediumGrey">
          <Link href="#">
            <a className="mt-4 sm:mt-0 sm:text-center pb-1 sm:pb-3 cursor-pointer hover:font-semibold font-sourceSansPro px-3 sm:px-12">
              Collection
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;
