import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/Sidebar';
import Posts from './components/Posts';
import postsData from './data/data';

function Home() {
  return (
    <div className="flex">
      {/* <SideBar /> */}
      <div className="flex-grow flex justify-center items-center">
        <Posts posts={postsData} />
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
