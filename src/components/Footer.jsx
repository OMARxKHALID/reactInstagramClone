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

  const links = [
    { to: "/", icon: <FiHome size={24} />, label: "Home" },
    { to: "/", icon: <MdExplore size={24} />, label: "Explore" },
    { to: "/", icon: <FiPlusSquare size={24} />, label: "Create" },
    { to: "/", icon: <FiHeart size={24} />, label: "Favorites" },
    { to: "/", icon: <FiSearch size={24} />, label: "Search" },
  ];

  return isMobile ? (
    <footer className="fixed bottom-0 left-0 right-0 shadow-md bg-white w-lg mx-auto px-3 py-4 -z-0">
      <div className="flex justify-around items-center">
        {links.map((link, index) => (
          <Link key={index} to={link.to} >
            {link.icon}
          </Link>
        ))}
      </div>
    </footer>
  ) : null;
}

export default Footer;
