import React from "react";
import Post from "./Post";
import useGetFeedPosts from "../hooks/useGetFeedPosts";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import LoadingSpinner from "../utils/loadingSpinner";

const Posts = () => {
    const { posts, isLoading } = useGetFeedPosts();
    const authUser = useSelector(selectUser);

    if (isLoading || !authUser) {
        return <LoadingSpinner />;
    }

    if (posts.length === 0) {
        return (
            <div className="mt-20 text-center">
                <h3 className="text-3xl font-bold text-gray-700">No posts yet.</h3>
                <p className="text-lg mt-4 text-gray-500">Start following people to see their posts.</p>
            </div>
        );
    }

    return (
        <div className="pb-16">
            {posts.map((post, index) => (
                <Post key={index} post={post} />
            ))}
        </div>
    );
};

export default Posts;
