import React, { useState, useEffect } from "react";
import { AiOutlineHome, AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { ImSearch } from "react-icons/im";
import { BsPlusSquare, BsFillPlusSquareFill } from "react-icons/bs";
import { RiUser3Line, RiUser3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';

const loadLogo = async () => {
  const image = await import('../images/instagramLogo.png');
  return image.default;
};

const SideBar = () => {
  const [logo, setLogo] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchLogo = async () => {
      const logo = await loadLogo();
      setLogo(logo);
    };
    fetchLogo();
  }, []);

  if (!logo) {
    return null;
  }

  const links = [
    { name: "Home", route: "/", IconLine: AiOutlineHome, IconFilled: AiFillHome },
    { name: "Search", route: "#", IconLine: AiOutlineSearch, IconFilled: ImSearch },
    { name: "Create", route: "#", IconLine: BsPlusSquare, IconFilled: BsFillPlusSquareFill },
    { name: "Profile", route: "#", IconLine: RiUser3Line, IconFilled: RiUser3Fill },
  ];

  return (
    <div className="fixed left-0 top-0 h-full border-r-[1px] border-solid border-gray-300">
      <div className="flex flex-col h-full">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Instagram Logo" className="mr-1 mt-4" />
          <div className="space-y-2 w-full mt-12">
            {links.map((link, index) => {
              const isActive = link.route === location.pathname;
              const buttonClasses = [
                "rounded-full",
                "p-3",
                "hover:bg-gray-100",
                "w-full",
                "flex",
                "transition-all",
                "items-center",
                "space-x-3",
                isActive ? "font-bold" : "font-normal"
              ];

              return (
                <Link key={index} to={link.route} className="block">
                  <button className={buttonClasses.join(" ")}>
                    {isActive ? (
                      <link.IconFilled size="25px" />
                    ) : (
                      <link.IconLine size="25px" />
                    )}
                    <div className="text-black hidden md:block">{link.name}</div>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
        <Link to="#">
          <button
            className={
              "rounded-full p-3 hover:bg-gray-100 w-full flex transition-all items-center space-x-3 font-normal"
            }
          >
            <FiLogOut size="25px" />
            <div className="text-black hidden md:block">Logout</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
