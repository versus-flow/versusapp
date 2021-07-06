import React, { useState, useRef } from "react";
import * as fcl from "@onflow/fcl";
import useOnClickOutside from "use-onclickoutside";
import Link from "next/link";
import useCopy from "@react-hook/copy";

import Logo from "../../assets/vslogo.svg";
import Chevron from "../../assets/chevron.svg";
import Bell from "../../assets/bell.svg";
import Copy from "../../assets/copy.svg";
import FlowLogo from "../../assets/flowlogo.svg";
import classNames from "classnames";
import SearchBox from "../search/SearchBox";
import ArrowButton from "./ArrowButton";

const Nav = ({ user, balance }) => {
  const [addrOpen, setAddrOpen] = useState(false);
  const addrMenu = useRef(null);
  useOnClickOutside(addrMenu, () => setAddrOpen(false));
  const { copied, copy, reset } = useCopy(user.addr);
  return (
    <div className="flex grid-cols-2 sm:grid-cols-4 items-center justify-between py-4 bg-transparent px-6 mx-auto relative z-30 font-roboto">
      <div className="flex items-start">
        <Link href="/" className="flex items-start">
          <a>
            <Logo className="w-12" />
          </a>
        </Link>
      </div>
      <div className="col-span-1 hidden sm:flex justify-center items-center">
        {/* <SearchBox /> */}
        {/* <Link href={`/marketplace`}>
          <a className="ml-4 font-semibold text-sm hidden sm:inline-block">
            Marketplace
          </a>
        </Link> */}
      </div>
      <div className="flex flex-1 justify-end">
        {!user.addr ? (
          <ArrowButton
            className="standard-button"
            onClick={fcl.authenticate}
            text="Connect Wallet"
          />
        ) : (
          <div className="flex flex-col-reverse items-center sm:flex-row">
            {user.addr && (
              <span className="mr-4 sm:text-lg order-1 sm:order-none border px-6 py-2 border-black-500 rounded-full hidden lg:inline-block">
                Balance:{" "}
                <span className="font-bold">{Math.round(balance)}F</span>
              </span>
            )}
            <div className="relative flex items-center" ref={addrMenu}>
              {/* <Bell className="mr-4 h-6 w-6 cursor-pointer hidden lg:block" /> */}
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
                {user.avatar && (
                  <div className="ml-4 w-10 h-10 rounded-full hidden lg:block">
                    <img
                      src="https://lh3.googleusercontent.com/ogw/ADea4I4TggB1GCdvgQaIkX0S9zbSZH-evkipl6fX5p6i=s64-c-mo"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                )}
              </div>
              {addrOpen && (
                <div className="absolute bg-white flex flex-col mt-2 right-0 rounded-lg top-full w-92">
                  {user.addr && (
                    <>
                      <div className="bg-black-900 flex font-bold items-center justify-between px-6 py-3 rounded-t-xl text-sm text-white">
                        <span>{user.addr}</span>
                        <Copy
                          onClick={copy}
                          className={classNames(
                            "h-5 ml-4 cursor-pointer stroke-current",
                            {
                              "text-green-500": copied,
                            }
                          )}
                        />
                      </div>
                      <div className="border-b border-regGrey">
                        <div className="flex items-center px-6 py-3">
                          <FlowLogo className="h-8 w-8" />
                          <div className="flex-1 font-bold pl-3 text-black-100 text-sm">
                            <div>Flow balance</div>
                            <div className="flex justify-between">
                              <span className="text-black-500">F{balance}</span>
                              <span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div>
                    {/* <a href="#" className="block cursor-pointer px-6 py-3">
                      Bids
                    </a> */}
                    <Link href="/profile/me">
                      <a className="block cursor-pointer px-6 py-3">
                        Collection
                      </a>
                    </Link>
                    {/* <Link href="/marketplace">
                      <a href="#" className="block cursor-pointer px-6 py-3">
                        Marketplace
                      </a>
                    </Link> */}
                    {/* {user.addr && (
                      <Link href="/profile/me">
                        <a className="block cursor-pointer px-6 py-3">
                          Profile
                        </a>
                      </Link>
                    )} */}
                    <span
                      onClick={(e) => {
                        if (!user.addr) fcl.authenticate();
                        else fcl.unauthenticate();
                        setAddrOpen(false);
                      }}
                      className="block cursor-pointer px-6 py-3"
                    >
                      Log {user.addr ? "out" : "in"}
                    </span>
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
