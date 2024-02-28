import { useState } from 'react';
import { selectUser, setError } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { arrayUnion, arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';
import { addComment, removeComment, setFeedPosts } from '../redux/postsSlice'; 

const useCommentPost = () => {
    const [isCommenting, setIsCommenting] = useState(false);
    const [isDeletingComment, setIsDeletingComment] = useState(false);
    const authUser = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleCommentPost = async (postId, comment) => {
        if (isCommenting) return;
        if (!authUser) return dispatch(setError("Please login to comment"));
        setIsCommenting(true);

        try {
            const newComment = {
                id: commentId(),
                comment: comment,
                createdBy: authUser.uid,
                createdAt: Date.now(),
                postId: postId
            };

            const postRef = doc(firestore, "posts", postId);
            await updatePostComments(postRef, newComment);
            dispatch(addComment({ postId, comment: newComment }));

        } catch (error) {
            dispatch(setError("Error adding comment: " + error.message));
        } finally {
            setIsCommenting(false);
        }
    };

    const handleDeleteComment = async (postId, comment) => {
        if (isDeletingComment) return;
        if (!authUser) return dispatch(setError("Please login to delete comment"));
        setIsDeletingComment(true);

        try {
            const postRef = doc(firestore, "posts", postId);
            await deleteComment(postRef, comment);
            dispatch(removeComment({ postId, comment }));

        } catch (error) {
            dispatch(setError("Error deleting comment: " + error.message));
        } finally {
            setIsDeletingComment(false);
        }
    };

    const commentId = () => {
        return Math.floor(Math.random() * 100000000000000);
    };

    const updatePostComments = async (postRef, newComment) => {
        await updateDoc(postRef, {
            comments: arrayUnion(newComment)
        });
    };

    const deleteComment = async (postRef, comment) => {
        await updateDoc(postRef, {
            comments: arrayRemove(comment)
        });
    };

    return { isCommenting, isDeletingComment, handleCommentPost, handleDeleteComment };
};

export default useCommentPost;
