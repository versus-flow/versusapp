import DropArtist from "../components/drop/DropArtist";
import DropBids from "../components/drop/DropBids";
import DropContent from "../components/drop/DropContent";
import DropFollow from "../components/drop/DropFollow";
import DropProperties from "../components/drop/DropProperties";
import DropTabs from "../components/drop/DropTabs";
import Main from "../components/layouts/Main";

export default function Drop() {
  return (
    <Main>
      <>
        <DropArtist />
        <DropTabs />
        <DropContent />
        <DropBids />
        <DropProperties />
        <DropFollow />
      </>
    </Main>
  );
}
