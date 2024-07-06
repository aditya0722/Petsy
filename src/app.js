require('dotenv').config();
const express = require("express");
const mongo = require("./mongo");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require('path');
const multer = require('multer');
const bodyParser = require("body-parser");
const { error } = require("console");

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
    if(imageUrl===null||name===""||gender===""||type===""||age=="0"||color===""||price=="0"||username===""){
      return res.status(500).json({error:"Details Incomplete"})
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
    const pets = await Pet.find({status:"pending"}).populate('user', 'userName');
    res.json(pets);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Signup route
app.post("/signup", async (req, res) => {
  const { useName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email,useName });

    if (existingUser) {
      return res.status(409).json({ status: "exists" });
    }


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
app.post("/adoptpet",async(req,res)=>{
  const {id,username}=req.body;
  console.log(req.body);
  try{
    const pet=await Pet.findById(id);
    const user=await User.findOne({userName:username})
    //if(!user){
      console.log(username);
      console.log(user);
    
    if(!pet){
      return res.status(400).json({status:"pet not found"})
    }

    // Check if Pet.adoptionApplied is not null before using it
    if (pet.adoptionApplied != null) {
      // Check if the user has already applied
      const alreadyApplied = pet.adoptionApplied.some(
        (application) => application.userId.toString() === user._id.toString()
      );
      
      if (alreadyApplied) {
        
        return res.status(400).json({ status: "already adoption" });
      }
    }
   

    
    const user_id=user._id;
    pet.adoptionApplied.push({userId:user_id,userName:username})
    await pet.save()
    return res.status(200).json({status:"success"});
  }
  catch(e){
    console.log(e);
    res.status(500).json({error:"Internal Server Error"})
  }
})


app.get("/addoptionapplied", async (req, res) => {
  const { username } = req.query;
  console.log(req.body); 
  try {
    // Find the user by username and convert to plain object
    const user = await User.findOne({ userName:username }).lean();
    // If the user is not found, send a 404 response
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Get the user's ID
    const userId = user._id;
    // Find pets where the user has applied for adoption and convert to plain objects
    const pets = await Pet.find( { "adoptionApplied.userId": userId }).lean();
    // Send the pets as a JSON response
    res.json(pets);
   
  } catch (e) {
    // Log the error and send a 500 response
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/deleteaddoption", async (req, res) => {
  const { id, username } = req.body; // Destructure id and username from req.body
  try {
    // Find the user by username
    const user = await User.findOne({ userName: username });
    
    // If the user is not found, send a 404 response
    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }
    
    // Get the user's ID
    const userID = user._id;

    // Find the pet by ID and update the adoptionApplied array
    const pet = await Pet.findById(id);

    // If the pet is not found, send a 404 response
    if (!pet) {
      return res.status(404).json({ status: "Pet not found" });
    }

    // Remove the specific adoption application from the array
    pet.adoptionApplied = pet.adoptionApplied.filter(app => !app.userId.equals(userID));
    
    // Save the updated pet document
    await pet.save();

    // Send a success response
    res.status(200).json({ status: "success" });
  } catch (e) {
    // Log the error and send a 500 response
    console.error(e);
    res.status(500).json({ status: "Internal Server Error" });
  }
});
app.get("/userAppliedAdoption", async (req, res) => {
  const { username } = req.query;
  
  try {
      // Find the user by username
      const user = await User.findOne({ userName: username });
      
      // If user not found, return 404
      if (!user) {
          return res.status(404).json({ status: "User Not Found" });
      }
      
      // Get the pet IDs the user has added for adoption
      const userPets = user.pets;
      
      // Find pets by these IDs
      const pets = await Pet.find({ _id: { $in: userPets } }).lean();
      
      // Collect applied user IDs and details of applied users
      const appliedUserIds = new Set();
      const petDetailsWithApplicants = pets.map(pet => {
          const applicants = pet.adoptionApplied.map(application => {
              appliedUserIds.add(application.userId);
              return {
                  userId: application.userId,
                  userName: application.userName,
                  appliedDate: application.appliedDate,
              };
          });
          return {
              ...pet,
              applicants
          };
      });
      
      // Find unique users who have applied for adoption
      const appliedUsers = await User.find({ _id: { $in: Array.from(appliedUserIds) } }).lean();

      // Return both pet details and applied user details
      return res.status(200).json({
          status: "success",
          pets: petDetailsWithApplicants,
          appliedUsers
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "Server Error" });
  }
});


app.get("/getadoptionlist", async (req, res) => {
  const { username } = req.query;

  try {
    // Find the user by username
    const user = await User.findOne({ userName: username }).lean();
    if (!user) {
      return res.status(400).json({ status: "User Not Found" });
    }

    // Get the user's pets array
    const userId = user._id;

    // Find all pets where the pet IDs match the user's pets
    const pets = await Pet.find({ user:userId}).lean();
    console.log(pets);
    // Send the pets as a JSON response
    res.status(200).json({ status: "success", pets });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: "Internal Server Error" });
  }
});

app.post("/deleteselling", async (req, res) => {
  const { username, id } = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({ userName: username });
    if (!user) {
      return res.status(400).json({ status: "User not Found" });
    }

    // Filter the pets array based on the provided ID
    user.pets =await user.pets.filter(petId => !petId.equals(id));
    await Pet.findByIdAndDelete(id)
    // Save the updated user
    await user.save();

    // Send a success response
    res.status(200).json({ status: "success" });

  } catch (e) {
    console.log(e);
    res.status(500).json({ status: "Internal Server Error" });
  }
});
//pet Adopting Disapprove Route
app.post("/updateAdoptionDis",async(req,res)=>{
  const{item}=req.body;
  try{

  
  const pet= await Pet.findById(item._id)
  const id=pet._id;
  pet.updateOne(pet.map(item=>{
    if(item._id==id){
      item.status="disapprove";
    }
    
  }))
  await pet.save();
  res.status(200).json({status:"success"});
}
catch(e){
  console.log(e);
  res.status(500).json({status:"error"});
}

})
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
