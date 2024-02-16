import React from 'react';

const UserPosts = ({ post }) => {
    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="border border-gray-200 rounded-md p-4 mb-4">
            <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>
            <img src={post.images[0].url} alt="Post" className="mb-2 w-full rounded-md" />
            <p className="text-base">{post.caption}</p>
            <div className="flex justify-between mt-2">
                <span>Liked by {post.count.liked_by} people</span>
                <span>Comments: {post.comments.length}</span>
            </div>
        </div>
    );
};

export default UserPosts;
