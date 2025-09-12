import pkg from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()
const {verify} = pkg

export default function auth(req,res,next){
try {
    const key = req.headers.authorization;
    // console.log(key)
    if(!key){
        return res.status(404).send("unautherized data")
    }
    const token = key.split(" ")[1] //array [0]-barer,array[1] - token
    // console.log(token)
    const auth = verify(token,process.env.JWT_TOKEN) 
    console.log("auth : "+auth)
    req.user = auth;
    console.log("I am in auth")
    next()
    
} catch (error) {
    console.log(error);
    return res.send(401).send("token expired or something went wrong")
    
    
}
}