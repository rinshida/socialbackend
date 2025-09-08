import mongoose  from "mongoose";
import dotenv from "dotenv"

dotenv.config()


export default async function connection(){
    const db = await mongoose.connect(process.env.mongo_url) //db name
    console.log("database connected")
    return db
}