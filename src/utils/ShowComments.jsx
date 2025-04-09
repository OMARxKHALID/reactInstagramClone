import React, { useEffect, useState } from "react";
import useGetUserProfileByUserId from "../hooks/useGetUserProfileByUserId";
import { MdDelete } from "react-icons/md";
import { durationSinceCreated } from "./Dsc";

const ShowComments = ({ comments, authUser, handleDeleteComment, isDeletingComment }) => {
    return (
        <div className="p-1 h-20 md:h-64 xl:h-64 lg:h-64 no-scrollbar overflow-y-auto">
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
    const { userProfile, isLoading: userIsLoading } = useGetUserProfileByUserId(comment.createdBy);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(userIsLoading);
    }, [userIsLoading]);

    const handleDelete = async () => {
        setIsLoading(true);
        await handleDeleteComment(comment.postId, comment);
        setIsLoading(false);
    };

    const isOwner = comment.createdBy === authUser.uid;

    if (userIsLoading || !userProfile) {
        return (
            <div className="animate-spin rounded-full h-5 w-5  border-b-2 border-gray-900"></div>
        );
    }

    return (
        <>
            <div className="rounded-full overflow-hidden mr-2">
                <img
                    loading="lazy"
                    src={isOwner ? authUser.profilePicUrl : userProfile.profilePicUrl}
                    alt={isOwner ? authUser.username : userProfile.username}
                    className="h-8 w-8 rounded-full object-cover border-2 border-pink-500"
                />
            </div>
            <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <p className="font-semibold text-sm mr-2">{isOwner ? authUser.username : userProfile.username}</p>
                        <div className="text-xs text-gray-400 md:font-bold">{durationSinceCreated(comment.createdAt)}</div>
                    </div>
                    {isOwner && (
                        <button
                            onClick={handleDelete}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none ml-2"
                            disabled={isDeletingComment || isLoading}
                        >
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-900"></div>
                            ) : (
                                <MdDelete className="h-5 w-5" />
                            )}
                        </button>
                    )}
                </div>
                <div className="flex flex-row -my-1">
                    <p className="text-sm text-gray-600 comment-text">{comment.comment}</p>

                </div>
            </div>
        </>
    );
};

export default ShowComments;
