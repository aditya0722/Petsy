const express= require("express")
const collection =require("./mongo")
const app=express();
const PORT =process.env.PORT ||5000

app.use(express.json())

app.post("/signup",async(req,res)=>{
    const {user,email,password}=req.body;
    const data={
        user:user,
        email:email,
        password:password
    }
    try{
        const check= await collection.findOne({email:email})
        if(check){
            res.json("exits")
        }
        else{
           await collection.insertMany(data)
        }
        
    }
    catch(e){
        res.json("notexits")
    }
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const check=await collection.findOne({email:email,password:password})
        if(check){
            res.json("exits")
        }
        else{
           res.json("notExits")
        }
        
    }
    catch(e){
        res.json("notExits")
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