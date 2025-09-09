import { ObjectId } from "bson"
import UserSchema from "./models/UserSchema.js"
import bcrypt from 'bcrypt'
import PostSchema from "./models/PostSchema.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import otp from "./models/OTPSchema.js"
import nodemailer from "nodemailer"
dotenv.config()
///////////////////////
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rinshidav0706@gmail.com",
    pass: "vrvk pjoz eobl jjph",
  },
});
//----------------otp generation function----------------------
export async function generateOTP(req,res){
    try {        
const {email} = req.body

// const userExist = await UserSchema.findOne({email:email})
// console.log(userExist);
// if(userExist){
//     return res.status(200).send("user alredy exist")
// }
const otpexist = await otp.findOne({email:email})
const newotp = Math.floor(1000+Math.random()*9000)
if(otpexist){
const changeotp = await otp.updateOne(
    {email:email},{$set:{otp:newotp}}
)}else{
    const newdata = await otp.create({email,otp:newotp})
      
}
const info = await transporter.sendMail({
    from: 'rinshidav0706@gmail.com',
    to: email,
    subject: "verification",
    text: "Hello world?", // plain‑text body
    html: `${newotp}`, // HTML body
  });

  
return res.status(200).send("otp sented successfully")

    } catch (error) {
        console.log(error)
    }
}
//-------------------otp verification---------------------------------
export async function otpVerification(req,res){
    const {OTP} = req.body
    console.log(OTP)
    try {
        const otpVerify =  await otp.findOne({otp:OTP})
        console.log(otpVerify)
        if(otpVerify){
            console.log("hello")
            res.status(200).send("otp verified")
            console.log("otp verified")
        }

        else{
             res.status(500).send("otp incorrect")
            console.log("otp incorrect")
        }
        
    } catch (error) {
        
    }

}




//------------------signup--------------------------------
export async function registerUser(req,res){
    const {name,email,password,profile} = req.body
    // console.log(name,email,password,profile)
    try {
        const userExist =  await UserSchema.findOne({email:email})
        if(userExist){
            res.status(500).send("user already exist")
            console.log("user already exist")
        }

         const hpass = await bcrypt.hash(password,10)
        //  console.log(hpass);
          
        const newUser = await UserSchema.create({name,email,password:hpass,profile})


        //token generation         payload:data that pass through token
         const token = jwt.sign({userId:newUser._id},process.env.JWT_TOKEN,{expiresIn:'24h'})
         
         

        if(newUser){
            res.status(200).send({token})
            
        }else{
            res.status(404).send("can't create user")
        }
        
    } catch (error) {
        
    }

}

//----------------------------login-----------------------

export async function loginUser(req,res){
    
    const {email,password} = req.body

    try{
        const user =  await UserSchema.findOne({email:email})
        const userData = await bcrypt.compare(password,user.password)
        console.log(userData);

        const token = jwt.sign({userId:user._id},process.env.JWT_TOKEN,{expiresIn:'24h'})
        
    

        if(userData){
            // res.status(200).send({id:user._id})
            res.status(200).send({token})
            // res.status(200).send({data:user})
            
        }else{
            res.status(404).send("password incorrect")
        }
    }catch(error){
        res.status(500).send("error creating data")
    }
}

//////////////////////////add post////////////////////////
export async function addPost(req,res){
    const {caption,discription,images} = req.body
    // console.log(caption,discription,images,userId)
    const userr = req.user
    console.log(userr);
    const userId = userr.userId
    console.log("getPostsFunction")

    try {
        const userExist =  await UserSchema.findOne({_id:new ObjectId(userId)})
        console.log(userExist)
       if(userExist){
           const newPost = await PostSchema.create({caption,discription,images,userId})

        if(newPost){
            res.status(200).send({data:newPost})
            console.log('success')
            
        }else{
            res.status(500).send("can't create post")
            console.log('failed')
        }
    }else{
            res.status(404).send("user dosen't exist")
            console.log("user don't exist")
        }
        
    } catch (error) {
        console.log(error)   
    }
}
/////////////////posts////////////////////////////////
export async function getPostsFunction(req,res){

    const userr = req.user
    console.log(userr);
    const userId = userr.userId
    console.log("getPostsFunction")
    
    try{
        const posts =  await PostSchema.find()
        const user = await UserSchema.findOne({_id:new ObjectId(userId)})
        // console.log(user);
        
        if(posts){
            res.status(200).send({user,data:posts})
            // res.status(200).send({data:user})
          
            
        }else{
            res.status(404).send("can't find posts")
            console.log("can't find posts");
            
        }
    }catch(error){
        res.status(500).send(error)
    }
}
//----------------------------------like------------------

export async function likeFuction(req,res){
    const {userId,productId,likeState} = req.body
    console.log(userId,productId,likeState)

    try {
        const userExist =  await UserSchema.findOne({_id:new ObjectId(userId)})
        console.log(userExist)
       if(userExist){

        const productExist =  await PostSchema.findOne({_id:new ObjectId(productId)})
        let likedPost 
        let likedUser
        if(productExist){
            if(likeState===true){
                console.log("like true");
                
          likedPost = await PostSchema.updateOne({_id:new ObjectId(productId)},{$inc: { likes: 1 } })
           likedUser = await UserSchema.updateOne({_id:new ObjectId(userId)},{ $addToSet: { likedPosts: productId }})

            }else{
                  console.log("like false");
           likedPost = await PostSchema.updateOne({_id:new ObjectId(productId)},{$inc: { likes: -1 } })
           likedUser = await UserSchema.updateOne({_id:new ObjectId(userId)},{$pull:{likedPosts:productId}})


            }
        }

        if(likedPost){
            res.status(200).send({data:likedPost})
            console.log('like function success')
            
        }else{
            res.status(500).send("can't like post")
            console.log('failed like')
        }
    }else{
            res.status(404).send("user dosen't exist")
            console.log("user don't exist")
        }
        
    } catch (error) {
        
    }

}