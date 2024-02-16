import React, { useState, useEffect } from "react";
import { AiOutlineHome, AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { ImSearch } from "react-icons/im";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FiPlusSquare } from "react-icons/fi";
import { RiUser3Line, RiUser3Fill } from "react-icons/ri";
import { FiLogOut, FiHeart } from "react-icons/fi";
import {
  MdExplore,
  MdOutlineExplore,
  MdVideoLibrary,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import instagramLogo from "../images/instagramLogo.png";

const SideBar = () => {
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.matchMedia("(max-width: 1100px)").matches);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const links = [
    {
      name: "Home",
      route: "/",
      IconLine: AiOutlineHome,
      IconFilled: AiFillHome,
    },
    {
      name: "Explore",
      route: "#",
      IconLine: MdOutlineExplore,
      IconFilled: MdExplore,
    },
    {
      name: "Reels",
      route: "#",
      IconLine: MdOutlineVideoLibrary,
      IconFilled: MdVideoLibrary,
    },
    {
      name: "Search",
      route: "#",
      IconLine: AiOutlineSearch,
      IconFilled: ImSearch,
    },
    {
      name: "Create",
      route: "#",
      IconLine: FiPlusSquare,
      IconFilled: BsFillPlusSquareFill,
    },
    {
      name: "Notifications",
      route: "#",
      IconLine: FiHeart,
      IconFilled: FiHeart,
    },
    {
      name: "Profile",
      route: "#",
      IconLine: RiUser3Line,
      IconFilled: RiUser3Fill,
    },
  ];

  if (isMediumScreen) {
    return null;
  }

  return (
    <div
      className="fixed left-4 h-full border-r-[1px] border-solid border-gray-300"
      style={{ width: "200px" }}
    >
      <div className="flex flex-col mt-6 mr-4 h-full items-start">
        <img
          src={instagramLogo}
          alt="Instagram Logo"
          className="mr-1 mt-4 h-[35px]"
        />
        <div className="flex flex-col mt-12">
          {links.map((link, index) => {
            const isActive = link.route === location.pathname;
            const Icon = isActive ? link.IconFilled : link.IconLine;

            return (
              <Link key={index} to={link.route}>
                <button
                  className="p-2 mr-3 rounded-md hover:bg-gray-200 w-full flex items-center space-x-4 mt-auto mb-4"
                  style={{ width: "200px" }}
                >
                  <Icon size="25px" />
                  <div>{link.name}</div>
                </button>
              </Link>
            );
          })}
        </div>
        <Link to="#">
          <button
            className="p-2 mt-[300px] mr-3 rounded-md hover:bg-gray-200 w-full flex items-center space-x-4 mb-4"
            style={{ width: "200px" }}
          >
            <FiLogOut size="25px" />
            <div className="text-black">Logout</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
