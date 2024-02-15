import React from 'react';
import Users from '../data/users';

const Stories = () => {
  return (
    <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-lg xl:max-w-xl mt-8 px-2 h-24 overflow-x-auto overflow-y-hidden no-scrollbar">
      <div className="flex">
        {Users.map((story, index) => (
          <div key={index} className="flex flex-col items-center mr-4">
            <div className="relative">
              <img
                src={story.url}
                alt={story.username}
                className="w-14 h-14 rounded-full object-cover border-2 border-pink-500"
              />
            </div>
            <div className="mt-1 text-xs text-center md:text-left">{story.username}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stories;
