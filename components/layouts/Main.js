import React, { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import Head from "next/head";
import * as t from "@onflow/types";

import Nav from "../general/Nav";
import Footer from "../general/Footer";
import { fetchOneUser } from "../profile/transactions";
import SEOBoilerplate from "../general/SEOBoilerplate";

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
  .put("0xCONTRACT", process.env.NEXT_PUBLIC_CONTRACT || "0x99ca04281098b33d")
  .put("0xPROFILE", process.env.NEXT_PUBLIC_CONTRACT || "0x99ca04281098b33d")
  .put("0xTOPSHOTADDRESS", process.env.NEXT_PUBLIC_TS || "0x877931736ee77cff")
  .put("env", process.env.NEXT_PUBLIC_FLOW_ENV || "testnet");

const Main = ({ children, seo }) => {
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
      setBalance(parseFloat(balance).toFixed(1));
    }
    if (user.addr) getBalance();
    const int = setInterval(() => {
      if (user.addr) getBalance();
    }, 30000);
    return () => clearInterval(int);
  }, [user.addr]);
  user.balance = balance;
  return (
    <>
      {seo || <SEOBoilerplate />}
      <Nav user={user} balance={balance} />
      {typeof children === String
        ? React.cloneElement(children, { user })
        : children(user)}
      <Footer />
    </>
  );
};

export default Main;
