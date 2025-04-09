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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg w-full max-w-md mx-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Search User</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Enter username"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-1 bg-blue-500 text-white text-center font-semibold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {searching ? (
              <div className="animate-spin rounded-full h-4 w-4 mx-4 my-1 border-b-2 "></div>
            ) : (
              "Search"
            )}
          </button>
        </div>
        {userProfile && !searching && (
          <div className="flex items-center mb-4">
            <Link to={`/user/${userProfile.username}`}>
              <>
                <div className="rounded-full overflow-hidden mr-2">
                  <img
                    loading="lazy"
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
      </div>
    </div>
  );
};

export default SearchUserModal;
