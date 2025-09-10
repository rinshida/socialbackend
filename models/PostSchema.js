import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    images:{type:Array,required: true},
    caption:{type:String,required: true},
    discription:{type:String,required: true},
    userId:{type:String,required: true},
    likes:{type:Number}
})









export default mongoose.models.Post || mongoose.model('Post',PostSchema)