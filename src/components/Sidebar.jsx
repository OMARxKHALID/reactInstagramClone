import React, { useState, useEffect } from "react";
import { AiOutlineHome, AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { ImSearch } from "react-icons/im";
import { BsPlusSquare, BsFillPlusSquareFill } from "react-icons/bs";
import { RiUser3Line, RiUser3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';

import instagramLogo from '../images/instagramLogo.png';

const SideBar = () => {
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isMedium = window.matchMedia("(max-width: 1100px)").matches;
    setIsMediumScreen(isMedium);

    const handleResize = () => {
      setIsMediumScreen(window.matchMedia("(max-width: 1100px)").matches);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const links = [
    { name: "Home", route: "/", IconLine: AiOutlineHome, IconFilled: AiFillHome },
    { name: "Search", route: "#", IconLine: AiOutlineSearch, IconFilled: ImSearch },
    { name: "Create", route: "#", IconLine: BsPlusSquare, IconFilled: BsFillPlusSquareFill },
    { name: "Profile", route: "#", IconLine: RiUser3Line, IconFilled: RiUser3Fill },
  ];

  if (isMediumScreen) {
    return null; 
  }

  return (
    <div className="fixed left-4 top-4 h-full border-r-[1px] border-solid border-gray-500">
      <div className="flex flex-col mr-4 h-full items-center">
        <img src={instagramLogo} alt="Instagram Logo" className="mr-1 mt-4 h-[35px]" />
        <div className="flex flex-col mt-12">
          {links.map((link, index) => {
            const isActive = link.route === location.pathname;
            const Icon = isActive ? link.IconFilled : link.IconLine;

            return (
              <Link key={index} to={link.route} className="block w-full">
                <button className="rounded-full p-3 hover:bg-gray-100 w-full flex items-center space-x-3 transition-all">
                  <Icon size="25px" />
                  <div className="text-black hidden md:block">{link.name}</div>
                </button>
              </Link>
            );
          })}
        </div>
        <Link to="#">
          <button className="rounded-full p-3 hover:bg-gray-100 w-full flex items-center space-x-3 transition-all mt-auto mb-4">
            <FiLogOut size="25px" />
            <div className="text-black hidden md:block">Logout</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
