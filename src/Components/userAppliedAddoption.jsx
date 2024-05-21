import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaPenAlt, FaList,FaHome, FaCartPlus, FaOutdent, FaSearch,FaDog } from 'react-icons/fa';

export default function UserAppliedAdoption({ username, onLogout }) {
    const [data, setData] = useState({ pets: [], appliedUsers: [] });

    useEffect(() => {
        axios.get("http://localhost:5000/userAppliedAdoption", {
            params: { username }
        }).then(res => {
            console.log(res.data);
            setData(res.data);
        }).catch(error => {
            console.log(error);
        });
    }, [username]);

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
                    <h1>Check out who wants to Addopt your Pets</h1>
                        <div className="flex-container-dashboard padd">
                            <span className="search-box">
                                <input type="search" placeholder="search" />
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
                            {data.pets.map((pet) => (
                                <div key={pet._id} className="table-box">
                                    <img src={pet.image} alt={pet.name} className="pet-image" />
                                    <div className="pet-info">
                                        
                                        <span>
                                            <h3>{pet.name}</h3>
                                            <p>Type: {pet.type}</p>
                                            <p>Gender: {pet.gender}</p>
                                            <p>Age: {pet.age}</p>
                                        
                                            <p>Color: {pet.color}</p>
                                            <p>Price: {pet.price}</p>
                                            
                                            <p>Date: {new Date(pet.date).toLocaleDateString()}</p>
                                        </span>
                                     
                                        <div className="applicants">
                                            <h4>Applicants:</h4>
                                            {pet.applicants.length > 0 ? (
                                                pet.applicants.map((applicant) => (
                                                    <div key={applicant.userId} className="applicant-info">
                                                        <p>User: {applicant.userName}</p>
                                                        <p>Applied Date: {new Date(applicant.appliedDate).toLocaleDateString()}</p>
                                                        <br/>
                                                        <button className="user-button">View User</button>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No applicants yet.</p>
                                            )}
                                        </div>
                                        <span>
                                        <p>Status: {pet.status}</p>
                                        </span>
                                        <span>
                                            <button className="btn-login">Disapprove</button>
                                            <button className="btn-signup">Approve</button>
                                        </span>
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
