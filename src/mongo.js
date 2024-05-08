const mongose=require("mongoose")

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

const collection = mongose.model("users", newSchema); 

module.exports = collection;
