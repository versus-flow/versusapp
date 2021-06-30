import Main from "../components/layouts/Main";
import Landing from "../components/home/Landing";
import MarketplacePreview from "../components/home/MarketplacePreview";
import Rewarded from "../components/home/Rewarded";
import BetterForArt from "../components/home/BetterForArt";

export default function Home() {
  return (
    <Main>
      {() => (
        <>
          <Landing />
          <MarketplacePreview />
          <Rewarded />
          <BetterForArt />
        </>
      )}
    </Main>
  );
}
