import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  setUserProfile,
  selectUserProfile,
  fetchUserProfileByUsername,
  setError,
  clearUserProfile,
  setEditing,
} from "../redux/userProfileSlice";
import { selectUser } from "../redux/authSlice";
import LoadingSpinner from "../utils/loadingSpinner";
import useFollowAndUnfollowUser from "../hooks/useFollowAndUnfollowUser";
import EditProfileModal from "../modal/EditProfileModal";
import useSaveProfile from "../hooks/useSaveProfile";

const ProfileHeader = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile, loading, error, isEditing } =
    useSelector(selectUserProfile);
  const authUser = useSelector(selectUser);
  const { isFollowing, followOrUnfollowUser } =
    useFollowAndUnfollowUser(userProfile);
  const isUpdating = useSelector((state) => state.auth.isUpdating);
  const [selectedImage, setSelectedImage] = useState(null);

  const { handleSaveProfile, isLoading } = useSaveProfile(selectedImage, userProfile, dispatch, isEditing);

  const fetchProfile = useCallback(() => {
    setUserProfile(null);
    dispatch(fetchUserProfileByUsername(username));
  }, [dispatch, username]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const toggleEditModal = useCallback(() => {
    dispatch(setEditing(!isEditing));
  }, [dispatch, isEditing]);

  const handleImageChange = useCallback((imageDataUrl) => {
    setSelectedImage(imageDataUrl);
  }, []);

  useEffect(() => {
    if (error || userProfile === null) {
      dispatch(clearUserProfile());
      fetchProfile();
    }
  }, [dispatch, error, fetchProfile, userProfile]);

  useEffect(() => {
    if (error) {
      dispatch(setError(error));
      navigate("/");
    }
  }, [dispatch, error, navigate]);

  const { fullname, bio, profilePicUrl, posts, followers, following } = useMemo(
    () => userProfile || {},
    [userProfile]
  );
  const postsCount = useMemo(
    () => (posts ? Object.keys(posts).length : 0),
    [posts]
  );
  const followersCount = useMemo(
    () => (followers ? Object.keys(followers).length : 0),
    [followers]
  );
  const followingCount = useMemo(
    () => (following ? Object.keys(following).length : 0),
    [following]
  );
  const isOwner = useMemo(
    () => authUser && authUser.uid === userProfile?.uid,
    [authUser, userProfile]
  );

  return (
    <header className="w-full">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-screen-md px-10 py-6 mx-4 mt-12 bg-white rounded-lg shadow md:mx-auto border-1">
          <div className="flex flex-col items-start w-full m-auto sm:flex-row">
            <div className="flex mx-auto sm:mr-10 sm:m-0">
              <div className="items-center justify-center w-20 h-20 m-auto mr-4 sm:w-40 sm:h-40">
                <img
                  loading="lazy"
                  alt="profil"
                  src={profilePicUrl || "https://via.placeholder.com/150"}
                  className="object-cover w-20 h-20 mx-auto rounded-full sm:w-40 sm:h-40"
                />
              </div>
            </div>
            <div className="flex flex-col pt-4 mx-auto my-auto sm:pt-0 sm:mb-3 sm:mx-0">
              <div className="flex flex-col mx-auto sm:flex-row sm:mx-0 ">
                <h2 className="flex pr-4 text-xl font-light text-gray-900 sm:text-3xl">
                  {username}
                </h2>
                <div className="flex">
                  {isOwner ? (
                    <>
                      <button
                        className="flex items-center px-4 font-semibold rounded-md bg-gray-200 hover:bg-gray-300"
                        style={{ padding: "0 16px", fontSize: "13px" }}
                        onClick={toggleEditModal}
                      >
                        Edit profile
                      </button>
                    </>
                  ) : (
                    <button
                      className={`flex items-center px-4 font-semibold ${isFollowing
                          ? "bg-gray-200 hover:bg-gray-300 tex-black"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                        } rounded-md`}
                      style={{ padding: "0 16px", fontSize: "13px" }}
                      disabled={isUpdating}
                      onClick={followOrUnfollowUser}
                    >
                      {isUpdating ? (
                        <div className="loading-spinner flex item-center justify-center"></div>
                      ) : (
                        <>{isFollowing ? "Unfollow" : "Follow"}</>
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 space-x-2">
                <div className="flex">
                  <span className="mr-1 font-semibold">{postsCount}</span> Post
                </div>
                <div className="flex">
                  <span className="mr-1 font-semibold">{followersCount}</span>{" "}
                  Follower
                </div>
                <div className="flex">
                  <span className="mr-1 font-semibold">{followingCount}</span>{" "}
                  Following
                </div>
              </div>
              <div className="pt-1">
                <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">
                  {fullname}
                </h1>
                <p className="text-sm text-gray-500 md:text-base">Fotografer</p>
                <p className="text-sm text-gray-800 md:text-base">{bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <EditProfileModal
          userProfile={userProfile}
          onSave={handleSaveProfile}
          onClose={toggleEditModal}
          onImageChange={handleImageChange}
          selectedImage={selectedImage}
        />
      )}
    </header>
  );
};

export default ProfileHeader;
