const express= require("express")
const collection =require("./mongo")
const app=express();
const cors=require("cors")
const PORT =process.env.PORT ||5000
const bcrypt =require("bcryptjs");
app.use(cors());
app.use(express.json())

app.get("/",(req,res)=>{
    res.write("this is server page");
})
app.post("/signup",async(req,res)=>{
    const {useName,email,password}=req.body;
    const data={
        useName:useName,
        email:email,
        password:password
        
    }
    
    try{
        const check= await collection.findOne({email:email})
        console.log(check);
        if(check!=null){
            res.json("exits")
        }
        else{
           await collection.insertMany(data)
           res.json("not exits")
        }
        
    }
    catch(e){
        
        res.json(e)
    }
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    console.log(email);
    try{
        const check=await collection.findOne({email:email})

        console.log(check);
        if(check!=null){
            const passcompaer= await bcrypt.compare(password,check.password)
            if(passcompaer){
                res.json("exits")
            }
            else{
                res.json("notExits")
            }
            
        }
        else{
           res.json("notExits")
        }
    }
    catch(e){
        console.log(e);
        res.json(e)
    }
})

app.listen(PORT,(error)=>{

if(error){
    console.log(error);
}
else{
    console.log(`server is running on ${PORT}`);
}
})