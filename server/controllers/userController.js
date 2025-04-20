const UserModel=require('../models/userModel');
const jwt=require('jsonwebtoken');

const JWT_SECRET=process.env.JWT_SECRET;
const JWT_REFRESH_SECRET=process.env.JWT_REFRESH_SECRET;

const register= async(req,res)=>{
    const {username,email,password}=req.body;
    try {
        const user=await UserModel({username,email,password});
        await user.save();
        res.status(201).json(user);
        
    } catch (error) {
        res.status(500).json({message:error});
    }
}

const login= async (req,res)=>{
    const{email,password}=req.body;
    try {
        const user=await UserModel.findOne({email});
        if(!user){
        return res.status(404).json({message:'User Not Found'});
        }
        const isMatch=await user.matchPassword(password);
        if(!isMatch){
          return  res.status(401).json({message:"Invalid credentials"});
        }
         res.status(200).json({message:'Login successful'});
    } catch (error) {
        res.status(500).json({message:error});
    }
}
module.exports={register,login};