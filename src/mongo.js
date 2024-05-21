const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/petsy", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err);
  });

  const registerPetSchema = new mongoose.Schema({
    image: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    status: {
      type: String,
      required: false,
      default: "pending",
    },
    adoptionApplied: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true,
        },
        userName: {
          type: String,
          required: true,
        },
        appliedDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  });
  
  

// Define the schema for users
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pets',
    required: false,
  }],
});

// Create models
const User = mongoose.model("users", userSchema);
const Pet = mongoose.model("Pets", registerPetSchema);

module.exports = { User, Pet };
