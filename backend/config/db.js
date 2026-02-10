import mongoose from 'mongoose';

export const connectDb=async()=>{
    await mongoose.connect('mongodb+srv://nirumali:%40Pavan20000@cluster0.qjuumwo.mongodb.net/?appName=Cluster0')
    .then(()=>{
        console.log("connected db successfulley");
    })
}