import mongoose from 'mongoose';

const cartSchema=new mongoose.Schema(
{
	
	owner:{
	   type:mongoose.ObjectId,
       ref:'user',
       required:true,
	},
	items: [{
        itemId: {
            type: mongoose.ObjectId,
            ref: 'Product',
            required: true
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: Number
    }],
      
    bill: {
        type: Number,
        required: true,
        default: 0
    }
    
},

);

export default mongoose.model("Cart",cartSchema);