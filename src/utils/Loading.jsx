import React from "react";
import instagramLogo from "../images/instalogo.png";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img loading="lazy" src={instagramLogo} alt="Instagram Logo" />
    </div>
  );
};

export default Loading;
