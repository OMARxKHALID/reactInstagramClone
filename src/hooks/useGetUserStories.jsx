import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/authSlice';
import { getDocs, query, collection, where } from 'firebase/firestore'; 
import { firestore } from '../firebase/Firebase';
import { setError, setUserProfileStories } from '../redux/userProfileSlice';

const useGetUserStories = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [stories, setStories] = useState([]);
    const authUser = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUserStories = async () => {
            if (!authUser || authUser.following.length === 0) {
                setIsLoading(false);
                setStories([]);
                return;
            }
            setIsLoading(true);
            try {
                const q = query(
                    collection(firestore, 'users'),
                    where('uid', 'in', authUser.following)
                );
                const userSnapShot = await getDocs(q);
                const users = [];
                userSnapShot.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id });
                });
                setStories(users);
                dispatch(setUserProfileStories(users));
                setIsLoading(false);
            } catch (error) {
                dispatch(setError(error.message));
            } finally {
                setIsLoading(false);
            }
        };

        if (authUser) {
            getUserStories();
        }
    }, [authUser, dispatch]);

    return { stories, isLoading };
};

export default useGetUserStories;
