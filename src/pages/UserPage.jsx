import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import Footer from "../components/Footer";
import UserProfile from "../components/UserProfile";

const UserPage = () => {
  const [isMediumScreen, setIsMediumScreen] = useState(false);

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex justify-center">
        <div className={!isMediumScreen ? "min-w-[20%]" : ""}>
          <SideBar />
        </div>
        <div className={isMediumScreen ? "min-w-[80%]" : "w-[100%]"}>
          <UserProfile />
        </div>
        <div className={!isMediumScreen ? "min-w-[10%]" : ""}>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;
