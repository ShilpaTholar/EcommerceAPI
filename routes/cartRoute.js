import express from 'express';

import {createCartController,viewCartController,deleteProductfromcartController} from '../controllers/cartController.js';
import {isAdmin,requireSignIn} from '../middlewares/authMiddleware.js';
const router=express.Router();



router.post("/create-cart",requireSignIn,createCartController);

router.get("/view-cart",requireSignIn,viewCartController);

router.delete("/delete-cart/:id",requireSignIn,deleteProductfromcartController);




export default router;