import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { logout } from "../redux/authSlice"; 
import { auth } from "../firebase/Firebase"; 

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleLogout = async () => {
    try {
      await auth.signOut(); 
      dispatch(logout()); 
      navigate("/login"); 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      className="p-2 rounded-md hover:bg-gray-200 w-full flex items-center space-x-4"
      style={{ width: "200px" }}
      onClick={handleLogout} // Call handleLogout when the button is clicked
    >
      <FiLogOut size={25} />
      <div className="text-black">Logout</div>
    </button>
  );
};

export default LogoutButton;
