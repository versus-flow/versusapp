import React, { useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import Logo from "../../assets/vslogo.svg";
import Arrow from "../../assets/arrow.svg";
import ArrowButton from "../general/ArrowButton";
import DropPreview from "./DropPreview";
import ErrorMessage from "../general/ErrorMessage";
import { tx } from "../drop/transactions";
import { purchaseItem } from "./transactions";
import Loading from "../general/Loading";

const BuyItem = ({ close, piece, user, art }) => {
  console.log(user);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Confirm");
  const modal = useRef(null);
  useOnClickOutside(modal, close);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (status !== "Confirm") return;
    try {
      await tx(
        [
          fcl.transaction(purchaseItem),
          fcl.args([
            fcl.arg(user.addr, t.Address),
            fcl.arg(piece.id, t.UInt64),
            fcl.arg(parseFloat(piece.price).toFixed(1).toString(), t.UFix64),
          ]),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(9999),
        ],
        {
          onStart() {
            setStatus("Processing");
          },
          onSubmission() {
            setStatus("Processing");
          },
          async onSuccess(status) {
            setStatus("Purchased");
            setTimeout(close, 300);
          },
          async onError(error) {
            if (error) {
              const { message } = error;
              setError(message.toString());
              setStatus("Confirm");
            }
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="fixed flex h-screen items-center justify-center left-0 top-0 w-screen z-50 py-12">
      <div className="absolute bg-black-600 bg-opacity-90 h-full left-0 top-0 w-full" />
      <form
        ref={modal}
        className="bg-cream-500 flex flex-col items-center px-8 sm:px-20 pb-8 sm:py-8 rounded w-full max-w-md z-10 modal-scroll"
      >
        <Logo className="h-3 sm:h-10" />
        {status === "Confirm" && (
          <>
            <h4 className="font-black font-inktrap mt-8 text-2xl">Checkout</h4>
            <div className="mt-6">
              <DropPreview
                key={piece.id}
                title={piece.metadata.name}
                artist={piece.metadata.artist}
                edition={`#${piece.metadata.edition}/${piece.metadata.maxEdition}`}
                img={art}
                shadow
              />
            </div>
            <p className="text-center mt-4 mb-6">
              You are about to buy this item for{" "}
              <span className="font-bold">
                F{parseFloat(piece.price).toFixed(1)}
              </span>
              .
            </p>
            <div className="flex justify-between mt-6 w-full">
              <ArrowButton text={status} onClick={handleSubmit} />
              <span
                className="flex font-bold font-roboto items-center text-sm tracking-wide cursor-pointer"
                onClick={close}
              >
                Cancel
                <Arrow className="ml-2" />
              </span>
            </div>
          </>
        )}
        {status === "Processing" && (
          <>
            <h4 className="font-black font-inktrap mt-8 text-2xl">
              Processing payment...
            </h4>
            <p className="mt-6 text-center">
              Please wait while we process your payment.
            </p>
            <div className="mt-6 flex justify-center">
              <Loading />
            </div>
          </>
        )}
        {status === "Purchased" && (
          <>
            <h4 className="font-black font-inktrap mt-8 text-2xl">
              Congratulations
            </h4>
            <p className="mt-6 text-center">
              You have successfully purchased the NFT!
            </p>
            <ArrowButton text="Close" onClick={close} className="mt-6" />
          </>
        )}
      </form>
    </div>
  );
};

export default BuyItem;
