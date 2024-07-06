import React, { useEffect, useState } from "react";
import "../App.css";
import { FaUser, FaCheckCircle, FaSearch, FaCartPlus, FaPenAlt, FaList, FaOutdent, FaDog, FaHome, FaExclamation, FaToggleOn } from 'react-icons/fa';
import { Link } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { FaSliders } from "react-icons/fa6";
import { BiExit } from "react-icons/bi";
export default function UserDashboard({ username, onLogout }) {
  const [data, setData] = useState([]);
  const [togBLock, settogBLock] = useState("sidebar");
  useEffect(() => {
    // Use an async function inside useEffect to handle the axios call
    const fetchData = async () => {
      try {
        const res = await axios.get("https://petsy-34xa.onrender.com/userdashboard");
        setData(res.data);
        console.log("Data fetched:", res.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []);
  function clickHandler(pet) {
    let id = pet._id

    axios.post("https://petsy-34xa.onrender.com/adoptpet", {
      id, username
    }).then(res => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui success'>
              <br />
              <FaCheckCircle className="icon success-icon" />
              <br />
              <h1>Success!</h1>
              <br />
              <p>Please wait for the Owner to Approve</p>
              <br />
              <button onClick={onClose} className="confirm-button">OK</button>
            </div>
          );
        }
      });
    }).catch((e) => {

      let error = e.response.data.status
      console.log(error);
      if (error === "already adoption") {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='custom-ui warning'>
                <br />
                <FaExclamation className="icon warning-icon" />
                <br />
                <h1>Warning</h1>
                <br />
                <p>You've already Applied for Addoption</p>
                <br />
                <button onClick={onClose} className="confirm-button orange">OK</button>
              </div>
            );
          }
        });
      }
      else if (error === 'pet not found') {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='custom-ui error'>
                <br />
                <FaTimesCircle className="icon error-icon" />
                <br />
                <h1>Error</h1>
                <br />
                <p>Pet Not Found!</p>
                <br />
                <button onClick={onClose} className="confirm-button">OK</button>
              </div>
            );
          }
        });
      }
      else {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='custom-ui error'>
                <br />
                <FaTimesCircle className="icon error-icon" />
                <br />
                <h1>Error</h1>
                <br />
                <p>Something went wrong. Please try again.</p>
                <br />
                <button onClick={onClose} className="confirm-button">OK</button>
              </div>
            );
          }
        });
      }

    })

  }

  return (
    <div className="user-dashboard">
      <div className={togBLock}>
       
          <h2><Link to="/userDashboard"> <FaHome className="icon" /><span>Dashboard </span></Link><BiExit className="exit-nav" onClick={() => {
            if (togBLock === "sidebar-block") {
              settogBLock("sidebar");
            }
            else {
              settogBLock("sidebar-block");
            }
           

          }} />
           
          </h2>
          <ul>
            <li><Link to="/Registerpet"><FaPenAlt className="icon" /> Register for Selling Pets</Link></li>
            <li><Link to="/PetAdoptionList"><FaList className="icon" /> Pet Selling List</Link></li>
            <li><Link to="/AppliedForAddoption"><FaCartPlus className="icon" />Your Application for Addoption</Link></li>
            <li><Link to="/userAppliedAddoption"><FaDog className="icon" />User Application for Addoption </Link></li>
            <li><Link to="/" onClick={onLogout}><FaOutdent className="icon" onClick={onLogout} />Log out</Link></li>
          </ul>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="user-image">
            <FaSliders className="sliders-button" onClick={() => {
              if (togBLock === "sidebar") {
                settogBLock("sidebar-block");
              }
              else {
                settogBLock("sidebar");
              }
            }} />
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
                    <br/>
                    <span className="pet-name">&nbsp;{item.name}</span>
                  </span>
                  <span>
                    <br/>
                    <h4>Type: {item.type}</h4>
                    <h4>Gender: {item.gender}</h4>
                    <h4>Age: {item.age}</h4>

                    <h4>Color: {item.color}</h4>
                    <br />
                    <h4>Price: {item.price}</h4>
                    <br />
                    <br />
                    <h5>Date: {new Date(item.date).toLocaleDateString()}</h5>
                  </span>

                  <span>
                    <h4>Status: {item.status}</h4>
                  </span>
                  <span>
                    <br/>
                    <br/>
                    <button type="submit" onClick={() => clickHandler(item)}>Adopt</button>

                  </span>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
