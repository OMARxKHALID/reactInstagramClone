import React from "react";
import useGetUserProfileByUserId from "../hooks/useGetUserProfileByUserId";

const ShowComments = ({ comments, authUser }) => {
    return (
        <div className="p-1 mt-2 h-20 md:h-64 xl:h-64 lg:h-64 no-scrollbar overflow-y-auto">
            {comments.map((comment, index) => (
                <CommentItem key={index} comment={comment} authUser={authUser} />
            ))}
        </div>
    );
};

const CommentItem = ({ comment, authUser }) => {
    const { userProfile, isLoading } = useGetUserProfileByUserId(comment.createdBy);

    if (isLoading || !userProfile) {
        return (
            <div className="animate-spin rounded-full h-6 w-6 my-4 border-b-2 border-gray-900"></div>
        );
    }

    return (
        <div className="flex items-start mb-1">
            <div className="rounded-full overflow-hidden mr-2">
                <img
                    src={comment.createdBy === authUser.uid ? authUser.profilePicUrl : userProfile.profilePicUrl}
                    alt={comment.createdBy === authUser.uid ? authUser.username : userProfile.username}
                    className="h-8 w-8 rounded-full object-cover border-2 border-pink-500"
                />
            </div>
            <div className="flex flex-col">
                <p className="font-semibold -my-1">{comment.createdBy === authUser.uid ? authUser.username : userProfile.username}</p>
                <div className="text-sm text-gray-500 comment-text ">{comment.comment}</div>
            </div>
        </div>
    );
};

export default ShowComments;
