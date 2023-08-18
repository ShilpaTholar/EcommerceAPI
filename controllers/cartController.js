import productModel from '../models/productModel.js';
import categoryModel from '../models/categoryModel.js';
import cartModel from '../models/cartModel.js';
import {requireSignIn} from '../middlewares/authMiddleware.js';


export const createCartController=async(req,res)=>{
	try{

		const owner=req.user._id;
		const {itemId,quantity}=req.body;
		
     const cart = await cartModel.findOne({ owner});
     const item = await productModel.findOne({ _id: itemId});

    if (!item) {
      res.status(404).send({ message: "Product not found" });
      return;
    }
     const price = item.price;
     const name = item.name;
		
        if (cart) {
		      const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
		      

		      if (itemIndex > -1) {
		        let product = cart.items[itemIndex];
		        product.quantity += quantity;

		        cart.bill = cart.items.reduce((acc, curr) => {
		            return acc + curr.quantity * curr.price;
		        },0)
		        
		        cart.items[itemIndex] = product;
		        await cart.save();
		        res.status(200).send(cart);
      } 
      else {
        cart.items.push({ itemId, name, quantity, price });

        cart.bill = cart.items.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
        },0)

        await cart.save();
        res.status(200).send({
        	success:true,
        	message:"Product addded to cart"
        });
      }
    } else {
      console.log(owner);
      const newCart = await new cartModel({
        owner:req.user._id,
        items: [{ itemId, name, quantity, price }],
        bill: quantity * price,
      }).save();
      return res.status(201).send(newCart);
    
 }  }
 catch (error) {
    console.log(error);
    res.status(500).send({
			success:false,
			message:"Error in adding product to cart",
		});
  }
}
	    


export const viewCartController=async(req,res)=>{
		const owner = req.user._id;

		  try {
		    const cart = await cartModel.findOne({ owner });
		    if (cart && cart.items.length > 0) {
		      res.status(201).send({
		        	success:true,
		        	message:"Product fetched from cart",
		        	cart,
	        });
		    } else {
		      res.send({
	        	success:true,
	        	message:"No products in cart"
	        });
		    }
		  } catch (error) {
		    res.status(500).send({
			success:false,
			message:"Error",
		});
		  }
		}





export const deleteProductfromcartController=async(req,res)=>{
		  const owner = req.user._id;
	     const itemId = req.params.id;
		  try {
		    let cart = await cartModel.findOne({ owner });
          console.log(itemId);
		    const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
		    console.log(itemIndex+"inddd");
		    if (itemIndex > -1) {
		      let item = cart.items[itemIndex];
		      cart.bill -= item.quantity * item.price;

		      if(cart.bill < 0) {
		          cart.bill = 0
		      } 

		      cart.items.splice(itemIndex, 1);

		      cart.bill = cart.items.reduce((acc, curr) => {
		        return acc + curr.quantity * curr.price;
		    },0)
		      cart = await cart.save();

		      res.status(200).send({success:true,
				        	message:"Product deleted from cart",
				        	cart,
			        }
		      	);
		    } else {
		         res.status(404).send("Product not found");
		    }
		  } catch (error) {
		    console.log(error);
		    res.status(500).send({
					success:false,
					message:"Error",
				});
		  }
}
		
		  




