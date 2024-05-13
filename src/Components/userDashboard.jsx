import React from "react";
import { getCookie } from "../cookie";
import "../App.css";
import { FaUser, FaShoppingCart, FaCog, FaSearch, FaCartPlus } from 'react-icons/fa';
export default function userDashboard({ username }) {
  return (
    <>
      <div className="user-dashboard">
        <div className="sidebar">
          <h2>Dashboard</h2>
          <ul>
            <li><a href="#"><FaUser className="icon" /> Profile</a></li>
            <li><a href="#"><FaShoppingCart className="icon" /> Orders</a></li>
            <li><a href="#"><FaCog className="icon" /> Settings</a></li>
          </ul>
        </div>
        <div className="dashboard-content">
          <div className="dashboard-section">
            <div className="user-image">

            </div>
            <div className="flex-container-dashboard">
              <span className="txt-dashboard-welcome">
                <h3>

                  Welcome,&nbsp; <FaUser />{username}!</h3>
                <p>This is your user dashboard.</p>
              </span>

              <span className="search-box">
                <input type="search" placeholder="seacrh" />
                <FaSearch className="icon" />
              </span>

              <span>
                <button type="submit" className="petregister-button">Add Pets
                  <FaCartPlus></FaCartPlus>
                </button>
              </span>
            </div>
          </div>
          <div className="table-container">
            <div className="table-box">

            </div>
            <div className="table-box">

            </div>
            <div className="table-box">

            </div>
            <div className="table-box">

            </div>
          </div>
        </div>
      </div>

    </>
  )
}