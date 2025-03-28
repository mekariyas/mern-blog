import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import connectDb from "./db/connectDb.js"


import userRoute from "./routes/userRoutes.js";
import postRoute from "./routes/postRoutes.js";

import {authorization} from "./middleware/auth.js"

const app = express()
const port = process.env.PORT || 4000


connectDb()


app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/user",userRoute)
app.use("/api/posts",authorization,postRoute)



app.listen(port, ()=>console.log(`Server running at port : ${port}`))