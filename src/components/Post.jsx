import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { durationSinceCreated } from "../utils/dsc";

const Post = ({ post }) => {
    const { created_at, user, caption, count, comments: initialComments } = post;

    const [readMore, setReadMore] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(count.liked_by);
    const [showAllComments, setShowAllComments] = useState(false);
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        setLikes(count.liked_by);
    }, [count]);

    const handleLikeToggle = () => {
        setLikes(liked ? likes - 1 : likes + 1);
        setLiked(!liked);
    };

    const handleBookmarkToggle = () => {
        setBookmarked(!bookmarked);
    };

    const handleCommentToggle = () => {
        setShowAllComments(!showAllComments);
    };

    const handleCommentAdd = () => {
        if (newComment.trim() !== "") {
            setComments([...comments, newComment]);
            setNewComment("");
        }
    };

    const handleReadMoreToggle = () => {
        setReadMore(!readMore);
    };

    const cardStyle = {
        maxWidth: '530px',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
    }
    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }


    const displayCaption = readMore ? caption : `${caption.substring(0, 50)}...`;

    return (
        <div className="py-1 px-3">
            <div className="bg-gray-50 rounded-md mb-2 border-b-2 border-gray-300  ">
                <div className="flex items-center sm:px-0 md:px-4 lg:px-4 xl:px-4 py-2">
                    <img
                        src={user && user.url}
                        alt={user.username}
                        className="w-9 h-9 rounded-full mr-2"
                    />
                    <div>
                        <a
                            href={`/user/${user.username}`}
                            className="text-sm font-semibold hover:text-gray-700"
                        >
                            {user.username}
                        </a>
                        <span className="text-xs text-gray-700 md:font-bold ml-1"> • {durationSinceCreated(created_at)}</span>
                    </div>
                    <div className="flex-grow"></div>
                    <span className="text-xs text-gray-700 md:font-bold "> ••• </span>
                </div>


                <div className="mb-2 sm:px-0 md:px-4 lg:px-4 xl:px-4" style={cardStyle}>
                    {post.images.map((image, index) => (
                        <img key={index} src={image.url} alt={`Image ${index}`} style={imageStyle} />
                    ))}
                </div>

                <div className="flex justify-between px-4 mb-1">
                    <div className="flex items-center">
                        <button onClick={handleLikeToggle} className="mr-4 ml-1">
                            {liked ? (
                                <AiFillHeart className="text-red-500 hover:text-red-600" size="1.8rem" />
                            ) : (
                                <AiOutlineHeart size="1.8rem" className="text-black" />
                            )}
                        </button>
                        <button onClick={handleCommentToggle} className="mr-4">
                            <svg aria-label="Comment" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                        </button>
                        <button>
                            <svg height="24" viewBox="0 0 48 48" width="24">
                                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                            </svg>
                        </button>
                    </div>
                    <button onClick={handleBookmarkToggle}>
                        {bookmarked ? (
                            <FaBookmark className="text-black" size="1.6rem" />
                        ) : (
                            <FaRegBookmark size="1.6rem" />
                        )}
                    </button>
                </div>

                <div className="px-4 mb-0.5">
                    <span className="font-semibold">{likes} likes</span>
                </div>

                <div className="px-4 mb-0.5">
                    <a href={`/user/${user.username}`} className="font-semibold hover:text-gray-700">{user.username}</a>
                    <span className="ml-1">{displayCaption}</span>
                    {!readMore && (
                        <button onClick={handleReadMoreToggle} className="text-gray-400 hover:text-gray-600 ml-1 focus:outline-none">more</button>
                    )}
                </div>

                <div className="px-4">
                    <ul className={`overflow-y-auto max-h-32 ${showAllComments ? 'max-h-none' : ''}`}>
                        {comments.slice(0, showAllComments ? undefined : 1).map((comment, index) => (
                            <li key={index} className="mb-1">
                                <span className="font-semibold">{user.username}</span> {comment}
                            </li>
                        ))}
                    </ul>

                    {comments.length > 1 && (<button onClick={handleCommentToggle} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                        {showAllComments ? 'Hide Comments' : `View ${comments.length - 1} Comments`}
                    </button>
                    )}
                    <div className="flex items-center mt-1">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="mb-2 border-gray-400 rounded-md px-2 py-1 flex-grow focus:outline-none"
                        />
                        <button onClick={handleCommentAdd} className="ml-2 mb-2 px-2 md:font-bold font-semibold text-blue-500 hover:text-blue-700 focus:outline-none">Post</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Post;
