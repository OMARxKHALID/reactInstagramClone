import React from "react";
import Post from "./Post";
import postsData from '../data/data';

const Posts = () => {
    return (
        <div>
            {postsData.map((post, index) => (
                <Post key={index} post={post} />
            ))}
        </div>
    );
};

export default Posts;
