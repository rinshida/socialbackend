import mongoose  from "mongoose";


export default async function connection(){
    const db = await mongoose.connect("mongodb+srv://rinshidav0706_db_user:7NZlavMG1FQY7Ecg@cluster0.hmo52r2.mongodb.net/socialmedia") //db name
    console.log("database connected")
    return db
}