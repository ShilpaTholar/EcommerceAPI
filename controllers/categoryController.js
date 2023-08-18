
import categoryModel from '../models/categoryModel.js';

import slugify from 'slugify';

export const createCategoryController=async(req,res)=>{
   try{
   	const {name}=req.body;
   	  if(!name){
        	return res.status(401).send({message:"Name is required"});
        }
       const existingcategory=await categoryModel.findOne({name});

        if(existingcategory){
             res.status(200).send({
             	success:false,
             	message:"Category Already exists",
             });

        }

         const category=await new categoryModel({name,slug:slugify(name)}).save();
                 res.status(201).send({
             	success:true,
             	message:"Category saved sucessfully",
             	category,
             });
        

   }catch(error){
   	console.log(error);
   	res.status(500).send({
			success:false,
			message:"Error in Category",
		});
   }
}


export const categoriesController=async(req,res)=>{
    try{
        const category=await categoryModel.find({});
         res.status(200).send({
               success:true,
               message:"All category list",
               category
             });
   
    }catch(error){
       console.log(error);
         res.status(500).send({
               success:false,
               message:"Error",
               error
          });
    }


}


