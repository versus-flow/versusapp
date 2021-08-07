import React, { useState, useEffect } from "react";
import { map } from "lodash";
import moment from "moment";
import Link from "next/link";

import Cart from "../../assets/cart.svg";
import { getGraffleUrl } from "../general/helpers";
import { fetchProfile } from "../../pages/profile/[name]";

const PurchaseHistory = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  useEffect(async () => {
    let sold = await (
      await fetch(
        getGraffleUrl(
          `?eventType=A.CONTRACT.Marketplace.TokenPurchased&id=${id}`
        )
      )
    ).json();
    sold = await Promise.all(
      map(sold, async (s) => ({
        ...s,
        profile: await fetchProfile(s.blockEventData.to),
        from: await fetchProfile(s.blockEventData.from),
      }))
    );
    setHistory(sold);
    setLoading(false);
  }, [id]);
  return (
    <div className="bg-black-900 text-white py-12">
      <div className="container">
        <h3 className="font-black font-inktrap text-2xl">Purchase History</h3>
        <div className="mt-4">
          {loading
            ? ""
            : map(history, (i, index) => (
                <div
                  key={`${index}-${i.address}`}
                  className="flex flex-col sm:flex-row sm:items-center mb-4"
                >
                  <div className="flex items-center">
                    <Cart className="h-8 mr-2" />
                    <span className="mr-6">
                      {moment(i.eventDate).format("LL")}
                    </span>
                    <div className="bg-white h-12 mr-3 p-1 rounded-full shadow-lg w-12 flex justify-center items-center">
                      {i.profile.avatar ? (
                        <img
                          src={i.profile.avatar}
                          className="h-full object-cover rounded-full w-full"
                        />
                      ) : (
                        <span className="font-bold text-xl text-black-500">
                          {i.profile.name
                            ? i.profile.name.substring(0, 1)
                            : "?"}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="mt-2 sm:mt-0">
                    <Link href={`/profile/${i.profile.address}`}>
                      <a className="font-bold cursor-pointer">
                        @{i.profile.name || i.profile.address.substring(0, 6)}
                      </a>
                    </Link>{" "}
                    purchased the item for{" "}
                    <span className="font-bold">F{i.blockEventData.price}</span>{" "}
                    from{" "}
                    <Link href={`/profile/${i.from.address}`}>
                      <a className="font-bold cursor-pointer">
                        @{i.from.name || i.from.address.substring(0, 6)}
                      </a>
                    </Link>
                  </span>{" "}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
