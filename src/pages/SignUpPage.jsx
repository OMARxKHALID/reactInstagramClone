import React, { useState, useEffect } from "react";
import { FaApple, FaGoogle, FaFacebookSquare } from "react-icons/fa";
import instagramLogo from "../images/instagramLogo.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/Firebase";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFormValid(username !== "" && email !== "" && password !== "");
  }, [username, email, password]);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!formValid || loading) return;
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setError(
              "Sorry, your email was incorrect. Please double-check your email."
            );
            break;
          case "auth/weak-password":
            setError(
              "Sorry, your password is too weak. Please choose a stronger password."
            );
            break;
          case "auth/email-already-in-use":
            setError(
              "Sorry, this email is already in use. Please use a different email."
            );
            break;
          default:
            setError("An error occurred. Please try again later.");
            break;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
        <img
          src={instagramLogo}
          alt="Instagram Logo"
          className="bg-no-repeat"
        />
        <form className="mt-8 w-64 flex flex-col" onSubmit={handleSignUp}>
          <input
            autoFocus
            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            id="username"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            id="email"
            placeholder="Phone number, username, or email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={`text-sm text-center ${
              formValid ? "bg-blue-500" : "bg-blue-300"
            } text-white py-2 rounded font-medium`}
            type="submit"
            disabled={!formValid || loading}
          >
            {loading ? (
              <div className="loading-spinner flex item-center justify-center"></div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="flex justify-evenly space-x-2 w-64 mt-4">
          <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
          <span className="flex-none uppercase text-xs text-gray-400 font-semibold">
            or
          </span>
          <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
        </div>
        <button
          className="text-sm text-center bg-blue-500 text-white justify-center items-center flex w-64 py-2 rounded font-medium mt-4"
          type="submit"
        >
          <FaFacebookSquare size={20} className="mr-2.5" />
          Log in with Facebook
        </button>
        {error && <p className="text-red-500 px-10 text-xs mt-2">{error}</p>}
      </div>
      <div className="bg-white border border-gray-300 text-center w-80 py-4">
        <span className="text-sm">have an account?</span>
        <Link to={'/login'} className="text-blue-500 ml-1 text-sm font-semibold">login</Link>
      </div>
      <div className="mt-3 text-center">
        <span className="text-xs">Get the app</span>
        <div className="flex mt-3 space-x-2">
          <FaApple size={40} />
          <FaGoogle size={40} />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;