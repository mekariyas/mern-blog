import express from "express"
import { signUp, signIn,logOut,getUser } from "../controllers/userController.js"

const router = express.Router()
router.get("/:id", getUser)
router.post("/signUp", signUp)
router.post("/signIn", signIn)
router.get("/logOut", logOut)

export default router