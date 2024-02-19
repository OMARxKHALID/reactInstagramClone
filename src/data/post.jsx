// Post.js
import React from "react";

const Post = ({ post }) => {
  return (
    <div className="mb-4 border border-gray-300 rounded">
      <img src={post.imageUrl} alt="Post" className="w-full" />
      <div className="p-4">
        <p className="font-semibold">{post.caption}</p>
      </div>
    </div>
  );
};

export default Post;
