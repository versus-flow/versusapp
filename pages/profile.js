import DropArtist from "../components/drop/DropArtist";
import DropTabs from "../components/drop/DropTabs";
import Main from "../components/layouts/Main";

export default function Profile() {
  return (
    <Main>
      {() => (
        <>
          <DropArtist />
          <DropTabs />
        </>
      )}
    </Main>
  );
}
