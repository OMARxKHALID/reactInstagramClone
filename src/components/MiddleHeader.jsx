import React from 'react'

const MiddleHeader = () => {
  return (
    <div>
      <ul className="flex items-center mt-4 justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
        <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
          <a className="inline-block p-3" href="#">
            <i className="fas fa-th-large text-xl md:text-xs"></i>
            <span className="hidden md:inline">post</span>
          </a>
        </li>
        <li>
          <a className="inline-block p-3" href="#">
            <i className="far fa-square text-xl md:text-xs"></i>
            <span className="hidden md:inline">igtv</span>
          </a>
        </li>
        <li>
          <a className="inline-block p-3" href="#">
            <i className="fas fa-user  text-xl md:text-xs"></i>
            <span className="hidden md:inline">tagged</span>
          </a>
        </li>
      </ul>
    </div>  
    )
}

export default MiddleHeader
