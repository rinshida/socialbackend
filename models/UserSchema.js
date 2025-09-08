import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    profile:{type:String,require:true},
    likedPosts:{type:Array}
})

export default mongoose.models.User || mongoose.model('User',UserSchema)