import express from "express"
import dotenv from "dotenv"
import test from "./src/router/test1route.js"
import test2 from "./src/router/testrouter.js"
import userRoute from "./src/router/userRoute.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import connect from "./src/db/connectDb.js"
dotenv.config({
    path:"./.env"
})

const PORT = process.env.PORT || 4000;
const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
// app.use("/api/v1/user",testR)
app.use("/api/v1/user",userRoute)

app.use("/api/v2",test)
app.use("/api/v1/err",test2)


app.listen(PORT,()=>{
    console.log("server listening at port" + process.env.PORT);
})

console.log(process.env.PORT);
connect().then(()=>{}).catch(()=>console.log("Error")
)