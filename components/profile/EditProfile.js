import React, { useRef } from "react";
import useOnClickOutside from "use-onclickoutside";
import ArrowButton from "../general/ArrowButton";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import Person from "../../assets/person.svg";
import Pencil from "../../assets/pencil.svg";
import Instagram from "../../assets/instagram.svg";
import Twitter from "../../assets/twitter.svg";
import Youtube from "../../assets/youtube.svg";
import Discord from "../../assets/discord.svg";
import Arrow from "../../assets/arrow.svg";
import { profileEdit } from "./transactions";
import { tx } from "../drop/transactions";

const EditProfile = ({ close }) => {
  const modal = useRef(null);
  const form = useRef(null);
  useOnClickOutside(modal, close);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, username, description } = form.current;
    console.log("effe");
    try {
      await tx(
        [
          fcl.transaction(profileEdit),
          fcl.args([
            fcl.arg(name.value, t.String),
            fcl.arg(description.value, t.String),
          ]),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(9999),
        ],
        {
          onStart() {
            console.log("awef");
          },
          onSubmission() {
            console.log("submission");
          },
          async onSuccess(status) {
            console.log(status);
          },
          async onError(error) {
            console.log(error);
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div class="fixed flex h-screen items-center justify-center left-0 top-0 w-screen z-50 py-12">
      <div class="absolute bg-black-600 bg-opacity-90 h-full left-0 top-0 w-full" />
      <div
        ref={modal}
        class="bg-cream-500 flex flex-col items-center px-20 py-8 rounded-2xl w-full max-w-md z-10 modal-scroll"
      >
        <div class="relative w-16">
          <Person />
          <div
            style={{ backgroundColor: "#2F80ED" }}
            class="absolute bottom-0 cursor-pointer flex h-4 items-center justify-center right-0 rounded-full w-4"
          >
            <Pencil class="h-3 w-3" />
          </div>
        </div>
        <h2 class="font-black font-inktrap mt-4 text-2xl">Edit profile</h2>
        <form class="w-full" ref={form} onSubmit={handleSubmit}>
          <div class="form-group">
            <label className="standard-label">Name</label>
            <input
              type="text"
              name="name"
              className="standard-input"
              placeholder="Enter your name"
            />
          </div>
          <div class="form-group">
            <label className="standard-label">Username</label>
            <div class="flex items-stretch">
              <div class="bg-cream-600 flex font-bold items-center justify-center rounded-l text-lg w-10">
                @
              </div>
              <input
                type="text"
                name="username"
                className="standard-input no-border-input"
                placeholder="Enter a username"
              />
            </div>
            <span class="block mt-1 text-xs">
              Choose a username that publicly links to your profile.
            </span>
          </div>
          <div class="form-group">
            <label className="standard-label">Biography</label>
            <input
              type="text"
              name="description"
              className="standard-input"
              placeholder="Enter your short biography"
            />
            <span class="block font-bold text-right text-xs">0/250</span>
          </div>

          <div class="form-group">
            <label className="standard-label">
              Add links to your social media profiles
            </label>
            <div class="flex items-stretch mb-2">
              <div class="bg-cream-600 flex font-bold items-center px-2 rounded-l text-sm w-48">
                <Instagram class="w-5 mr-2" /> Instagram
              </div>
              <input
                type="link"
                name="instagram"
                className="standard-input no-border-input"
                placeholder="Profile URL"
              />
            </div>
            <div class="flex items-stretch mb-2">
              <div class="bg-cream-600 flex font-bold items-center px-2 rounded-l text-sm w-48">
                <Twitter class="w-5 mr-2" /> Twitter
              </div>
              <input
                type="link"
                name="twitter"
                className="standard-input no-border-input"
                placeholder="Profile URL"
              />
            </div>
            <div class="flex items-stretch mb-2">
              <div class="bg-cream-600 flex font-bold items-center px-2 rounded-l text-sm w-48">
                <Youtube class="w-5 mr-2" /> Youtube
              </div>
              <input
                type="link"
                name="youtube"
                className="standard-input no-border-input"
                placeholder="Channel URL"
              />
            </div>
            <div class="flex items-stretch">
              <div class="bg-cream-600 flex font-bold items-center px-2 rounded-l text-sm w-48">
                <Discord class="w-5 mr-2" /> Discord
              </div>
              <input
                type="link"
                name="discord"
                className="standard-input no-border-input"
                placeholder="Include #Code"
              />
            </div>
          </div>

          <div class="flex justify-between mt-6 w-full">
            <ArrowButton text="Save Changes" onClick={handleSubmit} />
            <span
              className="flex font-bold font-roboto items-center text-sm tracking-wide cursor-pointer"
              onClick={close}
            >
              Cancel
              <Arrow className="ml-2" />
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
