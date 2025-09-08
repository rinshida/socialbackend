import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    images:{type:Array,require:true},
    caption:{type:String,require:true},
    discription:{type:String,require:true},
    userId:{type:String,require:true},
    likes:{type:Number}
})

export default mongoose.models.Post || mongoose.model('Post',PostSchema)