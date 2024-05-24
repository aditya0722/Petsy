import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHome, FaPenAlt, FaList, FaCartPlus, FaDog, FaOutdent, FaSearch, FaTrashAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../App.css'; // Custom CSS file

export default function PetAdoptionList({ username, onLogout }) {
    const [data, setData] = useState([]);

    const deletePet = (id) => {
        axios.post("http://localhost:5000/deleteselling", {
            username, id
        })
            .then(res => {
                setData(data.filter(pet => pet._id !== id));
                confirmAlert({
                    customUI: ({ onClose }) => {
                        return (
                            <div className='custom-ui success'>
                                <br/>
                                <FaCheckCircle className="icon success-icon" />
                                <br/>
                                <h1>Success!</h1>
                                <br/>
                                <p>Pet deleted successfully.</p>
                                <br/>
                                <button onClick={onClose} className="confirm-button">OK</button>
                            </div>
                        );
                    }
                });
            }).catch(e => {
                console.log(e);
            });
    }

    const clickHandler = (item) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui confirm'>
                        <br/>
                        <FaTrashAlt className="icon confirm-icon" />
                        <br/>
                        <h1>Confirm to delete</h1>
                        <br/>
                        <p>Are you sure you want to delete this pet?</p>
                        <br/>
                        <button onClick={onClose} className="cancel-button">
                             No
                        </button>
                        <button
                            onClick={() => {
                                deletePet(item._id);
                                onClose();
                            }}
                            className="confirm-button"
                        >
                            Yes
                        </button>
                    </div>
                );
            }
        });
    }

    useEffect(() => {
        axios.get("http://localhost:5000/getadoptionlist", {
            params: { username }
        }).then(res => {
            setData(res.data.pets);
        }).catch(error => {
            console.log(error);
        });
    }, [username]);

    return (
        <>
            <div className="user-dashboard">
                <div className="sidebar">
                    <h2><Link to="/userDashboard"> <FaHome className="icon" />Dashboard</Link></h2>
                    <ul>
                        <li><Link to="/Registerpet"><FaPenAlt className="icon" /> Register for Selling Pets</Link></li>
                        <li><Link to="/PetAdoptionList"><FaList className="icon" /> Pet Selling List</Link></li>
                        <li><Link to="/AppliedForAddoption"><FaCartPlus className="icon" />Your Application for Addoption</Link></li>
                        <li><Link to="/userAppliedAddoption"><FaDog className="icon" />User Application for Addoption </Link></li>
                        <li><Link to="/" onClick={onLogout}><FaOutdent className="icon" />Log out</Link></li>
                    </ul>
                </div>
                <div className="list-container">
                    <div className="list">
                        <h1>Check out Your Addoption List</h1>
                        <div className="flex-container-dashboard padd">
                            <span className="search-box">
                                <input type="search" placeholder="search" />
                                <FaSearch className="icon search-icon" />
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
                                    <FaCartPlus className="icon" />
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
                                                <h4>Price: {item.price}</h4>
                                                <h5>Date: {new Date(item.date).toLocaleDateString()}</h5>
                                            </span>
                                            <span>
                                                <h4>Status: {item.status}</h4>
                                            </span>
                                            <span>
                                                <button type="submit" onClick={() => clickHandler(item)} className="cancel-button">Cancel Selling</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
