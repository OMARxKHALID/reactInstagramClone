import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { durationSinceCreated } from "../utils/Dsc";
import useCreatePost from "../hooks/useCreatePost";
import MiniProfile from "../utils/MiniProfile";
import useCommentPost from "../hooks/useCommentPost";
import useGetUserProfileByUserId from "../hooks/useGetUserProfileByUserId";
import ShowComments from "../utils/ShowComments";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import useLikeAndUnlikePost from "../hooks/useLikeAndUnlikePost";

const ViewPostModal = ({ post, onClose }) => {
    const { id, createdAt, caption, imageUrl } = post;

    const { isDeleting, handleDeletePost } = useCreatePost();
    const { isCommenting, isDeletingComment, handleCommentPost, handleDeleteComment } = useCommentPost();
    const { isLiking, handleLikePost, handleUnlikePost } = useLikeAndUnlikePost();
    const { isLoading, userProfile } = useGetUserProfileByUserId(post.createdBy);

    const [newComment, setNewComment] = useState("");
    const [bookmarked, setBookmarked] = useState(false);

    const authUser = useSelector(selectUser);

    const comments = useSelector((state) => state.posts.posts.find((p) => p.id === id)?.comments) || []; // instead deconstruct from post array
    const likes = useSelector((state) => state.posts.posts.find((p) => p.id === id)?.likes) || []; // instead deconstruct from post array
    const isLikedByUser = likes.some(like => like.likedBy === authUser?.uid);

    const handleLikeToggle = () => {
        if (isLikedByUser) {
            handleUnlikePost(id, authUser);
        } else {
            handleLikePost(id, authUser);
        }
    };

    const handleBookmarkToggle = () => {
        setBookmarked(!bookmarked);
    };

    const handleCommentAdd = () => {
    if (!authUser) {
        console.log("Only authenticated users can add comments."); // dispatch these errors in post slice also you can show them on the UI
        return;
    }
    if (!newComment.trim()) {
        console.log("Comment cannot be empty.");
        return;
    }
    if (isCommenting) {
        console.log("Comment is being posted. Please wait.");
        return;
    }
    handleCommentPost(id, newComment);
    setNewComment("");
};

    return (
        <div className="fixed inset-0 flex gap-2 px-4 md:px-10 lg:px-28 xl:px-28 justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-screen-lg mx-auto rounded-lg overflow-auto max-h-[89vh]">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-[370px] md:h-[440px] lg:h-[460px] xl:h-[500px] border-r-2 shadow-md">
                        <img
                            loading="lazy"
                            src={imageUrl}
                            alt="Post"
                            className="absolute inset-0 w-full h-full object-contain bg-zinc-50"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between">
                        <div>
                            <div className="mb-2 flex justify-between items-center">
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                                ) : (
                                    <MiniProfile userProfile={userProfile} />
                                )}
                                <div className="flex space-x-2">
                                    <button onClick={() => handleDeletePost(post, onClose)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                        {isDeleting ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                                        ) : (
                                            <MdDelete className="h-6 w-6" />
                                        )}
                                    </button>
                                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="p-1 border-t">
                                <span className="font-semibold">{userProfile?.username}</span>
                                <span className="text-sm mt-1 ml-1">{caption}</span>
                            </div>
                            <ShowComments
                                comments={comments}
                                userProfile={userProfile}
                                authUser={authUser}
                                handleDeleteComment={handleDeleteComment}
                                isDeletingComment={isDeletingComment}
                            />
                        </div>
                        <div className="border-t p-1">
                            <div className="flex justify-between mt-auto">
                                <div className="flex items-center space-x-2">
                                    <button onClick={handleLikeToggle} disabled={isLiking}>
                                        {isLikedByUser ? (
                                            <AiFillHeart className="text-red-500 hover:text-red-600" size="1.8rem" />
                                        ) : (
                                            <AiOutlineHeart size="1.8rem" className="text-black" />
                                        )}
                                    </button>
                                    <button>
                                        <svg aria-label="Comment" fill="currentColor" height="25" viewBox="0 0 24 24" width="25">
                                            <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                                        </svg>
                                    </button>
                                    <button>
                                        <svg height="25" viewBox="0 0 48 48" width="25">
                                            <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <button onClick={handleBookmarkToggle}>
                                    {bookmarked ? (
                                        <FaBookmark size="1.8rem" />
                                    ) : (
                                        <FaRegBookmark size="1.8rem" className="text-black" />
                                    )}
                                </button>
                            </div>
                            <div className="font-semibold m-1">{likes.length} likes</div>
                            <span className="text-sm ml-1 -m-1 text-gray-500 block">{durationSinceCreated(createdAt)}</span>
                            {authUser && (
                                <div className="flex items-center mt-2">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Add a comment..."
                                        className="border-gray-400 rounded-md px-2 py-1 flex-grow focus:outline-none"
                                    />
                                    <button onClick={handleCommentAdd} disabled={isCommenting} className="ml-2 px-2 font-semibold text-blue-500 hover:text-blue-700 focus:outline-none">
                                        {isCommenting ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                                        ) : (
                                            "Post"
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPostModal;
