import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { selectUser } from '../redux/authSlice';
import { firestore } from '../firebase/Firebase';
import { addLike, removeLike, setError } from '../redux/postsSlice';

const useLikeAndUnlikePost = () => {
    const [isLiking, setIsLiking] = useState(false);
    const authUser = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleLikeOrUnlikePost = async (postId, user, action) => {
        setIsLiking(true); 
        try {
            if (isLiking || !authUser) return;

            const postRef = doc(firestore, 'posts', postId);
            const postDoc = await getDoc(postRef);
            const post = postDoc.data();

            const newLike = { likedBy: user.uid, createdAt: Date.now() };

            if (action === 'like') {
                await updateDoc(postRef, { likes: arrayUnion(newLike) });
                dispatch(addLike({ postId, like: newLike }));
            } else if (action === 'unlike') {
                const likeIndex = post.likes.findIndex(like => like.likedBy === user.uid);
                if (likeIndex !== -1) {
                    const unLike = post.likes[likeIndex];
                    await updateDoc(postRef, { likes: arrayRemove(unLike) });
                    dispatch(removeLike({ postId, like: unLike }));
                }
            }
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            setIsLiking(false);
        }
    };

    const handleLikePost = async (postId, user) => {
        await handleLikeOrUnlikePost(postId, user, 'like'); 
    };

    const handleUnlikePost = async (postId, user) => {
        await handleLikeOrUnlikePost(postId, user, 'unlike'); 
    };

    return { isLiking, handleLikePost, handleUnlikePost };
};

export default useLikeAndUnlikePost;
