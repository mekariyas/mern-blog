import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

//create access token
export const accessToken = ({id, role})=>{
    return jwt.sign({id, role},process.env.JWT_SECRET, {expiresIn: "1h"})
}
//create refresh token
export const refreshToken = ({id, role})=>{
    return jwt.sign({id, role}, process.env.JWT_SECRET, {expiresIn: "30d"})
}
