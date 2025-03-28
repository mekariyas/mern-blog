import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { refreshToken } from "../util/token.js";

dotenv.config()

//verify authorization using token stored in cookie

export const authorization = async (req, res, next)=>{
    const token = req.cookies.jwt_token;
    if(!token){
       return res.status(401).json({message:"Unauthorized access, log in or sign up", success: false})
    }
    try{
        return jwt.verify(token, process.env.JWT_SECRET, (err, data)=>{
            if(data){
                return next()
            }
            else if (err.name === "TokenExpiredError"){
                const newToken = jwt.decode(token)
                if(!newToken){
                  return  res.status(403).json({message: "Invalid token data", success: false})
                }
                const newRefreshToken = refreshToken(newToken)
                res.cookie(
                    "jwt_token", newRefreshToken, {
                        httpOnly: true,
                        sameSite: "Lax",
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 30 * 24 * 60 * 60 * 1000
                    }
                )
                return next()
            }
            res.status(500).json({message:"Internal server error", success:false})
        })
    }
    catch(error){
        res.status(500).json({message:"Internal server error", success:false})
    }
}