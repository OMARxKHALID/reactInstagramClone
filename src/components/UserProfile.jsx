import React from "react";
import ProfileHeader from "./ProfileHeader";
import UserPosts from "./UserPosts";
import MiddleHeader from "./MiddleHeader";

const UserProfile = () => {
  return (
    <div>
      <ProfileHeader />
      <MiddleHeader />
      <UserPosts />
    </div>
  );
};

export default UserProfile;
