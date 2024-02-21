import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";

const ProfileIcon = () => {
  const currentUser = useSelector(selectUser);

  return (
    <div>
      <div className="rounded-full overflow-hidden mr-2">
        <img
          src={currentUser.profilePicUrl}
          alt={currentUser.username}
          className="h-8 w-8 rounded-full object-cover border-2 border-black"
        />
      </div>
    </div>
  );
};

export default ProfileIcon;
