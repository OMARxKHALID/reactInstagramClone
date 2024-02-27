import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { setError, setFeedPosts} from '../redux/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../firebase/Firebase';
import { selectUser } from '../redux/authSlice';

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const authUser = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const getFeedPosts = async () => {
            setIsLoading(true);

            if (authUser.following.length === 0) {
                setIsLoading(false);
                setPosts([]);
                return;
            }

            const q = query(
                collection(firestore, 'posts'),
                where('createdBy', 'in', authUser.following)
             );

            try {
                const postsSnapshot = await getDocs(q);
                const feedPost = [];

                postsSnapshot.forEach((doc) => {
                    feedPost.push({ ...doc.data(), id: doc.id });
                });

                feedPost.sort((a, b) => b.createdAt - a.createdAt);

                setPosts(feedPost);
                dispatch(setFeedPosts(feedPost));
            } catch (error) {
                dispatch(setError(error.message));
            } finally {
                setIsLoading(false);
            }
        };

        if (authUser) {
            getFeedPosts();
        }
    }, [authUser, dispatch, setPosts, selectUser]);

    return { posts, isLoading };
};

export default useGetFeedPosts;