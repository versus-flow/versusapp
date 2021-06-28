import React, { useState, useRef } from "react";
import * as fcl from "@onflow/fcl";
import useOnClickOutside from "use-onclickoutside";
import Link from "next/link";

import Logo from "../../assets/vslogo.svg";
import Chevron from "../../assets/chevron.svg";
import Bell from "../../assets/bell.svg";
import Copy from "../../assets/copy.svg";
import FlowLogo from "../../assets/flowlogo.svg";
// import SearchBox from "../search/SearchBox";
import classNames from "classnames";
import SearchBox from "../search/SearchBox";

const Nav = ({ user, balance }) => {
  const [addrOpen, setAddrOpen] = useState(false);
  const addrMenu = useRef(null);
  useOnClickOutside(addrMenu, () => setAddrOpen(false));
  return (
    <div className="flex grid-cols-2 sm:grid-cols-4 items-center justify-between py-4 bg-transparent px-6 mx-auto relative z-30 font-roboto">
      <div className="flex items-start">
        <Link href="/" className="flex items-start">
          <a>
            <Logo className="w-12" />
          </a>
        </Link>
      </div>
      <div className="col-span-1 flex justify-center items-center order-1 sm:order-none mt-4 sm:mt-0">
        <SearchBox />
        <Link href={`/marketplace`}>
          <a className="ml-4 font-semibold text-sm">Marketplace</a>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        {false ? (
          <button
            className="standard-button small-button"
            role="button"
            aria-label="Connect Wallet"
            onClick={fcl.authenticate}
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex flex-col-reverse items-center sm:flex-row">
            {user.addr && (
              <span className="mr-4 sm:text-lg sm:inline-block order-1 sm:order-none border px-6 py-2 border-black-500 rounded-full">
                Balance:{" "}
                <span className="font-bold">{Math.round(balance)}F</span>
              </span>
            )}
            <div className="relative flex items-center" ref={addrMenu}>
              <Bell className="mr-4 h-6 w-6 cursor-pointer" />
              <div
                className="flex items-center cursor-pointer font-semibold text-sm"
                onClick={() => setAddrOpen(!addrOpen)}
              >
                <span>{user.username || "Menu"}</span>
                <Chevron
                  className={classNames("ml-2 w-4 transform", {
                    "rotate-180": addrOpen,
                  })}
                />
                {user.addr && (
                  <div className="ml-4 w-10 h-10 rounded-full">
                    <img
                      src="https://lh3.googleusercontent.com/ogw/ADea4I4TggB1GCdvgQaIkX0S9zbSZH-evkipl6fX5p6i=s64-c-mo"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                )}
              </div>
              {addrOpen && (
                <div class="absolute bg-white flex flex-col mt-2 right-0 rounded-lg top-full w-92">
                  {user.addr && (
                    <>
                      <div class="bg-black-900 flex font-bold items-center justify-between px-6 py-3 rounded-t-xl text-sm text-white">
                        <span>{user.addr}</span>
                        <Copy class="h-5 ml-4" />
                      </div>
                      <div class="border-b border-regGrey">
                        <div class="flex items-center px-6 py-3">
                          <FlowLogo class="h-8 w-8" />
                          <div class="flex-1 font-bold pl-3 text-black-100 text-sm">
                            <div>Flow balance</div>
                            <div class="flex justify-between">
                              <span class="text-black-500">F340</span>
                              <span>$5,100</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div>
                    <a href="#" class="block cursor-pointer px-6 py-3">
                      Bids
                    </a>
                    <a href="#" class="block cursor-pointer px-6 py-3">
                      Collection
                    </a>
                    <a href="#" class="block cursor-pointer px-6 py-3">
                      Marketplace
                    </a>
                    <a href="#" class="block cursor-pointer px-6 py-3">
                      Settings
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        if (!user.addr) fcl.authenticate();
                      }}
                      class="block cursor-pointer px-6 py-3"
                    >
                      Log {user.addr ? "out" : "in"}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
