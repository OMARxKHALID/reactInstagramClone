import React from 'react';

const MiddleHeader = () => {
  return (
    <div>
      <ul className="flex items-center mt-4 justify-center space-x-6 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
        <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
          <a className="inline-flex items-center p-3" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2 md:w-3 md:h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor"></rect>
              <line x1="9.015" y1="3" x2="9.015" y2="21" fill="none" stroke="currentColor"></line>
              <line x1="14.985" y1="3" x2="14.985" y2="21" fill="none" stroke="currentColor"></line>
              <line x1="21" y1="9.015" x2="3" y2="9.015" fill="none" stroke="currentColor"></line>
              <line x1="21" y1="14.985" x2="3" y2="14.985" fill="none" stroke="currentColor"></line>
            </svg>
            <span>post</span>
          </a>
        </li>
        <li>
          <a className="inline-flex items-center p-3" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2 md:w-3 md:h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="20 21 12 13.44 4 21 4 3 20 3 20 21" fill="none" stroke="currentColor"></polygon>
            </svg>
            <span>saved</span>
          </a>
        </li>
        <li>
          <a className="inline-flex items-center p-3" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2 md:w-3 md:h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke="currentColor"></path>
              <path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke="currentColor"></path>
              <circle cx="12.072" cy="11.075" r="3.556" fill="none" stroke="currentColor"></circle>
            </svg>
            <span>tagged</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MiddleHeader;
