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
import { listForSale, sendNFT } from "./transactions";
import Loading from "../general/Loading";

const SendItem = ({ close, piece }) => {
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Send");
  const [address, setAddress] = useState("");
  const modal = useRef(null);
  useOnClickOutside(modal, close);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (status === "Sending") return;
    try {
      await tx(
        [
          fcl.transaction(sendNFT),
          fcl.args([fcl.arg(piece.id, t.UInt64), fcl.arg(address, t.Address)]),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(9999),
        ],
        {
          onStart() {
            setStatus("Sending");
          },
          onSubmission() {
            setStatus("Sending");
          },
          async onSuccess(status) {
            setStatus("Sent");
            setTimeout(close, 300);
          },
          async onError(error) {
            setStatus("Send");
            if (error) {
              console.log(error);
              setError("This address does not have an art collection");
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
        <h4 className="font-black font-inktrap mt-8 text-2xl">Send Item</h4>
        <div className="mt-6">
          <DropPreview
            key={piece.id}
            title={piece.metadata.name}
            artist={piece.metadata.artist}
            edition={`#${piece.metadata.edition}/${piece.metadata.maxEdition}`}
            img={piece.img}
            shadow
          />
        </div>
        <p className="text-center mt-4">
          Please enter the destination address below:
        </p>
        <div className="form-group">
          <input
            type="text"
            name="amount"
            className="standard-input"
            onChange={(e) => setAddress(e.currentTarget.value)}
          />
          {error && <ErrorMessage text={error} className="mt-2" />}
          <span className="block mt-1 text-xs">
            All transactions occur on the blockchain and are final. Please
            double check the address before sending.
          </span>
        </div>
        {status === "Sending" ? (
          <div className="text-2xl h-16 flex flex-col justify-center items-center transform scale-50">
            <Loading />
            {status}
          </div>
        ) : (
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
        )}
      </form>
    </div>
  );
};

export default SendItem;
