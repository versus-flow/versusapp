import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import ArrowButton from "../general/ArrowButton";
import { tx } from "../drop/transactions";
import { checkForArtConnection, connectArtCollection } from "./transactions";

const CollectionOnboard = ({ user }) => {
  const [run, setRun] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(async () => {
    async function checkCollection() {
      const response = await fcl.send([
        fcl.script(checkForArtConnection),
        fcl.args([fcl.arg(user.addr, t.Address)]),
      ]);
      const dResponse = await fcl.decode(response);
      if (user && user.addr) setShowButton(!dResponse);
      if (dResponse) console.log("verified");
    }
    checkCollection();
  }, [user, run]);

  const createArtCollection = async (e) => {
    e.preventDefault();
    try {
      await tx(
        [
          fcl.transaction(connectArtCollection),
          fcl.args(),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(9999),
        ],
        {
          onStart() {},
          onSubmission() {},
          async onSuccess(status) {
            setRun(Math.random());
          },
          async onError(error) {
            console.log(error);
          },
        }
      );
    } catch (e) {}
  };

  return showButton ? (
    <ArrowButton
      className="mb-4"
      text="Create Art Collection"
      onClick={createArtCollection}
    >
      Create Art Collection
    </ArrowButton>
  ) : (
    ""
  );
};

export default CollectionOnboard;
