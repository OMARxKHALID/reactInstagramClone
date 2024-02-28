import React from "react";
import useGetUserStories from "../hooks/useGetUserStories";
import { selectUser } from "../redux/authSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Stories = () => {
  const { stories, isLoading } = useGetUserStories();
  const authUser = useSelector(selectUser);

  if (isLoading || !authUser || authUser.following.length === 0) {
    return (
      <div className="animate-spin rounded-full border-b-2 border-blue-700"></div>
    );
  }

  return (
    <div className="border-b-2 border-gray-100 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-lg xl:max-w-xl mt-16 py-2 px-2 h-24 overflow-x-auto overflow-y-hidden no-scrollbar">
      <div className="flex items-center">
        {stories.map((story) => (
          <Link key={story.uid} to={`/user/${story.username}`}>
            <div className="flex flex-col items-center mr-4">
              <div>
                <img
                  loading="lazy"
                  src={story.profilePicUrl}
                  alt={story.username}
                  className="w-14 h-14 rounded-full object-cover border-2 border-pink-500"
                />
              </div>
              <div className="mt-1 text-xs text-center md:text-left">
                {story.username}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Stories;
