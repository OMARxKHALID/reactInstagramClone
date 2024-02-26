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

    const handleLikePost = async (postId, user) => {
        if (isLiking) return;
        if (!authUser) return dispatch(setError("Please login to like"));
        setIsLiking(true);
        try {
            const postRef = doc(firestore, 'posts', postId);
            const postDoc = await getDoc(postRef);
            const post = postDoc.data();
            const newLike = {
                likedBy: user.uid,
                createdAt: Date.now()
            };
            const likeIds = post.likes.map(like => like.likedBy); 

            if (likeIds.includes(user.uid)) {
                await updateDoc(postRef, {
                    likes: arrayRemove(newLike) 
                });
            } else {
                await updateDoc(postRef, {
                    likes: arrayUnion(newLike)
                });
            }
            dispatch(addLike({ postId, like: newLike })); 
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            setIsLiking(false);
        }
    };

    const handleUnlikePost = async (postId, user) => {
        if (isLiking) return;
        if (!authUser) return dispatch(setError("Please login to unLike"));
        setIsLiking(true);
        try {
            const postRef = doc(firestore, 'posts', postId);
            const postDoc = await getDoc(postRef);
            const post = postDoc.data();
            const likeIndex = post.likes.findIndex(like => like.likedBy === user.uid);

            if (likeIndex !== -1) {
                const unLike = post.likes[likeIndex];
                await updateDoc(postRef, {
                    likes: arrayRemove(unLike)
                });
                dispatch(removeLike({ postId, like: unLike }));
            }
            
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            setIsLiking(false);
        }
    };


    return { isLiking, handleLikePost, handleUnlikePost };
};

export default useLikeAndUnlikePost;
