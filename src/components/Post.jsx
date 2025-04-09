import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { durationSinceCreated } from "../utils/Dsc";
import { Link } from "react-router-dom";
import useGetUserProfileByUserId from "../hooks/useGetUserProfileByUserId";
import ShowPostComments from "../utils/ShowPostComments";
import useCommentPost from "../hooks/useCommentPost";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import useLikeAndUnlikePost from "../hooks/useLikeAndUnlikePost";

const Post = ({ post }) => {
    const { createdAt, caption, id, imageUrl } = post;

    const { userProfile, isLoading } = useGetUserProfileByUserId(post.createdBy);
    const { isCommenting, isDeletingComment, handleCommentPost, handleDeleteComment } = useCommentPost();
    const { isLiking, handleLikePost, handleUnlikePost } = useLikeAndUnlikePost();

    const [bookmarked, setBookmarked] = useState(false);
    const [newComment, setNewComment] = useState("");

    const authUser = useSelector(selectUser);

    const posts = useSelector((state) => state.posts.posts);
    const currentPost = posts.find((p) => p.id === id) || { comments: [], likes: [] };
    const { comments, likes } = currentPost;

    const isLikedByUser = likes.some(like => like.likedBy === authUser?.uid);

    const handleLikeToggle = () => {
        if (isLikedByUser) {
            handleUnlikePost(id, authUser);
        } else {
            handleLikePost(id, authUser);
        }
    };

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
    };

    const handleCommentAdd = () => {
        if (!authUser) {
            console.log("Only authenticated users can add comments.");
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
        <div className="py-1 px-3">
            <div className="brounded-md mb-2 border-b-2 border-gray-300">
                <div className="flex items-center sm:px-0 md:px-4 lg:px-4 xl:px-4 py-2 ml-1">
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                    ) : (
                        <div className="rounded-full overflow-hidden mr-2">
                            <img
                                loading="lazy"
                                src={userProfile?.profilePicUrl}
                                alt={userProfile?.username}
                                className="h-9 w-9 rounded-full object-cover border-2 border-pink-500"
                            />
                        </div>)}
                    <div>
                        <Link
                            to={`/user/${userProfile?.username}`}
                            className="text-sm font-semibold hover:text-gray-700"
                        >
                            {userProfile?.username}
                        </Link>
                        <span className="text-xs text-gray-700 md:font-bold ml-1"> • {durationSinceCreated(createdAt)}</span>
                    </div>
                    <div className="flex-grow"></div>
                    <span className="text-xs text-gray-700 md:font-bold mr-1"> ••• </span>
                </div>

                <div className={`mb-2 sm:px-0 md:px-4 lg:px-4 xl:px-4`}>
                    <div className="flex h-[370px] md:h-[440px] lg:h-[460px] xl:h-[500px]" style={{ maxWidth: '530px' }}>
                        <img
                            loading="lazy"
                            src={imageUrl}
                            alt="Post"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="flex justify-between px-3.5 mb-1">
                    <div className="flex items-center space-x-2">
                        <button onClick={handleLikeToggle} disabled={isLiking}>
                            {isLikedByUser ? (
                                <AiFillHeart className="text-red-500 hover:text-red-600" size="1.8rem" />
                            ) : (
                                <AiOutlineHeart size="1.8rem" />
                            )}
                        </button>
                        <button>
                            <svg aria-label="Comment" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                        </button>
                        <button>
                            <svg height="24" viewBox="0 0 48 48" width="24">
                                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                            </svg>
                        </button>

                    </div>
                    <button onClick={handleBookmark}>
                        {bookmarked ? (
                            <FaBookmark size="1.6rem" className="text-black" />
                        ) : (
                            <FaRegBookmark size="1.6rem" />
                        )}
                    </button>
                </div>

                <div className="px-3.5 my-1.5 text-sm ">
                    <span className="font-semibold">{likes.length} likes</span>
                </div>

                <div className="px-3.5 text-sm my-1.5">
                    <span className="font-semibold mr-1">{userProfile?.username}</span>
                    <span>{caption}</span>
                </div>

                <div className="text-sm my-1 px-3.5">
                    <ShowPostComments
                        comments={comments}
                        userProfile={userProfile}
                        authUser={authUser}
                        handleDeleteComment={handleDeleteComment}
                        isDeletingComment={isDeletingComment}
                    />
                </div>

                <div className="flex items-center mt-2 px-3.5">
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
            </div>
        </div>
    );
};

export default Post;
