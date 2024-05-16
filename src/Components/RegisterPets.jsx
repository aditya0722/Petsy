import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaShoppingCart, FaCog, FaSearch, FaCartPlus, FaRegistered, FaRegKiss, FaPenAlt, FaList, FaOutdent } from 'react-icons/fa';
import axios from "axios";
import fs from "fs";

export default function Registerpet({ username, onLogout }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setname] = useState("");
    const [gender, setgender] = useState("");
    const [type, settype] = useState("");
    const [age, setage] = useState(0);
    const [color, setcolor] = useState("");
    const [price, setprice] = useState(0);
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
        reader.onload = async () => {
            // Create an image element
            const img = new Image();
            img.src = reader.result;
    
            // Once the image is loaded, resize it
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 600;
                let width = img.width;
                let height = img.height;
    
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
    
                canvas.width = width;
                canvas.height = height;
    
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
    
                // Convert the canvas to base64 encoded image data
                const compressedImage = canvas.toDataURL('image/jpeg', 0.8);
    
                // Log the sizes of original and compressed images
                console.log('Original image size:', file.size, 'bytes');
                console.log('Compressed image size:', getImageSize(compressedImage), 'bytes');
    
                setSelectedImage(compressedImage);
            };
        };
    };
    
    // Function to calculate the size of base64 image data
    const getImageSize = (base64String) => {
        // Remove header
        const base64StringWithoutHeader = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
        // Calculate size in bytes
        return Math.ceil(base64StringWithoutHeader.length * 0.75);
    };
    
    function formSubmitHandller(e) {
        e.preventDefault();
        try {
            
            console.log("here");
            axios.post("http://localhost:5000/registerpet", {
                selectedImage,
                name,
                gender,
                type,
                age,
                color,
                price,
                username
            }).then(res => {
                if (res.data == "success") {
                    console.log("Registration Successfull");
                }
                else {
                    console.log("Somethig went wrong");
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    }
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
                <div className="dashboard-content-register">
                    <div className="form-left">
                        <h1>Register Pets Here</h1>
                    </div>
                    <div className="container">
                        <form className="form"  method="post">
                            <div className="row">
                                <div className="image-preview">
                                    {selectedImage ? (
                                        <img src={selectedImage} alt="Selected Pet" className="preview-image" />
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
                                    <input type="submit" value="Submit" onClick={formSubmitHandller}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}