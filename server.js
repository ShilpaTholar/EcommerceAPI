import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';
import cartRoutes from './routes/cartRoute.js';
import orderRoutes from './routes/orderRoute.js';


dotenv.config();

const app=express();

//database config
connectDB();

app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);
app.use("/api/v1/cart",cartRoutes);
app.use("/api/v1/order",orderRoutes);

app.get('/',(req,res)=>{
	res.send("<h1>Welcome to Ecommerce app</h1>")
});



const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
	console.log(`Server listening on port ${PORT}`);
});

