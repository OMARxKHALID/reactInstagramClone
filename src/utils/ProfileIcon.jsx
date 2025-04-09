import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";

const ProfileIcon = () => {
  const currentUser = useSelector(selectUser);

  return (
    <div>
      <div className="rounded-full overflow-hidden ">
        <img
          loading="lazy"
          src={currentUser.profilePicUrl}
          alt={currentUser.username}
          className="h-6 w-6 rounded-full object-cover border-2 border-black"
        />
      </div>
    </div>
  );
};

export default ProfileIcon;
