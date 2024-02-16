import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import Posts from "./components/Posts";
import Stories from "./components/Stories";
import OtherSide from "./components/OtherSide";
import UserProfile from "./pages/UserProfile";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow flex">
        <div className="w-1/4">
          <SideBar />
        </div>
        <div className="w-3/5 flex flex-col  xl:-mt-8 items-center">
          <Stories />
          <Posts />
        </div>
        <div className="w-1/4 xl:-mt-8">
          <OtherSide />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
