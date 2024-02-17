import React from 'react'
import Header from '../components/Header';
import SideBar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';
import Footer from '../components/Footer';

const UserPage = () => {
    return (
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex-grow flex">
            <div className="w-1/4">
              <SideBar />
            </div>
            <div className="w-5/7 flex flex-col xl:-mt-8 items-center">
              <UserProfile />
            </div>
          </div>
          <Footer />
        </div>
      );
}

export default UserPage
