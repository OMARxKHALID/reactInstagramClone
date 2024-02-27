import React from "react";
import Post from "./Post";
import useGetFeedPosts from "../hooks/useGetFeedPosts";

const Posts = () => {
    const { posts } = useGetFeedPosts();
    console.log(posts, "posts");
    return (
        <div className="pb-16 ">
            {posts.map((post, index) => (
                <Post key={index} post={post} />
            ))}
        </div>
    );
};

export default Posts;
