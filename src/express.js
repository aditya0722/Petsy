const express = require("express");
const mongo = require("./mongo");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require('path');
const multer = require('multer');
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

const { User, Pet } = mongo;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads folder

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appends the current date to the filename
  },
});

const upload = multer({ storage: storage });

// Register pet route with Multer middleware
app.post("/registerpet", upload.single('image'), async (req, res) => {
  try {
    const { name, gender, type, age, color, price, username } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Get the image URL

    const user = await User.findOne({ userName: username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const petData = {
      image: imageUrl,
      name: name,
      gender: gender,
      type: type,
      age: age,
      color: color,
      price: price,
      user: user._id,
    };
    console.log(petData);

    const newPet = new Pet(petData);
    await newPet.save();

    user.pets.push(newPet._id);
    await user.save();

    res.json({ status: "success", pet: newPet });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User dashboard route
app.get("/userdashboard", async (req, res) => {
  try {
    const pets = await Pet.find().populate('user', 'userName');
    res.json(pets);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Signup route
app.post("/signup", async (req, res) => {
  const { useName, email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ status: "exists" });
    }
    console.log(password);


    const newUser = new User({
      userName: useName,
      email: email,
      password: password,
    });

    await newUser.save();
    res.status(201).json({ status: "not exists" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: "not exists" });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(req.body);
    console.log(user);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ status: "not exists" });
    }

    res.json({ status: "exists", username: user.userName });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server is running on ${PORT}`);
  }
});
