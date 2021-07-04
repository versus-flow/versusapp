import React, { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import ProfileSummary from "./ProfileSummary";
import DropTabs from "../drop/DropTabs";
import { fetchProfile } from "../../pages/profile/[name]";

const ProfileWrapper = ({ self, user }) => {
  useEffect(async () => {
    if (self && user) {
      const profile = await fetchProfile(user.addr);
      console.log(profile);
    }
  }, [self, user]);
  return (
    <>
      <ProfileSummary />
      <DropTabs />
    </>
  );
};

export default ProfileWrapper;
