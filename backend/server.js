import express from 'express';
import cors from 'cors';
import 'dotenv';
import { connectDb } from './config/db.js';
import userRouter from './routes/userRoutes.js';
const app=express();
const port=4000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//DB
connectDb();
//Routes
app.use('/api/auth',userRouter)

app.listen(port,()=>{
    console.log("server stated");
})

app.get("/",(req,res)=>{
    res.send("this is default route")
})
