import React, { useState, useEffect } from "react";
import { AiOutlineHome, AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { ImSearch } from "react-icons/im";
import { FiPlusSquare } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import {
  MdExplore,
  MdOutlineExplore,
  MdVideoLibrary,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import instagramLogo from "../images/instagramLogo.png";
import LogoutButton from "../utils/LogoutButton";
import { selectUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfileIcon from "../utils/ProfileIcon";
import SearchUserModal from "../modal/SearchUserModal";
import CreatePostModal from "../modal/CreatePostModal";
import { clearError, clearUserProfile } from "../redux/userProfileSlice";

const SideBar = () => {
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const location = useLocation();
  const loggedUser = useSelector(selectUser);
  const userProfile = useSelector((state) => state.userProfile.userProfile);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

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

  const Profile = () => {
    return (
      <div>
        <ProfileIcon />
      </div>
    );
  };

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
      name: "Notifications",
      route: "#",
      IconLine: FiHeart,
      IconFilled: FiHeart,
    },
    {
      name: "Profile",
      route: `/user/${loggedUser.username}`,
      IconLine: Profile,
      IconFilled: Profile,
    },
  ];

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);

    if (!isSearchModalOpen) {
      dispatch(clearError());
      dispatch(clearUserProfile());
    }
  };
  const togglePostModal = () => {
    setIsPostModalOpen(!isPostModalOpen);

    if (!isPostModalOpen) {
      dispatch(clearError());
    }
  };

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
          loading="lazy"
          src={instagramLogo}
          alt="Instagram Logo"
          className="mr-1 mt-4 h-[35px]"
        />
        <div className="flex flex-col mt-12">
          <>
            {links.map((link, index) => {
              const isActive = link.route === location.pathname;
              const Icon = isActive ? link.IconFilled : link.IconLine;
              return (
                <Link key={index} to={link.route}>
                  <button
                    className="p-2 mr-3 rounded-md hover:bg-gray-200 w-full flex items-center space-x-4 mt-auto mb-4"
                    style={{ width: "200px" }}
                    onClick={link.name === "Search" ? toggleSearchModal : null}
                  >
                    <Icon size="25px" />
                    <div>{link.name}</div>
                  </button>
                </Link>
              );
            })}
            <button
              onClick={togglePostModal}
              disabled={pathname !== "/" && userProfile && userProfile.uid !== loggedUser.uid}
              className={`p-2 mr-3 rounded-md hover:bg-gray-200 w-full flex items-center space-x-4 mt-auto mb-4`}
            >
              <FiPlusSquare size="25px" />
              <div>Create</div>
            </button>
          </>
        </div>
        <LogoutButton />
      </div>
      {isPostModalOpen && <CreatePostModal onClose={togglePostModal} />}
      {isSearchModalOpen && <SearchUserModal onClose={toggleSearchModal} />}
    </div>
  );
};

export default SideBar;
