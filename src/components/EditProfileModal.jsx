import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfileByUsername,
  selectUserProfile,
  setLoading,
  setError,
} from "../redux/userProfileSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../utils/Loading";
import EditProfileModal from "./EditProfileModal"; // Assuming you've saved the EditProfileModal component in a separate file

const ProfileHeader = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile, loading, error } = useSelector(selectUserProfile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfileByUsername(username));
    dispatch(setLoading(false));
  }, [dispatch, username]);

  const handleSaveProfile = (updatedProfile) => {
    // Dispatch an action to save the updated profile
    console.log("Updated Profile:", updatedProfile);
  };

  const toggleEditModal = () => {
    setIsEditing(!isEditing);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    dispatch(setError(null));
    dispatch(setLoading(false));
    navigate("/");
    return null;
  }

  if (!userProfile) {
    return <div>No profile found</div>;
  }

  const { fullname, bio, profilePicUrl, posts, followers, following } =
    userProfile;
  const postsCount = posts ? Object.keys(posts).length : 0;
  const followersCount = followers ? Object.keys(followers).length : 0;
  const followingCount = following ? Object.keys(following).length : 0;

  return (
    <header className="flex flex-wrap items-center p-4 md:py-8">
      <div className="md:w-3/12 md:ml-16">
        <img
          className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1"
          src={
            profilePicUrl ||
            "https://i.pinimg.com/736x/42/d4/0a/42d40a5d647a714bc53c018c84d26274.jpg"
          }
          alt="profile"
        />
      </div>

      <div className="w-8/12 md:w-7/12 ml-4">
        <div className="md:flex md:flex-wrap md:items-center mb-4">
          <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
            {username}
          </h2>

          <span
            className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2"
            aria-hidden="true"
          >
            <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
          </span>

          <button
            className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block block"
            onClick={toggleEditModal}
          >
            Edit
          </button>
        </div>

        <ul className="hidden md:flex space-x-8 mb-4">
          <li>
            <span className="font-semibold">{postsCount}</span>
            posts
          </li>

          <li>
            <span className="font-semibold">{followersCount}</span>
            followers
          </li>
          <li>
            <span className="font-semibold">{followingCount}</span>
            following
          </li>
        </ul>

        <div className="hidden md:block">
          <h1 className="font-semibold">{fullname}</h1>
          <span>{bio}</span>
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </div>
      </div>
      <div className="md:hidden text-sm my-2">
        <h1 className="font-semibold">{fullname}</h1>
        <span>{bio}</span>
        <p>Lorem ipsum dolor sit amet consectetur</p>
      </div>

      {isEditing && (
        <EditProfileModal
          userProfile={userProfile}
          onSave={handleSaveProfile}
          onClose={toggleEditModal}
        />
      )}
    </header>
  );
};

export default ProfileHeader;
