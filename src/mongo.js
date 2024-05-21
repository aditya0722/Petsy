const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sharmaaaditya167:oT4SzT9CZTkvhtYa@users.lofs8gm.mongodb.net/users?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // Ensure SSL is enabled
  tlsAllowInvalidCertificates: false, // Set to false for production
  tlsAllowInvalidHostnames: false, // Set to false for production
})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err);
  });

// Define the schema for pets
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
    ref: 'Pets', // Ensure the ref matches the Pet model name
    required: false,
  }],
});

// Create models
const User = mongoose.model("users", userSchema);
const Pet = mongoose.model("Pets", registerPetSchema);

module.exports = { User, Pet };
