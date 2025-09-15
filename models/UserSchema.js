import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{type:String,required: true},
    email:{type:String,required: true,unique: true},
    password:{type:String,required: true},
    profile:{type:String,required: true},
    verified:{type:Boolean,required: true},
    likedPosts:{type:Array},
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    following:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
})

export default mongoose.models.User || mongoose.model('User',UserSchema)