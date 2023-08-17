import userModel from '../models/userModel.js';

import {hashPassword,comparePassword} from './../helpers/authHelper.js';

import JWT from 'jsonwebtoken'

export const registerController= async(req,res)=>{
     try{
        const {name,email,password,phone,address}=req.body;

        if(!name){
        	return res.send({message:"Name is required"});
        }
         if(!password){
        	return res.send({message:"password is required"});
        }
         if(!email){
        	return res.send({message:"email is required"});
        }
         if(!address){
        	return res.send({message:"address is required"});
        }
         if(!phone){
        	return res.send({message:"phone no  is required"});
        }
       
        const existinguser=await userModel.findOne({email});

        if(existinguser){
             res.status(200).send({
             	success:false,
             	message:"User already registered",
             });
        }
        
        const hashedPassword=await hashPassword(password);

        const user=await new userModel({name,email,phone,address,password:hashedPassword}).save();
        
        res.status(201).send({
             	success:true,
             	message:"User registered sucessfully",
             	user,
             });
	}catch(error){
		console.log(error);

		res.status(500).send({
			success:false,
			message:"Error in user Registration",
			error
		});

	}
};

export const loginController=async(req,res)=>{
     try{
        const {email,password}=req.body;

        if(!email || !password){
          return res.status(404).send({
               success:false,
               message:"Invalid email or password"
               
          });
        }
     const user=await userModel.findOne({email});
     if(!user){
          return res.status(404).send({
               success:false,
               message:"Email is not registered"
               
          });
     }
     const match=await comparePassword(password,user.password);

     if(!match){
           return res.status(200).send({
               success:false,
               message:"Invalid Password"
               
          });
     }
     const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d',});

     res.status(200).send({
               success:true,
               message:"LoggedIn Sucessfully",
               user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    address:user.address,
                    role:user.role
               },
               token,
             });
     }catch(error){
          console.log(error);
          res.status(500).send({
               success:false,
               message:"Error in Login",
               error
          });
     }

}