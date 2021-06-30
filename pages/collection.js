import DropArtist from "../components/drop/DropArtist";
import DropTabs from "../components/drop/DropTabs";
import ArrowButton from "../components/general/ArrowButton";
import Main from "../components/layouts/Main";
import ListItem from "../components/marketplace/ListItem";

export default function Collection() {
  return (
    <Main>
      {() => (
        <>
          <DropArtist />
          <DropTabs />
          {false ? (
            ""
          ) : (
            <div className="bg-white">
              <div className="flex flex-col items-center mx-auto pb-36 pt-24 text-center w-60">
                <h2 className="font-black font-inktrap leading-6 text-2xl">
                  Your collection will be shown here
                </h2>
                <p className="mb-3 mt-3">
                  When you have bought or won a bid your item will show up here
                </p>
                <ArrowButton text="Visit marketplace" className="lg-button" />
              </div>
            </div>
          )}
          <ListItem />
        </>
      )}
    </Main>
  );
}
