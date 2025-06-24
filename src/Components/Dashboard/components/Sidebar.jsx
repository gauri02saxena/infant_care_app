import React, { useState } from "react";
import {
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login"); 
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/profile",
      name: "Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "/recommender",
      name: "Recommender",
      icon: <FaRegChartBar />,
    },
    {
      path: "/tracker",
      name: "Tracker",
      icon: <FaCommentAlt />,
    },
    {
      path: "/guidelines",
      name: "Guidelines",
      icon: <FaShoppingBag />,
      onClick: () => {
        window.location.href = 'https://www.unicef.org/india/know-your-childs-immunization-schedule?gclid=CjwKCAiAu9yqBhBmEiwAHTx5pzzoCR33Twvo6vbvSBVexPquvZoT-ksty7gTVZ0lrq_9owz9wmMl6xoChH4QAvD_BwE';
      }
    }
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Menu
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
  menuItem.map((item, index) => {
    if (item.onClick) {
      return (
        <a key={index} className="link" onClick={item.onClick}>
          <div className="icon">{item.icon}</div>
          <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
        </a>
      );
    } else {
      return (
        <NavLink to={item.path} key={index} className="link" activeClassName="active">
          <div className="icon">{item.icon}</div>
          <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
        </NavLink>
      );
    }
  })
}

        <div className="link logout" onClick={handleLogout}>
          <div className="icon">
            <FaSignOutAlt />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Logout
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
