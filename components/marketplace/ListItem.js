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
import { listForSale } from "./transactions";
import Loading from "../general/Loading";
import { isVideoDrop } from "../general/helpers";

const ListItem = ({ close, piece }) => {
  const [error, setError] = useState("");
  const [status, setStatus] = useState("List for sale");
  const [price, setPrice] = useState("");
  const modal = useRef(null);
  useOnClickOutside(modal, close);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (status === "List for sale") return setStatus("Confirm");
    else if (status === "Listing") return;
    try {
      await tx(
        [
          fcl.transaction(listForSale),
          fcl.args([fcl.arg(piece.id, t.UInt64), fcl.arg(price, t.UFix64)]),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(9999),
        ],
        {
          onStart() {
            setStatus("Listing");
          },
          onSubmission() {
            setStatus("Listing");
          },
          async onSuccess(status) {
            setStatus("Listed");
            setTimeout(close, 300);
          },
          async onError(error) {
            setStatus("List for sale");
            if (error) {
              const { message } = error;
              setError(message.toString());
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
        <h4 className="font-black font-inktrap mt-8 text-2xl">
          List item for sale
        </h4>
        <div className="mt-6">
          <DropPreview
            key={piece.id}
            title={piece.metadata.name}
            artist={piece.metadata.artist}
            edition={`#${piece.metadata.edition}/${piece.metadata.maxEdition}`}
            src={piece.img}
            video={isVideoDrop(piece)}
            shadow
          />
        </div>
        {status != "List for sale" ? (
          <p className="text-center mt-4 mb-6">
            You are about to list this item for sale at a price of F{price},
            please confirm below if you would like to proceed.
          </p>
        ) : (
          <>
            <p className="text-center mt-4">
              Please enter the sale price below:
            </p>
            <div className="form-group">
              <input
                type="text"
                name="amount"
                className="standard-input"
                placeholder="Enter the amount you want to sell it for"
                defaultValue={price}
                onChange={(e) =>
                  setPrice(
                    parseFloat(e.currentTarget.value).toFixed(1).toString()
                  )
                }
              />
              {error && <ErrorMessage text={error} className="mt-2" />}
              <span className="block mt-1 text-xs">
                All sales occur on the blockchain and are final. Please double
                check the price before listing.
              </span>
            </div>
          </>
        )}
        {status === "Listing" ? (
          <div className="text-2xl h-16 flex flex-col justify-center items-center transform scale-50">
            <Loading />
            {status}
          </div>
        ) : (
          <div className="flex justify-between mt-6 w-full">
            <ArrowButton text={status} onClick={handleSubmit} />
            <span
              className="flex font-bold font-roboto items-center text-sm tracking-wide cursor-pointer"
              onClick={() => {
                if (status === "Confirm") return setStatus("List for sale");
                else close();
              }}
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

export default ListItem;
