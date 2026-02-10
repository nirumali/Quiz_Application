import express from 'express';
import cors from 'cors';
import 'dotenv';
import { connectDb } from './config/db.js';
const app=express();

const port=4000;

app.listen(port,()=>{
    console.log("server stated");
})

app.get("/",(req,res)=>{
    res.send("this is default route")
})
connectDb();