import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { setUserProfile } from "../redux/userProfileSlice";
import { selectUser, setIsUpdating, setUser } from "../redux/authSlice";
import { firestore } from "../firebase/Firebase";

const useFollowAndUnfollowUser = (userProfile) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useSelector(selectUser);
  const dispatch = useDispatch();

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

  const followOrUnfollowUser = async () => {
    dispatch(setIsUpdating(true));
    try {
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
    }
  };

  return { isFollowing, followOrUnfollowUser };
};

export default useFollowAndUnfollowUser;
