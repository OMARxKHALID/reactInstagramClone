import React from 'react';
import instagramLogo from '../images/instagramLogo.png';

const UserPosts = ({ imageSrc, likes, comments }) => {
  return (
    <div className="w-1/3 p-px md:px-3">
      <a href="#">
        <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
          <img className="w-full h-full absolute left-0 top-0 object-cover" src={instagramLogo} alt="image" />
          <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 justify-center items-center space-x-4">
            <span className="p-2 flex items-center">
              <i className="fas fa-heart mr-1"></i>
              {likes}
            </span>
            <span className="p-2 flex items-center">
              <i className="fas fa-comment mr-1"></i>
              {comments}
            </span>
          </div>
        </article>
      </a>
    </div>
  );
};

export default UserPosts;
