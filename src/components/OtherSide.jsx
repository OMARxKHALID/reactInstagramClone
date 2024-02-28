import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../firebase/Firebase";
import { Link } from "react-router-dom";
import useGetSuggestedUsers from "../hooks/useGetSuggestedUsers";
import useFollowAndUnfollowUser from "../hooks/useFollowAndUnfollowUser";
import LoadingSpinner from "../utils/loadingSpinner";

const SuggestedUser = ({ user }) => {
  const { isFollowing, followOrUnfollowUser } = useFollowAndUnfollowUser(user);

  return (
    <div className="mt-4 flex w-full justify-between items-center">
      <Link to={`/user/${user.username}`}>
        <div className="flex flex-row items-center pl-2">
          <div className="h-10 w-10 rounded-full object-cover border-2 border-pink-500 overflow-hidden mr-2">
            <img alt={user.username} src={user.profilePicUrl} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{user.username}</span>
            <span className="text-xs text-gray-400">suggested user</span>
          </div>
        </div>
      </Link>
      <button
        onClick={followOrUnfollowUser}
        className="text-sm font-semibold text-blue-600"
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

const OtherSide = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.matchMedia("(max-width: 1100px)").matches);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMediumScreen) return null;

  return (
    <div
      className="pl-4 right mt-16 p-4 max-w-xs"
      style={{ minWidth: "220px" }}
    >
      <div className="flex items-center mb-4">
        <div className="rounded-full overflow-hidden mr-2">
          <img
            loading="lazy"
            src={
              currentUser.profilePicUrl ||
              "https://i.pinimg.com/736x/42/d4/0a/42d40a5d647a714bc53c018c84d26274.jpg"
            }
            alt={currentUser.username}
            className="h-12 w-12 rounded-full object-cover border-2 border-pink-500"
          />
        </div>
        <div>
          <Link
            to={`/user/${currentUser.username}`}
            className="text-sm font-semibold"
          >
            {currentUser.username}
            <span className="text-sm -mt-1 text-gray-500 block">
              {currentUser.fullname}
            </span>
          </Link>

        </div>
        <div className="flex flex-col ml-auto">
          <button
            onClick={() => auth.signOut()}
            className="text-sm font-semibold text-blue-600"
          >
            Logout
          </button>
        </div>
      </div>
      <div>
        <div className="flex w-full justify-between text-sm">
          <div className="left">
            <h1 className="font-semibold text-gray-400">
              Suggestions For You
            </h1>
          </div>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : suggestedUsers.length > 0 ? (
          suggestedUsers.map((user) => (
            <SuggestedUser key={user.id} user={user} />
          ))
        ) : (
          <p className="text-sm ml-1 text-gray-400 mt-4">No suggested users found.</p>
        )}
      </div>
      <div className="text-xs  text-gray-400 mt-6 ml-2">
        © 2024 INSTAGRAM FROM META
      </div>
    </div>
  );
};

export default React.memo(OtherSide);
