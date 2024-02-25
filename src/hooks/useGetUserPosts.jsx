import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setPosts, setIsLoading } from "../redux/postsSlice";
import { selectUserProfile } from "../redux/userProfileSlice";
import { firestore } from "../firebase/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useGetUserPosts = () => {
  const userProfileState = useSelector(selectUserProfile);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const userProfile = userProfileState.userProfile;

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) {
        dispatch(setIsLoading(false)); 
        dispatch(setPosts([])); 
        return;
      }
      dispatch(setIsLoading(true));
      try {
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "==", userProfile.uid)
        );
        const querySnapshot = await getDocs(q);

        const postsData = [];
        querySnapshot.forEach((doc) => {
          postsData.push({ ...doc.data(), id: doc.id });
        });

        postsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        dispatch(setPosts(postsData));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setIsLoading(false));
      }
    };
    getPosts();
  }, [dispatch, userProfile]);

  return { isLoading, posts };
};
