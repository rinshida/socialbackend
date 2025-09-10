import mongoose from "mongoose"

const OTPSchema = new mongoose.Schema({
    email:{type:String,required: true},
    otp:{type:Number,required: true}
})

export default mongoose.models.Otp || mongoose.model('Otp',OTPSchema)