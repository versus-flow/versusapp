import React, { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import Head from "next/head";
import * as t from "@onflow/types";

import Nav from "../general/Nav";
import Footer from "../general/Footer";
import { fetchOneUser } from "../profile/transactions";

fcl
  .config()
  .put(
    "accessNode.api",
    process.env.NEXT_PUBLIC_ACCESS_NODE || "https://access-testnet.onflow.org"
  )
  .put(
    "challenge.handshake",
    process.env.NEXT_PUBLIC_WALLET ||
      "https://flow-wallet-testnet.blocto.app/authn"
  )
  .put(
    "0xFungibleToken",
    process.env.NEXT_PUBLIC_FUNGIBLE_TOKEN || "0x9a0766d93b6608b7"
  )
  .put(
    "0xNonFungibleToken",
    process.env.NEXT_PUBLIC_NONFUNGIBLE_TOKEN || "0x631e88ae7f1d7c20"
  )
  .put(
    "0xFlowToken",
    process.env.NEXT_PUBLIC_FLOW_TOKEN || "0x7e60df042a9c0868"
  )
  .put("0xCONTRACT", process.env.NEXT_PUBLIC_CONTRACT || "0x69915b410cca3c65")
  .put("0xPROFILE", process.env.NEXT_PUBLIC_CONTRACT || "0x69915b410cca3c65")
  .put("env", process.env.NEXT_PUBLIC_FLOW_ENV || "testnet");

const Main = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  const [balance, setBalance] = useState(0);
  useEffect(() => fcl.currentUser().subscribe(setUser), []);
  useEffect(() => {
    async function getBalance() {
      const response = await fcl.send([
        fcl.script(fetchOneUser),
        fcl.args([fcl.arg(user.addr, t.Address)]),
      ]);
      const balance = await fcl.decode(response);
      setBalance(parseFloat(balance).toFixed(2));
    }
    const int = setInterval(() => {
      if (user.addr) getBalance();
    }, 30000);
    return () => clearInterval(int);
  }, [user.addr]);
  user.balance = balance;
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/images/icon.png"
          sizes="16x16"
        />
        <title>Versus - Better for Art</title>
        <meta name="title" content="Versus - Better for Art" />
        <meta
          name="description"
          content="Versus is a novel NFT art marketplace that works to empower the artist and the collector."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.versus-flow.art/" />
        <meta property="og:title" content="Versus - Better for Art" />
        <meta
          property="og:description"
          content="Versus is a novel NFT art marketplace that works to empower the artist and the collector."
        />
        <meta
          property="og:image"
          content={`${process.env.VERCEL_URL}/images/versussocial.png`}
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.versus-flow.art/" />
        <meta property="twitter:title" content="Versus - Better for Art" />
        <meta
          property="twitter:description"
          content="Versus is a novel NFT art marketplace that works to empower the artist and the collector."
        />
        <meta
          property="twitter:image"
          content={`${process.env.VERCEL_URL}/images/versussocial.png`}
        />
      </Head>
      <Nav user={user} balance={balance} />
      {typeof children === String
        ? React.cloneElement(children, { user })
        : children(user)}
      <Footer />
    </>
  );
};

export default Main;
