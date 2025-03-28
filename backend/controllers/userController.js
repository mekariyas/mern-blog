import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { accessToken, refreshToken} from "../util/token.js"


export const getUser = async(req,res)=>{
  const { id } = req.params;
  if(!id){
    return res.status(400).json({message:"Invalid or empty id", success: false})
  }
  try{
    const getUser = await User.findById(id)
    if(!getUser){
      return res.status(404).json({message: "User not found", success: false})
    }
    return res.status(200).json({firstName:getUser.firstName, lastName:getUser.lastName, userName:getUser.username})
  }
  catch(error){
    console.log(`Error: ${error.message}`)
    return res.status(500).json({message: "Internal server error", success:false})
  }
} 

export const signUp = async(req, res)=>{
  const{ firstName, lastName, email, username, password, role} = req.body

  if(!firstName || !lastName || !email || !username || !password){
    return res.status(400).json({message: "Incomplete credentials", success:false})
  }
  try{
    const findUser = await User.findOne({$or: [{email},{username}]})
    if(findUser){
      return res.status(40).json({message:"email or username is taken", success:false})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await User.create({firstName, lastName, email, username, password:hashedPassword, role});

    const accTk =  accessToken({id:newUser._id, role: newUser.role})
    const rfTk =  refreshToken({id:newUser._id, role: newUser.role})

    res.cookie("jwt_token", rfTk,{
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000
    })

    return res.status(201).json({message: "User created", success: true,  id:newUser._id, name:`${newUser.firstName} ${newUser.lastName}`, email: newUser.email, username: newUser.username, accTk})
  }catch(error){
    console.log(`Error: ${error.message}`)
    return res.status(500).json({message: "Internal server error", success:false})
  }
} 


export const signIn = async(req, res)=>{
  const {email,password} = req.body;

  if(!email || !password){
    return res.status(400).json({message: "Incomplete credentials", success:false})   
  }
  try{
    const findUser = await User.findOne({email})
    if(!findUser){
      return res.status(401).json({message:"Invalid email or password", success:false})
    }
    const validPassword = await bcrypt.compare(password, findUser.password)
    if(!validPassword){
      return res.status(401).json({message: "Invalid email or password", success: false})
    }

    const accTk = accessToken({id:findUser._id, role:findUser.role})
    const rfTk = refreshToken({id:findUser._id, role:findUser.role})

    res.cookie("jwt_token", rfTk,{
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({message: "User authenticated", success:true, id:findUser._id,token:accTk})

  }catch(error){
    
    console.error(`Error: ${error.message}`)
    return res.status(500).json({message: "Internal server error"})

  }
}


export const logOut = (req, res) => {

  try{
    const cookie = req.cookies.jwt_token
    if(!cookie){
      return res.status(400).json({message: "Cookie not found", redirect:true})
    }

    res.clearCookie("jwt_token", { httpOnly:true, sameSite: "Lax", secure: process.env.NODE_ENV ==="production" });

    res.status(200).json({message: "cleared cookie", redirect: true})
  }
  catch(error){
    return res.status(500).json({message: "Internal Server error"})
  }
}