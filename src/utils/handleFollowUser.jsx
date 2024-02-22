import { useState } from "react"; // Import useState from React
import { useSelector, useDispatch } from "react-redux";
import { firestore } from "../firebase/Firebase";
import { selectUser, setUser } from "../redux/authSlice";
import { arrayRemove, arrayUnion, updateDoc, doc } from "firebase/firestore";
import { setUserProfile, selectUserProfile } from "../redux/userProfileSlice";

export const useFollowUser = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(selectUser);
  const userProfile = useSelector(selectUserProfile);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleFollowUser = async (userId) => {
    try {
      dispatch(setIsUpdating(true));
      const currentUserRef = doc(firestore, "users", authUser.uid);
      const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
      });

      await updateDoc(userToFollowOrUnfollowRef, {
        followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
      });

      // Dispatch actions to update Redux store
      if (isFollowing) {
        dispatch(setUser({
          ...authUser,
          following: authUser.following.filter(uid => uid !== userId)
        }));

        dispatch(setUserProfile({
          ...userProfile,
          followers: userProfile.followers.filter(uid => uid !== authUser.uid)
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsUpdating(false));
    }
  };

  return { isUpdating, isFollowing, handleFollowUser }; // Return values outside the function
};
