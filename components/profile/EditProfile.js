import React, { useRef, useState } from "react";
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
import { profileChange, profileEdit } from "./transactions";
import { tx } from "../drop/transactions";
import { get } from "lodash";
import classNames from "classnames";

const EditProfile = ({ close, profile }) => {
  const [name, setName] = useState(profile.name || "");
  const [description, setDescription] = useState(profile.description || "");
  const [saving, setSaving] = useState("Save Changes");
  const modal = useRef(null);
  const form = useRef(null);
  useOnClickOutside(modal, close);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving !== "Save Changes") return;
    const { avatar, instagram, twitter, youtube, discord } = form.current;
    if (name.length > 16) return;
    if (description.length > 255) return;
    const dict = [];
    if (instagram.value)
      dict.push({ key: "instagram", value: instagram.value });
    if (twitter.value) dict.push({ key: "twitter", value: twitter.value });
    if (youtube.value) dict.push({ key: "youtube", value: youtube.value });
    if (discord.value) dict.push({ key: "discord", value: discord.value });
    if (profile.uuid) {
      await tx(
        [
          fcl.transaction(profileChange),
          fcl.args([
            fcl.arg(name, t.String),
            fcl.arg(description, t.String),
            fcl.arg(avatar.value, t.String),
            fcl.arg(dict, t.Dictionary({ key: t.String, value: t.String })),
          ]),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(9999),
        ],
        {
          onStart() {
            setSaving("Saving");
          },
          onSubmission() {
            setSaving("Saving");
          },
          async onSuccess(status) {
            setSaving("Saved");
            const event = new Event("refetch");
            document.dispatchEvent(event);
            setTimeout(close, 1000);
          },
          async onError(error) {
            setSaving("Save Changes");
            console.log(error);
          },
        }
      );
    } else {
      try {
        await tx(
          [
            fcl.transaction(profileEdit),
            fcl.args([
              fcl.arg(name, t.String),
              fcl.arg(description, t.String),
              fcl.arg(avatar.value, t.String),
              fcl.arg(dict, t.Dictionary({ key: t.String, value: t.String })),
            ]),
            fcl.proposer(fcl.currentUser().authorization),
            fcl.payer(fcl.currentUser().authorization),
            fcl.authorizations([fcl.currentUser().authorization]),
            fcl.limit(9999),
          ],
          {
            onStart() {
              setSaving("Saving");
            },
            onSubmission() {
              setSaving("Saving");
            },
            async onSuccess(status) {
              setSaving("Saved");
              const event = new Event("refetch");
              document.dispatchEvent(event);
              setTimeout(close, 1000);
            },
            async onError(error) {
              console.log(error);
            },
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="fixed flex h-screen items-center justify-center left-0 top-0 w-screen z-50 py-12">
      <div className="absolute bg-black-600 bg-opacity-90 h-full left-0 top-0 w-full" />
      <div
        ref={modal}
        className="bg-cream-500 flex flex-col items-center px-6 sm:px-20 py-8 rounded-2xl w-full max-w-md z-10 modal-scroll"
      >
        <div className="relative w-16 h-16">
          {profile.avatar ? (
            <img className="w-full h-full object-cover" src={profile.avatar} />
          ) : (
            <Person />
          )}
        </div>
        <h2 className="font-black font-inktrap mt-4 text-2xl">Edit profile</h2>
        <form className="w-full" ref={form} onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="standard-label">Name</label>
            <input
              type="text"
              name="name"
              className="standard-input"
              placeholder="Enter your name"
              defaultValue={profile.name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <span
              className={classNames("block font-bold text-right text-xs", {
                "text-red": name.length > 16,
              })}
            >
              {name.length}/16
            </span>
          </div>
          {/* <div className="form-group">
            <label className="standard-label">Username</label>
            <div className="flex items-stretch">
              <div className="bg-cream-600 flex font-bold items-center justify-center rounded-l text-lg w-10">
                @
              </div>
              <input
                type="text"
                name="username"
                className="standard-input no-border-input"
                placeholder="Enter a username"
              />
            </div>
            <span className="block mt-1 text-xs">
              Choose a username that publicly links to your profile.
            </span>
          </div> */}
          <div className="form-group">
            <label className="standard-label">Biography</label>
            <input
              type="text"
              name="description"
              className="standard-input"
              placeholder="Enter your short biography"
              defaultValue={profile.description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
            <span
              className={classNames("block font-bold text-right text-xs", {
                "text-red": description.length > 255,
              })}
            >
              {description.length}/255
            </span>
          </div>
          <div className="form-group">
            <label className="standard-label">Avatar URL</label>
            <input
              type="text"
              name="avatar"
              className="standard-input"
              placeholder="Enter a link to your avatar image"
              defaultValue={profile.avatar}
            />
          </div>
          <div className="form-group">
            <label className="standard-label">
              Add links to your social media profiles
            </label>
            <div className="flex items-stretch mb-2">
              <div className="bg-cream-600 flex font-bold items-center px-2 rounded-l text-sm w-48">
                <Instagram className="w-5 mr-2" /> Instagram
              </div>
              <input
                type="link"
                name="instagram"
                className="standard-input no-border-input"
                placeholder="Profile URL"
                defaultValue={get(profile, "links.instagram.url")}
              />
            </div>
            <div className="flex items-stretch mb-2">
              <div className="bg-cream-600 flex font-bold items-center px-2 rounded-l text-sm w-48">
                <Twitter className="w-5 mr-2" /> Twitter
              </div>
              <input
                type="link"
                name="twitter"
                className="standard-input no-border-input"
                placeholder="Profile URL"
                defaultValue={get(profile, "links.twitter.url")}
              />
            </div>
            <div className="flex items-stretch mb-2">
              <div className="bg-cream-600 flex font-bold items-center px-2 rounded-l text-sm w-48">
                <Youtube className="w-5 mr-2" /> Youtube
              </div>
              <input
                type="link"
                name="youtube"
                className="standard-input no-border-input"
                placeholder="Channel URL"
                defaultValue={get(profile, "links.youtube.url")}
              />
            </div>
            <div className="flex items-stretch">
              <div className="bg-cream-600 flex font-bold items-center px-2 rounded-l text-sm w-48">
                <Discord className="w-5 mr-2" /> Discord
              </div>
              <input
                type="link"
                name="discord"
                className="standard-input no-border-input"
                placeholder="Include #Code"
                defaultValue={get(profile, "links.discord.url")}
              />
            </div>
          </div>

          <div className="flex justify-between mt-6 w-full">
            <ArrowButton text={saving} onClick={handleSubmit} />
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
