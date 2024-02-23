import React from "react";
import Post from "./Post";
import postsData from '../data/Data';

const Posts = () => {
    return (
        <div className="pb-16">
            {postsData.map((post, index) => (
                <Post key={index} post={post} />
            ))}
        </div>
    );
};

export default Posts;
