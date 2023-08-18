import express from 'express';

import {orderplacementController,orderhistoryController,orderController} from '../controllers/orderController.js';
import {isAdmin,requireSignIn} from '../middlewares/authMiddleware.js';
const router=express.Router();

router.post("/place-order",requireSignIn,orderplacementController);

router.get("/order-history",requireSignIn,orderhistoryController);

router.get("/get-order/:id",requireSignIn,orderController);

export default router;