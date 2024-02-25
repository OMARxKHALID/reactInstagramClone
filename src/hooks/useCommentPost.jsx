import { useState } from 'react'
import { selectUser, setError } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';
import { addComment } from '../redux/postsSlice'; 

const useCommentPost = () => {
    const [isCommenting, setIsCommenting] = useState(false);
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
            dispatch(addComment(postId, newComment));

        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            setIsCommenting(false);
        }

    }
    return { isCommenting, handleCommentPost }

}
export default useCommentPost;
