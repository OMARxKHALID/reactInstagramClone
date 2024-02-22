import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  setUserProfile,
  selectUserProfile,
  fetchUserProfileByUsername,
  setError,
  setEditing,
} from "../redux/userProfileSlice";
import { selectUser, setUser, setIsUpdating } from "../redux/authSlice";
import { storage, firestore } from "../firebase/Firebase";
import { useNavigate, useParams } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import LoadingSpinner from "../utils/loadingSpinner";
import { arrayRemove, arrayUnion } from "firebase/firestore";

const ProfileHeader = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile, loading, error, isEditing } =
    useSelector(selectUserProfile);
  const [selectedImage, setSelectedImage] = useState(null);
  const authUser = useSelector(selectUser);
  const [isFollowing, setIsFollowing] = useState(false);
  const isUpdating = useSelector((state) => state.auth.isUpdating);
  useEffect(() => {
    dispatch(fetchUserProfileByUsername(username));
  }, [dispatch, username]);

  useEffect(() => {
    const fetchFollowingStatus = async () => {
      if (authUser && userProfile) {
        const userDocRef = doc(firestore, "users", authUser.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setIsFollowing(userData.following.includes(userProfile.uid));
        }
      }
    };

    fetchFollowingStatus();
  }, [authUser, userProfile]);

  const handleSaveProfile = async (updatedProfile) => {
    try {
      let imageUrl = userProfile.profilePicUrl;

      if (selectedImage) {
        const storageRef = ref(storage, `profilePics/${userProfile.uid}`);
        await uploadString(storageRef, selectedImage, "data_url");
        imageUrl = await getDownloadURL(
          ref(storage, `profilePics/${userProfile.uid}`)
        );
      }

      const updatedUserProfile = { ...updatedProfile, profilePicUrl: imageUrl };

      const userDocRef = doc(firestore, "users", userProfile.uid);
      await updateDoc(userDocRef, updatedUserProfile);

      dispatch(setUserProfile(updatedUserProfile));
      dispatch(setUser(updatedUserProfile));

      dispatch(setEditing(!isEditing));
    } catch (error) {
      console.error("Error while updating profile:", error);
      dispatch(setError(error.message));
    }
  };

  const toggleEditModal = () => {
    dispatch(setEditing(!isEditing));
  };

  const handleImageChange = (imageDataUrl) => {
    setSelectedImage(imageDataUrl);
  };

  if (error) {
    dispatch(setError(error));
    navigate("/");
    return null;
  }

  const handleFollowUser = async () => {
    try {
      dispatch(setIsUpdating(true));
      const currentUserRef = doc(firestore, "users", authUser.uid);
      const userToFollowOrUnfollowRef = doc(
        firestore,
        "users",
        userProfile.uid
      );

      let followingAction;
      let followersAction;
      let newIsFollowing;

      if (isFollowing) {
        followingAction = arrayRemove(userProfile.uid);
        followersAction = arrayRemove(authUser.uid);
        newIsFollowing = false;
      } else {
        followingAction = arrayUnion(userProfile.uid);
        followersAction = arrayUnion(authUser.uid);
        newIsFollowing = true;
      }

      await updateDoc(currentUserRef, { following: followingAction });
      await updateDoc(userToFollowOrUnfollowRef, {
        followers: followersAction,
      });

      setIsFollowing(newIsFollowing);
      dispatch(
        setUser({
          ...authUser,
          following: newIsFollowing
            ? [...authUser.following, userProfile.uid]
            : authUser.following.filter((uid) => uid !== userProfile.uid),
        })
      );
      dispatch(
        setUserProfile({
          ...userProfile,
          followers: newIsFollowing
            ? [...userProfile.followers, authUser.uid]
            : userProfile.followers.filter((uid) => uid !== authUser.uid),
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsUpdating(false));
      console.log("Done following");
    }
  };

  const { fullname, bio, profilePicUrl, posts, followers, following, uid } =
    userProfile;
  const postsCount = posts ? Object.keys(posts).length : 0;
  const followersCount = followers ? Object.keys(followers).length : 0;
  const followingCount = following ? Object.keys(following).length : 0;
  const isOwner = authUser && authUser.uid === uid;

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
                  alt="profil"
                  src={
                    profilePicUrl ||
                    "https://via.placeholder.com/150"
                  }
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

                      <a
                        className="p-1 ml-2 text-gray-700 border-transparent rounded-full cursor-pointfocus:outline-none focus:text-gray-600"
                        aria-label="Notifications"
                      >
                        <svg
                          className="w-4 h-4 sm:w-8 sm:h-8"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </a>
                    </>
                  ) : (
                    <button
                    className="flex items-center text-sm font-semibold py-2 px-7 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    disabled={isUpdating}
                    onClick={handleFollowUser}
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
