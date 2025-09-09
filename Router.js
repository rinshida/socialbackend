import { Router } from "express";
import * as  rh from "./ReqHandler.js"
import Auth from './middlewares/Auth.js'

const router = Router()

router.route("/getposts").get(Auth,rh.getPostsFunction)
// router.route("/test").post(rh.SampleFunction)
// router.route("/edit").put(rh.editUserFunction)
// // router.route("/getuser").post(rh.getOneUserFunction)
// router.route("/getuser/:id").get(rh.getOneUserFunction)
// router.route("/remove").delete(rh.deleteUserFunction)
router.route("/register").post(rh.registerUser)
router.route("/login").post(Auth,rh.loginUser)
router.route("/addpost").post(Auth,rh.addPost)
router.route("/like").post(rh.likeFuction)
router.route("/otp").post(rh.generateOTP)
router.route("/otpverification").post(rh.otpVerification)

export default router