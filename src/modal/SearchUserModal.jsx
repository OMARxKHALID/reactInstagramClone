import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfileByUsername,
  selectUserProfile,
  clearUserProfile,
} from "../redux/userProfileSlice";
import useFollowAndUnfollowUser from "../hooks/useFollowAndUnfollowUser";
import { Link } from "react-router-dom";

const SearchUserModal = ({ onClose }) => {
  const [searchUsername, setSearchUsername] = useState("");
  const [searching, setSearching] = useState(false);
  const dispatch = useDispatch();
  const { userProfile, error } = useSelector(selectUserProfile);
  const authUser = useSelector((state) => state.auth.user);

  const { isFollowing, followOrUnfollowUser } =
    useFollowAndUnfollowUser(userProfile);

  const handleSearch = () => {
    setSearching(true);
    dispatch(clearUserProfile());
    dispatch(fetchUserProfileByUsername(searchUsername)).then(() => {
      setSearching(false);
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-xl z-50 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Search User</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Enter username"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Search
          </button>
        </div>
        {userProfile && !searching && (
          <div className="flex items-center mb-4">
            <Link to={`/user/${userProfile.username}`}>
              <>
                <div className="rounded-full overflow-hidden mr-2">
                  <img
                    src={
                      userProfile.profilePicUrl
                        ? userProfile.profilePicUrl
                        : "https://i.pinimg.com/736x/42/d4/0a/42d40a5d647a714bc53c018c84d26274.jpg"
                    }
                    alt={userProfile.username}
                    className="h-12 w-12 rounded-full object-cover border-2 border-pink-500"
                  />
                </div>
              </>
            </Link>

            <div>
              <p className="text-sm font-semibold">{userProfile.username}</p>
              <p className="text-sm -mt-1 text-gray-500 block">
                {userProfile.fullname}
              </p>
            </div>
            {authUser.username !== userProfile.username && (
              <div className="ml-auto">
                <button
                  onClick={followOrUnfollowUser}
                  className="text-sm font-semibold text-blue-600"
                >
                  {isFollowing ? "Unfollow" : "follow"}
                </button>
              </div>
            )}
          </div>
        )}
        {error && !searching && (
          <p className="text-center text-red-500">{error}</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchUserModal;
