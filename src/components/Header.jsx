import React, { useEffect, useState } from "react";
import { FiInstagram, FiBell, FiMessageSquare } from "react-icons/fi";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1100);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="/" className="flex items-center">
          <FiInstagram
            size={25}
            color="#000"
            className="cursor-pointer hover:text-gray-600"
          />
          <span className="ml-2 text-lg font-semibold">Instagram</span>
        </a>
        <div className="flex space-x-5 items-center justify-center">
          <div className="relative">
            <div className="w-2 h-2 bg-red-500 rounded-full absolute right-0 top-0.1"></div>
            <FiBell
              size={25}
              color="#000"
              className="x1lliihq x1n2onr6 cursor-pointer hover:text-gray-600"
            />
          </div>
          <div className="relative">
            <div className="flex items-center justify-center w-4 h-4 bg-red-500 rounded-full absolute left-3.5 bottom-3.5 text-[10px] text-white">
              2
            </div>
            <FiMessageSquare
              size={25}
              color="#000"
              className="_ab6- cursor-pointer hover:text-gray-600"
            />
          </div>
        </div>
      </div>
    </header>
  ) : null;
};

export default Header;
