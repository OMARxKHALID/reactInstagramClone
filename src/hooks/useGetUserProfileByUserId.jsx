import { doc, getDoc } from "firebase/firestore";
import { setError } from "../redux/userProfileSlice";
import { useDispatch } from "react-redux";
import { firestore } from "../firebase/Firebase";
import { useState, useEffect } from "react";

const useGetUserProfileByUserId = (userId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);
            setUserProfile(null);
            try {
                const userRef = await getDoc(doc(firestore, "users", userId));
                if (userRef.exists()) {
                    const user = userRef.data();
                    setUserProfile(user);
                    console.log("fetched user", user);
                }
            } catch (error) {
                console.log(error);
                dispatch(setError(error.message));
            } finally {
                setIsLoading(false);
            }
        };

        getUserProfile(); 
    }, [dispatch,setUserProfile, userId]);

    return { userProfile,isLoading };
};

export default useGetUserProfileByUserId;
