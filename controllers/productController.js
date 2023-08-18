import productModel from '../models/productModel.js';
import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';
import fs from 'fs';

export const createProductController=async(req,res)=>{
	try{
		const{name,slug,description,price,quantity,shipping,category}=req.fields;
		const{photo}=req.files;

		switch(true){
		case !name:
	        	 return res.status(401).send({message:"Name is required"});
	        
	    case !description:
	        	 return res.status(401).send({message:"description is required"});
	        
	    case !price:
	        	return res.status(401).send({message:"price is required"});
	        
	    case !quantity:
	        	return res.status(401).send({message:"quantity is required"});
	        
	    case photo && photo.size>1000000:
	        	return res.status(401).send({message:"photo is required and should be less than 1mb"});
	        
	    case !category:
	        	return res.status(401).send({message:"category is required"});
	        

		}

	    const product=await new productModel({...req.fields,slug:slugify(name)})

	    if(photo){
	    	product.photo.data=fs.readFileSync(photo.path);
	    	product.photo.contentType=photo.type;
	    }
	    await product.save();


	    res.status(201).send({
	             	success:true,
	             	message:"Product saved",
	             	product,
	             });
     }catch(error){
     	console.log(error);

     	res.status(500).send({
			success:false,
			message:"Error in creating product",
		});
     }
}


export const getProductController=async(req,res)=>{
	try{
		const products=await productModel.find({category:req.params.cid}).populate("category").select("-photo").sort({createdAt:-1});
		res.status(200).send({
	             	success:true,
	             	countTotal:products.length,
	             	message:"Products obtained",
	             	products,

	             });
	    
     }catch(error){
     	console.log(error);

     	res.status(500).send({
			success:false,
			message:"Error in getting products",
		});
     }
}
export const productPhotoController=async(req,res)=>{
	try{
		
		const product=await productModel.findById(req.params.pid).select("photo");

		if(product.photo.data){
			res.set('Content-type',product.photo.contentType);
			res.status(200).send(product.photo.data);
		}
	    
     }catch(error){
     	console.log(error);

     	res.status(500).send({
			success:false,
			message:"Error in getting photo",
		});
     }


}
export const singleProductController=async(req,res)=>{
	try{
		
		const product=await productModel.findById(req.params.id).populate("category").select("-photo");
        res.status(200).send({
	             	success:true,
	             	message:"Product fetched",
	             	product,

	             });


	    
     }catch(error){
     	console.log(error);

     	res.status(500).send({
			success:false,
			message:"Error in getting product",
		});
     }


}








