import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaShoppingCart, FaCog, FaSearch, FaCartPlus, FaRegistered, FaRegKiss, FaPenAlt, FaList, FaOutdent } from 'react-icons/fa';

export default function AppliedForAddoption({username, onLogout }) {
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
                <div className="list-container">
                    <div className="list">
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
            </div>
        </>
    )
}