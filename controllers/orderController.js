import productModel from '../models/productModel.js';
import categoryModel from '../models/categoryModel.js';
import cartModel from '../models/cartModel.js';
import orderModel from '../models/orderModel.js';
import {requireSignIn} from '../middlewares/authMiddleware.js';


export const orderplacementController=async(req,res)=>{
		try {
        const owner = req.user._id;
       
        let cart = await cartModel.findOne({owner})
        let user = req.user
        if(cart) {     
          const order = await new orderModel({
              owner,
              items: cart.items,
              bill: cart.bill
          }).save();
          
          const data = await cartModel.findByIdAndDelete({_id: cart.id})
          return res.status(201).send({message: 'Order placed successfully', order})
                 
            }
            

          

         else {
            res.status(400).send('No products found in cart')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Error')
        
    }
}
export const orderhistoryController=async(req,res)=>{
		const owner = req.user._id;
    try {
        const order = await orderModel.find({ owner: owner });
        if(order) {
            return res.status(200).send(
            	{message: 'Order history obtained successfully', 
            	 order,
            }
            	)
        }
        res.status(404).send('No orders found')
    } catch (error) {
        res.status(500).send()
    }
}

export const orderController=async(req,res)=>{
		const owner = req.user._id;
		const id=req.params.id;
		
    try {
        const order = await orderModel.findById(id);
        if(order) {
            return res.status(200).send(
            	{message: 'Order obtained successfully', 
            	 order,
            }
            	)
        }
        res.status(404).send('Order not found')
    } catch (error) {
        res.status(500).send()
    }
}

		




