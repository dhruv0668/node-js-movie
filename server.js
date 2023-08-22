import express  from "express";
import dotenv from "dotenv"
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"

// configure env
dotenv.config()

//database config
connectDB()

//rest object
const app = express();

//middleware
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use("/api/user", authRoutes)




//port

const PORT = process.env.PORT

app.listen(8080,(res,req) => {
    console.log(`app is running on ${PORT}`);
})