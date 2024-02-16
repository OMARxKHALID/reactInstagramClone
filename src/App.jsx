import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/Sidebar';
import Posts from './components/Posts';
import Stories from './components/Stories';
import OtherSide from './components/OtherSide';

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex">
        <div className="w-1/4">
          <SideBar />
        </div>
        <div className="w-3/5 flex flex-col items-center">
          <Stories />
          <Posts />
        </div>
        <div className="w-1/4">
          <OtherSide />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
