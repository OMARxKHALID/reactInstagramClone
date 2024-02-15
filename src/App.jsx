import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/Sidebar';
import Posts from './components/Posts';
import Stories from './components/Stories';
import OtherSide from './components/OtherSide';

function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex">
        <div className="w-[25%]">
          <SideBar />
        </div>
        <div className="w-[60%] flex justify-center">
          <div className="flex flex-col p-4">
            <Stories />
            <Posts />
          </div>
        </div>
        <div className="w-[25%]">
          <OtherSide />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
