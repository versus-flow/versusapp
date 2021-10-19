import React, { useState } from "react";
import moment from "moment";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import { tx } from "../transactions";
import { cancelDutchBid } from "./transactions";

const BidRow = ({ bid }) => {
  console.log(bid);
  const [withdrawing, setWithdrawing] = useState(false);
  let status = "";
  let statusColor = "black";
  let Buttons = "";
  const buttonClass =
    "py-2 px-8 border rounded inline-block cursor-pointer hover:bg-borderGrey text-sm";
  const withdrawBid = async () => {
    console.log(bid.id);
    try {
      await tx(
        [
          fcl.transaction(cancelDutchBid),
          fcl.args([fcl.arg(parseInt(bid.id), t.UInt64)]),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(9999),
        ],
        {
          onStart() {
            setWithdrawing(true);
          },
          onSubmission() {
            setWithdrawing(true);
          },
          async onSuccess(status) {
            setWithdrawing(false);
          },
          async onError(error) {
            if (error) {
              console.log(error);
              setWithdrawing(false);
            }
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  if (bid.winning && !bid.confirmed) {
    status = "Qualifying";
    statusColor = "#FFAF00";
    Buttons = (
      <div>
        <div className={`${buttonClass} mr-3`}>Increase</div>
        <div
          className={buttonClass}
          onClick={withdrawBid}
          disabled={withdrawing}
        >
          {withdrawing ? "Withdrawing..." : "Withdraw"}
        </div>
      </div>
    );
  } else if (bid.winning && bid.confirmed) {
    status = "Confirmed";
    statusColor = "#56BD66";
  } else {
    status = "NGMI";
    statusColor = "#E1322A";
  }

  return (
    <div className="grid grid-cols-12 text-sm border-t border-borderGrey py-4 items-center">
      <div className="col-span-2 font-black">F{bid.amount}</div>
      <div className="col-span-2 font-black" style={{ color: statusColor }}>
        {status}
      </div>
      <div className="col-span-2 sm:col-span-2">
        {moment.unix(parseFloat(bid.time)).format("h:mma MM/DD/YY")}
      </div>
      <div className="col-span-6 flex justify-end items-center">{Buttons}</div>
    </div>
  );
};

export default BidRow;
