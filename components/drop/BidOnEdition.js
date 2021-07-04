import React, { useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import { get, find, includes } from "lodash";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import Logo from "../../assets/vslogo.svg";
import FlowLogo from "../../assets/flowlogo.svg";
import Arrow from "../../assets/arrow.svg";
import ArrowButton from "../general/ArrowButton";
import { bidTransaction, tx } from "./transactions";
import Loading from "../general/Loading";

const BidOnEdition = ({
  close,
  editionNum,
  drop,
  art,
  ended,
  totalEditions,
}) => {
  const modal = useRef(null);
  const form = useRef(null);
  useOnClickOutside(modal, close);
  const [status, setStatus] = useState(null);
  const [writtenStatus, setWrittenStatus] = useState(null);
  const { editionsStatuses } = drop;
  const currentEdition =
    find(editionsStatuses, (e) => e.edition === parseInt(editionNum, 10)) ||
    find(editionsStatuses, (e) => e.edition === 0);
  const handleSubmit = async (e) => {
    if (ended) return false;
    e.preventDefault();
    setStatus(null);
    setWrittenStatus(null);
    const { bid } = form.current;
    if (!bid.value) {
      return setWrittenStatus("Please place a bid");
    }
    const newBid = parseFloat(bid.value);
    if (newBid < parseFloat(currentEdition.minNextBid))
      return setWrittenStatus(
        `Minimum next bid must be at least ${parseFloat(
          currentEdition.minNextBid
        ).toFixed(2)}`
      );
    try {
      await tx(
        [
          fcl.transaction(bidTransaction),
          fcl.args([
            fcl.arg("0xdb47998bf96c9ef1", t.Address),
            fcl.arg(drop.dropId, t.UInt64),
            fcl.arg(currentEdition.id, t.UInt64),
            fcl.arg(newBid.toFixed(1).toString(), t.UFix64),
          ]),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(9999),
        ],
        {
          onStart() {
            form.current.reset();
            setStatus({
              msg: "Bid processing",
              subtext: "Please wait while we submit the bid to the server.",
            });
          },
          async onSuccess(status) {
            setStatus({
              msg: "Bid Succesfully Submitted",
              subtext: "Your bid was successfully submitted.",
              allowClose: true,
            });
            const event = document.createEvent("Event");
            event.initEvent("bid", true, true);
            document.dispatchEvent(event);
          },
          onSubmission() {
            setStatus({
              msg: "Submitting to Server",
              subtext: "Please wait while we submit the bid to the server.",
            });
          },
          async onError(error) {
            if (error) {
              const { message } = error;
              if (includes(error, "larger or equal")) {
                return setStatus({
                  msg: "Bid unsuccessful",
                  subtext:
                    "Somebody has probably outbid you while you placed your bid. Try again.",
                  allowClose: true,
                });
              } else if (includes(error, "balance of the")) {
                return setStatus({
                  msg: "Bid unsuccessful",
                  subtext: "You do not have enough Flow to make this bid",
                  allowClose: true,
                });
              } else if (message === "Declined: User rejected signature") {
                return setStatus({
                  msg: "Bid unsuccessful",
                  subtext: "You have rejected the bid",
                  allowClose: true,
                });
              } else if (includes(error, "invalid argument at index 3")) {
                return setStatus({
                  msg: "Bid unsuccessful",
                  subtext: "This bid exceeds our maximum bid",
                  allowClose: true,
                });
              } else {
                return setStatus({
                  msg: "Bid unsuccessful",
                  subtext: `Unexpected error occured: ${error}`,
                  allowClose: true,
                });
              }
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
      <div
        ref={modal}
        className="bg-cream-500 flex flex-col items-center max-w-full px-20 py-8 rounded-2xl w-128 z-10 modal-scroll"
      >
        <Logo className="h-10" />
        {status && status.msg ? (
          <>
            <h4 className="font-black font-inktrap mt-8 text-xl">
              {status.msg}
            </h4>
            <p className="mt-4 w-3/4 text-center mx-auto">{status.subtext}</p>
            {status.allowClose ? (
              <ArrowButton text="Close" className="mt-8" onClick={close} />
            ) : (
              <Loading className="mt-8" />
            )}
          </>
        ) : (
          <>
            <h4 className="font-black font-inktrap mt-8 text-xl">
              Own edition {editionNum}/{totalEditions}
            </h4>
            <img className="h-auto mt-6 w-64" src={art} />
            <div className="mt-6">
              <span>
                The current bid is{" "}
                <span className="font-bold">
                  F{parseFloat(currentEdition.price).toFixed(2)}
                </span>
              </span>
              <div className="border border-regGrey flex items-center justify-between mt-2 mx-auto px-3 py-1 rounded-full text-xs">
                <div className="flex items-center">
                  <FlowLogo className="h-6" />{" "}
                  <span className="ml-2">Your balance:</span>
                </div>
                <span className="font-bold">F123</span>
              </div>
            </div>
            <form ref={form} onSubmit={handleSubmit} className="mt-3 w-full">
              <input
                type="number"
                placeholder="Enter Bid"
                name="bid"
                className="bg-white border border-regGrey outline-none placeholder-black-200 px-4 py-3 rounded text-black-500 w-full"
                step="0.1"
              />
              <p className="mt-2 text-xs">
                You must place a bid higher than F
                {parseFloat(currentEdition.minNextBid).toFixed(2)}
              </p>
            </form>
            <div className="flex justify-between mt-12 w-full">
              <ArrowButton text="Confirm" onClick={handleSubmit} />
              <span className="flex font-bold font-roboto items-center text-sm tracking-wide cursor-pointer">
                Cancel
                <Arrow className="ml-2" />
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BidOnEdition;