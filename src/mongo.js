const mongose=require("mongoose");


mongose.connect("mongodb://localhost:27017/petsy")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err);
  });

const newSchema = new mongose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: { 
    type: String,
    required: true,
  },
  useName: { 
    type: String,
    required: true,
  },
});

const registeruser=new mongose.Schema({
  image:{
    type:String,
    required:false,
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
    type:   Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  user: {
    type:String,
    required: true,
  },

})
const collection = mongose.model("users", newSchema); 
const petregister=mongose.model("pets",registeruser);

module.exports = {collection,petregister};
