import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaShoppingCart,FaHome, FaCog, FaSearch, FaCartPlus,FaDog, FaRegistered, FaRegKiss, FaPenAlt, FaList, FaOutdent } from 'react-icons/fa';
import axios from "axios";

export default function Registerpet({ username, onLogout }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setname] = useState("");
    const [gender, setgender] = useState("");
    const [type, settype] = useState("");
    const [age, setage] = useState(0);
    const [color, setcolor] = useState("");
    const [price, setprice] = useState(0);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    function formSubmitHandller(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("image", selectedImage);
            formData.append("name", name);
            formData.append("gender", gender);
            formData.append("type", type);
            formData.append("age", age);
            formData.append("color", color);
            formData.append("price", price);
            formData.append("username", username);

            axios.post("https://petsy-ho9v.vercel.app/registerpet", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                if (res.data.status === "success") {
                    alert("Registration Successful");
                } else {
                    alert("Something went wrong");
                }
            })
        } catch (e) {
            console.log(e);
        }
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
                <div className="dashboard-content-register">
                    <div className="form-left">
                        <h1>Register Pets Here</h1>
                    </div>
                    <div className="container">
                        <form className="form" onSubmit={formSubmitHandller}>
                            <div className="row">
                                <div className="image-preview">
                                    {selectedImage ? (
                                        <img src={URL.createObjectURL(selectedImage)} alt="Selected Pet" className="preview-image" />
                                    ) : (
                                        <div className="placeholder">Preview</div>
                                    )}
                                </div>
                                <div className="upload">
                                    <label htmlFor="image">Upload Image:</label>
                                    <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" id="name" name="name" placeholder="Pet's name" onChange={(e) => setname(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="gender">Gender:</label>
                                    <select id="gender" name="gender" className="selct-gen" onChange={(e) => setgender(e.target.value)}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="type">Type:</label>
                                    <input type="text" id="type" name="type" placeholder="Type of pet" onChange={(e) => settype(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="age">Age:</label>
                                    <input type="number" id="age" name="age" placeholder="Age of pet" onChange={(e) => setage(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="color">Color:</label>
                                    <input type="text" id="color" name="color" placeholder="Color of pet" onChange={(e) => setcolor(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Price:</label>
                                    <input type="number" id="price" name="price" placeholder="Price of pet" onChange={(e) => setprice(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <button type="submit">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
