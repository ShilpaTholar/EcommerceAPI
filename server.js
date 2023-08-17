import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';


dotenv.config();

const app=express();

//database config
connectDB();

app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1/auth",authRoutes);

app.get('/',(req,res)=>{
	res.send("<h1>Welcome to Ecommerce app</h1>")
});



const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
	console.log(`Server listening on port ${PORT}`);
});

