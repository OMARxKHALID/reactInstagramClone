import React, { useState } from 'react';
import { useGetUserPosts } from '../hooks/useGetUserPosts';
import LoadingSpinner from '../utils/loadingSpinner';
import ViewPostModal from '../modal/ViewPostModal';

const UserPosts = () => {
  const { isLoading, posts } = useGetUserPosts();
  const [selectedPost, setSelectedPost] = useState(null);
 
  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : posts.length === 0 ? (
        <div className="flex justify-center items-center px-4 py-2 text-gray-500 text-lg -z-20">No posts found.</div>
      ) : (
        <div className="-z-20 lg:px-28 xl:px-28 md:px-14 px-4 py-2 grid grid-cols-3 gap-2 pb-16 ">
              {posts.map((post) => (
                <div key={post.id} className="bg-zinc-50 rounded-lg">
                  <img
                    loading="lazy"
                    src={post.imageUrl}
                    onClick={() => openModal(post)}
                    alt={`Image ${post.id}`}
                    className="w-full h-full object-contain rounded-lg cursor-pointer"
                  />
                </div>
              ))}
        </div>
      )}
      {selectedPost && <ViewPostModal post={selectedPost} onClose={closeModal} />}
    </div>
  );
};

export default UserPosts;
