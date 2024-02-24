import React from 'react';
import { useGetUserPosts } from '../hooks/useGetUserPosts';

const UserPosts = () => {
  const { isLoading, posts } = useGetUserPosts();
  console.log("posts", posts);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : posts.length === 0 ? (
        <div className="flex justify-center items-center text-gray-500 text-lg">No posts found.</div>
      ) : (
        <div className="px-4 py-2 grid grid-cols-3 gap-2 pb-16 ">
          {posts.map((post, index) => (
            <div key={index} className="-z-10 bg-zinc-100 rounded-lg ">
              <img src={post.imageUrl} alt={`Image ${index}`} className="w-full h-full object-contain rounded-lg" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPosts;
