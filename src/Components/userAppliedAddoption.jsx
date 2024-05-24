import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserPop from "../popups/user";
import { confirmAlert } from "react-confirm-alert";
import { FaPenAlt, FaList, FaHome, FaCartPlus, FaOutdent, FaSearch, FaDog } from 'react-icons/fa';
import { RxExit, RxPerson } from "react-icons/rx";

export default function UserAppliedAdoption({ username, onLogout }) {
    const [data, setData] = useState({ pets: [], appliedUsers: [] });
    const [selectedUser, setSelectedUser] = useState(null);
    function userPop(item){
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='userdata success'>
                       <div className="user-header">
                        <span><h3><RxPerson/>{username}</h3></span>
                        <RxExit onClick={onClose} className="confirm-button orange"/>
                       
                        </div> 
                    </div>
                );
            }
        });
    }


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
                    <h2><Link to="/userDashboard"> <FaHome className="icon" />Dashboard</Link></h2>
                    <ul>
                        <li><Link to="/Registerpet"><FaPenAlt className="icon" /> Register for Selling Pets</Link></li>
                        <li><Link to="/PetAdoptionList"><FaList className="icon" /> Pet Selling List</Link></li>
                        <li><Link to="/AppliedForAddoption"><FaCartPlus className="icon" />Your Application for Addoption</Link></li>
                        <li><Link to="/userAppliedAddoption"><FaDog className="icon" />User Application for Addoption </Link></li>
                        <li><Link to="/" onClick={onLogout}><FaOutdent className="icon" onClick={onLogout} />Log out</Link></li>
                    </ul>
                </div>

                <div className="list-container">
                    <div className="list">
                        <h1>Check out who wants to Adopt your Pets</h1>
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
                            {data.appliedUsers.length > 0 ? (
                                data.pets.map((pet) => (
                                    <div key={pet._id} className="table-box">
                                        <span className="img-text">
                                            <img src={pet.image} alt={pet.name} />

                                            <h2><b>  &nbsp;&nbsp;&nbsp;{pet.name}</b></h2>
                                        </span>

                                        <div className="pet-info">
                                            <span></span>
                                            <span className="tex-align-center">

                                                <br />
                                                <p><b>Type:</b> {pet.type}</p>
                                                <p><b>Gender:</b> {pet.gender}</p>
                                                <p><b>Age:</b> {pet.age}</p>
                                                <p><b>Color:</b> {pet.color}</p>
                                                <br />

                                                <h3><b>Price:</b> {pet.price}</h3>

                                                <br />
                                                <p><b>Date:</b> {new Date(pet.date).toLocaleDateString()}</p>
                                            </span>

                                            <div className="applicants">
                                                <h4>Applicants:</h4>
                                                <br />
                                                {pet.applicants.length > 0 ? (


                                                    <button className="user-button" onClick={() => userPop(pet)}>View User</button>


                                                ) : (
                                                    <p>No applicants yet.</p>
                                                )}
                                            </div>

                                            <span>
                                                <p>Status: {pet.status}</p>

                                            </span>

                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h1>No applicants yet.</h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
