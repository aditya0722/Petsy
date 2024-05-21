import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaShoppingCart, FaCog,FaHome, FaSearch, FaDog,FaCartPlus, FaRegistered, FaRegKiss, FaPenAlt, FaList, FaOutdent } from 'react-icons/fa';
import axios from "axios";

export default function AppliedForAddoption({ username, onLogout }) {
    const [data, setdata] = useState([])
    const user = username
    useEffect(() => {
        const getdata = async () => {
            console.log(user);
            axios.get("http://localhost:5000/addoptionapplied", {
                params: { username }
            }).then(res => {
                console.log(res.data);
                setdata(res.data);
            }).catch((e) => {
                alert('error')
                console.log(e);
            })
        }
        getdata();
    }, [username])
    const clickHandler = (item) => {
        const id = item._id;
        axios.post("http://localhost:5000/deleteaddoption", {
            id, username
        }).then(req => {
            if (req.data.status == "success") {
                //alert('item Deleted')
                setdata(data.filter(pet => pet._id !== id));
            }
        }).catch(e => {
            console.log(e);
        })

    }
    return (

        <>
            <div className="user-dashboard">
                <div className="sidebar">
                <h2><Link to="/userDashboard"> <FaHome className="icon"/>Dashboard</Link></h2>
        <ul>
          <li><Link to="/Registerpet"><FaPenAlt className="icon" /> Register for Selling Pets</Link></li>
          <li><Link to="/PetAdoptionList"><FaList className="icon" /> Pet Selling List</Link></li>
          <li><Link to="/AppliedForAddoption"><FaCartPlus className="icon" />Your Application for Addoption</Link></li>
          <li><Link to="/userAppliedAddoption"><FaDog className="icon"/>User Application for Addoption </Link></li>
          <li><Link to="/" onClick={onLogout}><FaOutdent className="icon" onClick={onLogout} />Log out</Link></li>
        </ul>
                </div>
                <div className="list-container">
                    <div className="list">
                    <h1>Check out Your Application for Addoption</h1>
                        <div className="flex-container-dashboard padd">
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
                                                <h4>Status: {item.status}</h4>
                                            </span>
                                            <span>
                                                <button type="submit" onClick={() => clickHandler(item)}>Cancel Adopt</button>

                                            </span>

                                        </div>
                                        {/* Additional status and buttons */}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}