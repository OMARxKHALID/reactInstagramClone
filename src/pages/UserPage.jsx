import React from 'react';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';
import Footer from '../components/Footer';
import UserProfile from '../components/UserProfile';

const UserPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex ">
        <div className="w-1/6">
          <SideBar />
        </div>
        <div className="w-4/6 mt-10">
          <UserProfile/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;
