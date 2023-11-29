import React from "react";
import "./Dashboard.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile.jsx";
import Recommender from "./pages/Recommender.jsx";
import Tracker from "./pages/Tracker.jsx";
import Header from "./components/Header";

const Dashboard = () => {
  return (
    <div className="dash">
      <Header />
      <Sidebar />
      <div className="dashboard-content">
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="recommender" element={<Recommender />} />
          <Route path="tracker" element={<Tracker />} />
        </Routes>
      </div>
      </div>
   
  );
};

export default Dashboard;
