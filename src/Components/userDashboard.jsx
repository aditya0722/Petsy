import React from "react";
import { getCookie } from "../cookie";
import "../App.css";
import { FaUser, FaShoppingCart, FaCog, FaSearch, FaCartPlus, FaRegistered, FaRegKiss, FaPenAlt, FaList, FaOutdent } from 'react-icons/fa';
import img from "../img/file.png";
import { Link } from "react-router-dom"
import { SiGnome } from "react-icons/si";
import { FaPenToSquare } from "react-icons/fa6";
export default function userDashboard({ username, onLogout }) {
  return (
    <>
      <div className="user-dashboard">
        <div className="sidebar">
          <h2>Dashboard</h2>
          <ul>
            <li><Link to="/Registerpet"><FaPenAlt className="icon" /> Register Pets</Link></li>
            <li><Link to="/PetAdoptionList"><FaList className="icon" /> pet Adoption List</Link></li>
            <li><Link to="/AppliedForAddoption"><FaCartPlus className="icon" />Addoption Applied</Link></li>
            <li><Link to="/" onClick={onLogout}><FaOutdent className="icon" onClick={onLogout} />Log out</Link></li>
          </ul>
        </div>
        <div className="dashboard-content">
          <div className="dashboard-section">
            <div className="user-image">
              <span className="txt-dashboard-welcome">
                <h3>
                  Welcome,&nbsp; <FaUser />{username}!</h3>
                <p>This is your user dashboard.</p>
              </span>


            </div>
            <div className="flex-container-dashboard">


              <span className="search-box">
                <input type="search" placeholder="seacrh" />
                <FaSearch className="icon" />
              </span>

              <span>
                <select className="filter-dropdown">
                  <option value="filter1">Filter 1</option>
                  <option value="filter2">Filter 2</option>
                  <option value="filter3">Filter 3</option>
                </select>
                <select className="filter-dropdown">
                  <option value="filter1">Filter 1</option>
                  <option value="filter2">Filter 2</option>
                  <option value="filter3">Filter 3</option>
                </select>
                <select className="filter-dropdown">
                  <option value="filter1">Filter 1</option>
                  <option value="filter2">Filter 2</option>
                  <option value="filter3">Filter 3</option>
                </select>
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