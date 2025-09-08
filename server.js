import express from "express"
import dotenv from "dotenv"
import Connection from "./connection.js"
import router  from "./Router.js"
import cors from "cors"

dotenv.config()

const port = process.env.PORT

const app = express()

 app.use(express.json({limit:"50mb"}))
 app.use(cors())
 app.use("/api",router)
Connection().then(()=>{
   app.listen(port,()=>{
      console.log(`server created at http://localhost:${port}`);
      
   })
})