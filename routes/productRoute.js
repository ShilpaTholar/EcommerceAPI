import express from 'express';

import {createProductController,
getProductController,
productPhotoController,
singleProductController
} from '../controllers/productController.js';

import {isAdmin,requireSignIn} from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';
const router=express.Router();

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);

router.get('/get-products/:cid',getProductController);

router.get('/product-photo/:pid',productPhotoController);

router.get('/get-product/:id',singleProductController);



export default router;

