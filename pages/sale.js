import Main from "../components/layouts/Main";
import SaleMain from "../components/marketplace/SaleMain";
import DropProperties from "../components/drop/DropProperties";
import AboutCreator from "../components/marketplace/AboutCreator";
import PurchaseHistory from "../components/marketplace/PurchaseHistory";
import BetterForArt from "../components/home/BetterForArt";
import JoinCommunity from "../components/general/JoinCommunity";

export default function Sale() {
  return (
    <Main>
      {() => (
        <>
          <SaleMain />
          <DropProperties />
          <AboutCreator />
          <PurchaseHistory />
          <div className="py-12">
            <div className="container">
              <JoinCommunity />
            </div>
          </div>
        </>
      )}
    </Main>
  );
}
