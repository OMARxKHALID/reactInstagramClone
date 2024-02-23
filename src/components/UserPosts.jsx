import React from 'react';

const UserPosts = () => {
  const images = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ];

  return (
    <div className="px-4 py-2 grid grid-cols-3 gap-2 pb-16">
      {images.map((imageUrl, index) => (
        <div key={index} className="relative">
          <img src={imageUrl} alt={`Image ${index}`} className="w-full h-full" />
          <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" aria-label="Like" className="h-8 w-8 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" />
              </svg>
              <span>10</span> 
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" aria-label="Comment" className="h-8 w-8 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>5</span> 
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
