import { useState } from 'react';
import { selectUser, setError } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { arrayUnion, arrayRemove, doc, updateDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';
import { addComment, removeComment, setPosts } from '../redux/postsSlice';

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
                comment: comment,
                createdBy: authUser.uid,
                createdAt: new Date(),
                postId: postId
            };
            await updateDoc(doc(firestore, "posts", postId), {
                comments: arrayUnion(newComment)
            });
            dispatch(addComment({ postId, comment: newComment }));

        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            setIsCommenting(false);
        }
    };

   const HandleDeleteComment = async (postId, comment) => {
    if (isDeletingComment) return;
    if (!authUser) return dispatch(setError("Please login to delete comment"));
    setIsDeletingComment(true);
    try {
        const postRef = doc(firestore, "posts", postId);
        const postDoc = await getDoc(postRef);
        const post = postDoc.data();
        const commentIndex = post.comments.findIndex(c => c.createdBy === comment.createdBy);

        console.log('Comments before deletion:', post.comments); 

        if (commentIndex !== -1) {
            const removedComment = post.comments[commentIndex];
            await updateDoc(postRef, {
                comments: arrayRemove(removedComment)
            });
            dispatch(removeComment({ postId, comment: removedComment }));

            console.log('Comment removed:', removedComment); 
        }

        const updatedPostDoc = await getDoc(postRef);
        const updatedPost = updatedPostDoc.data();
        // dispatch(setPosts([updatedPost]));
        console.log('Comments after deletion:', updatedPost.comments); 
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        setIsDeletingComment(false);
    }
};
    return { isCommenting, isDeletingComment, handleCommentPost, HandleDeleteComment };
};

export default useCommentPost;
