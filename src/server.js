import express from "express"
import dotenv from "dotenv"
import {connectDB, disconnectDB} from "./config/db.js"

dotenv.config()

PORT = process.env.PORT

const app = express()

//connect the db
connectDB()

//middlewares
app.use(express.json())

app.listen(PORT, () => {
    console.log(`the server is running on: http://localhost:${PORT}`);
})

