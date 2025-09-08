import mongoose from "mongoose"

const OTPSchema = new mongoose.Schema({
    email:{type:String,require:true},
    otp:{type:Number,require:true},
})

export default mongoose.models.Otp || mongoose.model('Otp',OTPSchema)