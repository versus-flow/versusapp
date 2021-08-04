import React, { useState, useEffect } from "react";
import Cart from "../../assets/cart.svg";
import { getGraffleUrl } from "../general/helpers";
import { map } from "lodash";
import { fetchProfile } from "../../pages/profile/[name]";

const PurchaseHistory = ({ id }) => {
  console.log(id);
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
    console.log(sold);
    console.log(await fetchProfile("0xecbfbce121d9b798"), "pro");
    sold = await Promise.all(
      map(sold, async (s) => ({
        ...s,
        profile: await fetchProfile(s.blockEventData.to),
      }))
    );
    console.log(sold);
    setLoading(false);
  }, [id]);
  return (
    <div className="bg-black-900 text-white py-12">
      <div className="container">
        <h3 className="font-black font-inktrap text-2xl">Purchase History</h3>
        <div className="mt-4">
          {loading ? (
            ""
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center mb-4">
              <div className="flex items-center">
                <Cart className="h-8 mr-2" />
                <span className="mr-6">May 14, 2021</span>
                <div className="bg-white h-12 mr-3 p-1 rounded-full shadow-lg w-12">
                  <img
                    src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                    className="h-full object-cover rounded-full w-full"
                  />
                </div>
              </div>
              <span className="mt-2 sm:mt-0">
                @kinger9999 purchased the item for{" "}
                <span className="font-bold">F100</span>
              </span>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
