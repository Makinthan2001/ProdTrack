import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { BiCategoryAlt } from "react-icons/bi";
import { ImAppleinc } from "react-icons/im";
import { FaGoogle } from "react-icons/fa";
import { SiHuawei } from "react-icons/si";

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(window.innerWidth >= 768);

  const toggleSidebar = () => {
    if (window.innerWidth >= 768) {
      setIsExpanded((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsExpanded(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`wrapper ${isExpanded ? "expand" : ""}`}>
      <aside id="sidebar" className={isExpanded ? "expand" : ""}>
        <div className="d-flex">
          <button
            id="toggle-btn"
            type="button"
            onClick={toggleSidebar}
            className="d-none d-md-flex"
          >
            <BiCategoryAlt />
          </button>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="allproducts" className="sidebar-link">
              <BiCategoryAlt className="icon" />
              {isExpanded && <span className="link-text">All Products</span>}
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="apple" className="sidebar-link">
              <ImAppleinc className="icon" />
              {isExpanded && <span className="link-text">Apple</span>}
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="google" className="sidebar-link">
              <FaGoogle className="icon" />
              {isExpanded && <span className="link-text">Google</span>}
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="huawei" className="sidebar-link">
              <SiHuawei className="icon" />
              {isExpanded && <span className="link-text">Huawei</span>}
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SideBar;
