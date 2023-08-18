import express from 'express';

import {createCategoryController,categoriesController} from './../controllers/categoryController.js';
import {isAdmin,requireSignIn} from './../middlewares/authMiddleware.js';
const router=express.Router();


router.post('/create-category',requireSignIn,isAdmin,createCategoryController);

router.get('/get-category',categoriesController);



export default router;

