import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/Firebase";

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <button
      className="p-2 rounded-md hover:bg-gray-200 w-full flex items-center space-x-4"
      style={{ width: "200px" }}
      onClick={logout}
    >
      <FiLogOut size="25px" />
      <div className="text-black">Logout</div>
    </button>
  );
};

export default LogoutButton;
