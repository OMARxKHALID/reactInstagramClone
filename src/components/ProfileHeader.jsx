import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";

const ProfileHeader = () => {
  const user = useSelector(selectUser);

  if (!user) {
    return null;
  }

  return (
    <div>
      <header className="flex flex-wrap items-center mt-6">
        <div className="md:w-3/12 w-3/12 md:ml-16">
          <img
            className=" rounded-full border-2 border-pink-600 p-1"
            src={user.profilePicture}
            alt="profile"
          />
        </div>
        <div className="w-8/12 md:w-7/12 ml-4">
          <div className="md:flex md:flex-wrap md:items-center mb-4">
            <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
              {user.username}
            </h2>
            <span
              className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2"
              aria-hidden="true"
            >
              <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
            </span>
            <a
              href="#"
              className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block block"
            >
              Follow
            </a>
          </div>
          <ul className="hidden md:flex space-x-8 mb-4">
            <li>
              <span className="font-semibold mr-1">6</span>
              posts
            </li>
            <li>
              <span className="font-semibold mr-1">
                {Object.keys(user.following).length}
              </span>
              followers
            </li>
            <li>
              <span className="font-semibold mr-1">
                {Object.keys(user.followers).length}
              </span>
              following
            </li>
          </ul>
          <div className="hidden md:block">
            <h1 className="font-semibold">{user.fullName}</h1>
            <span className="bioclass">{user.occupation}</span>
            <p>{user.bio}</p>
            <span>
              <strong>{user.website}</strong>
            </span>
          </div>
        </div>
        <div className="md:hidden text-sm my-2">
          <h1 className="font-semibold">{user.fullName}</h1>
          <span className="bioclass">{user.occupation}</span>
          <p>{user.bio}</p>
          <span>
            <strong>{user.website}</strong>
          </span>
        </div>
      </header>
      <ul className="flex md:hidden justify-around space-x-8 border-t text-center p-2 text-gray-600 leading-snug text-sm">
        <li>
          <span className="font-semibold text-gray-800 block">6</span>
          posts
        </li>
        <li>
          <span className="font-semibold text-gray-800 block">
            {Object.keys(user.following).length}
          </span>
          followers
        </li>
        <li>
          <span className="font-semibold text-gray-800 block">
            {Object.keys(user.followers).length}
          </span>
          following
        </li>
      </ul>
      <br />
      <br />
    </div>
  );
};

export default ProfileHeader;
