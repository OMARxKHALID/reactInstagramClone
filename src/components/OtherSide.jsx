import React, { useState, useEffect } from "react";
import users from "../data/Users";
import { useSelector } from "react-redux";
import { auth } from "../firebase/Firebase";

const OtherSide = () => {
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [seeAll, setSeeAll] = useState(false);
  const [followingUsers, setFollowingUsers] = useState(new Set());
  const userData = useSelector((state) => state.auth.user);

  const toggleFollow = (userId) => {
    setFollowingUsers((prevUsers) => {
      const newFollowingUsers = new Set(prevUsers);
      if (newFollowingUsers.has(userId)) {
        newFollowingUsers.delete(userId);
      } else {
        newFollowingUsers.add(userId);
      }
      return newFollowingUsers;
    });
  };

  const handleSeeAll = () => {
    setSeeAll((prevSeeAll) => !prevSeeAll);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.matchMedia("(max-width: 900px)").matches);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMediumScreen) {
    return null;
  }

  const currentUser = userData;

  return (
    <div
      className="pl-4 right mt-16 p-4 max-w-xs"
      style={{ minWidth: "220px" }}
    >
      <div className="flex items-center mb-4">
        <div className="rounded-full overflow-hidden mr-2">
          <img
            src={
              currentUser.profilePicUrl
              ? currentUser.profilePicUrl
              : "https://i.pinimg.com/736x/42/d4/0a/42d40a5d647a714bc53c018c84d26274.jpg"
            }
            alt={currentUser.username}
            className="h-12 w-12 rounded-full object-cover border-2 border-pink-500"
          />
        </div>
        <div>
          <span className="text-sm font-semibold">{currentUser.username}</span>
          <span className="text-sm -mt-1 text-gray-500 block">
            {currentUser.fullname}
          </span>
        </div>
        <div className="flex flex-col ml-auto">
        <button onClick={() => auth.signOut()} className="text-sm font-semibold text-blue-600">Logout</button>
        </div>
      </div>
      <div>
        <div className="flex w-full justify-between text-sm">
          <div className="left">
            <h1 className="font-semibold text-gray-400">Suggestions For You</h1>
          </div>
          {users.length > 4 && (
            <div className="right">
              <button
                onClick={handleSeeAll}
                className="text-sm text-black font-semibold"
              >
                {seeAll ? "hide" : `See all`}
              </button>
            </div>
          )}
        </div>
        {users.slice(0, seeAll ? undefined : 5).map((user) => (
          <div
            key={user.id}
            className="mt-4 flex w-full justify-between items-center"
          >
            <div className="flex flex-row pl-2">
              <div className="h-10 w-10 rounded-full object-cover border-2 border-pink-500 overflow-hidden mr-2">
                <img alt={user.username} src={user.url} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{user.username}</span>
                <span className="text-xs text-gray-400">
                  Suggestions For You
                </span>
              </div>
            </div>
            <button
              onClick={() => toggleFollow(user.id)}
              className="text-blue-600 text-sm font-semibold"
            >
              {followingUsers.has(user.id) ? "unfollow" : "follow"}
            </button>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 mt-6 ml-2">
        © 2024 INSTAGRAM FROM META
      </div>
    </div>
  );
};

export default OtherSide;
