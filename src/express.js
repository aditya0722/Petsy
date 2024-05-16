const express = require("express")
const mongo = require("./mongo")
const app = express();
const cors = require("cors")
const PORT = process.env.PORT || 5000
const bcrypt = require("bcryptjs");

const collection = mongo.collection;
const petregister = mongo.petregister;
const fs = require("fs");
const {v4 : uuidv4}= require("uuid");
const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('public'));

// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.post("/registerpet", async (req, res) => {
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString(); 
    
    try {
        console.log(req.body);
        const { selectedImage, name, gender, type, age, color, price,username } = req.body;
        const imageFileName = uuidv4() + ".jpg"; // Example: abc123.jpg

        // Write the image data to a folder on your server
        const imagePath = `./public/Images/${imageFileName}`;
        fs.writeFileSync(imagePath, selectedImage, "base64");

        const imageUrl = `Images/${imageFileName}`;
        const data = {
            image: imageUrl,
            name: name,
            gender: gender,
            type: type,
            age: age,
            color: color,
            price: price,
            date: formattedDate,
            user:username
        }
        await petregister.insertMany(data);
        res.json("success")
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }

})


app.post("/signup", async (req, res) => {
    const { useName, email, password } = req.body;
    const data = {
        useName: useName,
        email: email,
        password: password

    }

    try {
        const check = await collection.findOne({ email: email })

        if (check != null) {
            res.json("exits")
        }
        else {
            await collection.insertMany(data)
            res.json("not exits")
        }

    }
    catch (e) {

        res.json(e)
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = await collection.findOne({ email: email })


        if (check != null) {

            const passcompaer = await bcrypt.compare(password, check.password)
            console.log(passcompaer);
            if (passcompaer === true) {
                console.log(check.useName);
                res.json({ status: "exits", username: check.useName })

            }
            else {
                res.json("notExits")
            }

        }
        else {
            res.json("notExits")
        }
    }
    catch (e) {

        res.json(e)
    }
})

app.listen(PORT, (error) => {

    if (error) {
        console.log(error);
    }
    else {
        console.log(`server is running on ${PORT}`);
    }
})