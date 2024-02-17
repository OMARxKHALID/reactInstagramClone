import React, { useState, useEffect } from "react";
import { FiHome, FiSearch, FiPlusSquare, FiHeart } from "react-icons/fi";
import { MdExplore } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
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
    <footer className="fixed bottom-0 left-0 right-0 shadow-md bg-white max-w-lg mx-auto px-3 py-5">
      <div className="flex justify-around items-center">
        <Link to="/">
          <FiHome size={24} className="cursor-pointer hover:text-gray-600" />
        </Link>
        <MdExplore size={24} className="cursor-pointer hover:text-gray-600" />
        <FiPlusSquare
          size={24}
          className="cursor-pointer hover:text-gray-600"
        />
        <FiHeart size={24} className="cursor-pointer hover:text-gray-600" />
        <FiSearch size={24} className="cursor-pointer hover:text-gray-600" />
      </div>
    </footer>
  ) : null;
}

export default Footer;
