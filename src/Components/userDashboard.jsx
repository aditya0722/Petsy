import React, { useEffect, useState } from "react";
import "../App.css";
import { FaUser, FaSearch, FaCartPlus, FaPenAlt, FaList, FaOutdent } from 'react-icons/fa';
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserDashboard({ username, onLogout }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Use an async function inside useEffect to handle the axios call
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/userdashboard");
        setData(res.data);
        console.log("Data fetched:", res.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []);

  return (
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
              <h3>Welcome, <FaUser />{username}!</h3>
              <p>This is your user dashboard.</p>
            </span>
          </div>
          <div className="flex-container-dashboard">
            <span className="search-box">
              <input type="search" placeholder="search" />
              <FaSearch className="icon" />
            </span>
            <span>
              <select className="filter-dropdown">
                <option value="">Type</option>
                <option value="Cat">Cat</option>
                <option value="Dog">Dog</option>
                <option value="Bird">Bird</option>
                <option value="Fish">Fish</option>
              </select>
              <select className="filter-dropdown">
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <select className="filter-dropdown">
                <option value="">Color</option>
                <option value="filter2">White</option>
                <option value="filter3">Black</option>
                <option value="filter3">Brown</option>
                <option value="filter3">Orange</option>
              </select>
            </span>
          </div>

        </div>
        <div className="table-container">
          {data.map((item) => (
            <div key={item._id} className="table-box">

              <div className="pet-info">
                <div className="pet-details">
                  <span className="img-text">
                    <img src={item.image} alt={item.name} />
                    <span className="pet-name">&nbsp;{item.name}</span>
                  </span>
                  <span>
                    <h4>Type: {item.type}</h4>
                    <h4>Gender: {item.gender}</h4>
                    <h4>Age: {item.age}</h4>

                    <h4>Color: {item.color}</h4>
                    <br />
                    <h4>Price: {item.price}</h4>
                    <br />
                    <br />
                    <h5>Date: {item.date}</h5>
                  </span>

                  <span>
                    <h4>Status:Pending</h4>
                  </span>
                  <span>
                    <button type="submit">Addopt</button>
                  </span>

                </div>
                {/* Additional status and buttons */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
