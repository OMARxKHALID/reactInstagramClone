import React from "react";
import useGetUserProfileByUserId from "../hooks/useGetUserProfileByUserId";
import { MdDelete } from "react-icons/md";

const ShowComments = ({ comments, authUser, handleDeleteComment, isDeletingComment }) => {
    return (
        <div className="p-1 mt-2 h-20 md:h-64 xl:h-64 lg:h-64 no-scrollbar overflow-y-auto">
            {comments.map((comment, index) => (
                <div key={index} className="flex items-start mb-4">
                    <CommentItem
                        comment={comment}
                        authUser={authUser}
                        handleDeleteComment={handleDeleteComment}
                        isDeletingComment={isDeletingComment}
                    />
                </div>
            ))}
        </div>
    );
};

const CommentItem = ({ comment, authUser, handleDeleteComment, isDeletingComment }) => {
    const { userProfile, isLoading } = useGetUserProfileByUserId(comment.createdBy);

    if (isLoading || !userProfile) {
        return (
            <div className="animate-spin rounded-full h-6 w-6  border-b-2 border-gray-900"></div>
        );
    }

    const isUserCommentOwner = comment.createdBy === authUser.uid;

    return (
        <>
            <div className="rounded-full overflow-hidden mr-2">
                <img
                    src={isUserCommentOwner ? authUser.profilePicUrl : userProfile.profilePicUrl}
                    alt={isUserCommentOwner ? authUser.username : userProfile.username}
                    className="h-8 w-8 rounded-full object-cover border-2 border-pink-500"
                />
            </div>
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-center -my-2">
                    <p className="font-semibold ">{isUserCommentOwner ? authUser.username : userProfile.username}</p>
                    {isUserCommentOwner && (
                        <button
                            onClick={() => handleDeleteComment(comment.postId, comment)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            disabled={isDeletingComment}
                        >
                            {isDeletingComment ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-900"></div>
                            ) : (
                                <MdDelete className="h-5 w-5" />
                            )}
                        </button>
                    )}
                </div>

                <div className="text-sm text-gray-500 comment-text mt-1">{comment.comment}</div>
            </div>
        </>
    );
};

export default ShowComments;
