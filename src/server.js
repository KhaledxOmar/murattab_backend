import express from "express"
import dotenv from "dotenv"
import {connectDB, disconnectDB} from "./config/db.js"
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const PORT = process.env.PORT

const app = express()

//connect the db
connectDB()

//middlewares
app.use(express.json())
app.use('/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`the server is running on: http://localhost:${PORT}`);
})


process.on("unhandledRejection", async (err) => {
    console.error("unhandledRejection:" ,err)
    server.close( async () => {
        await disconnectDB();
        process.exit(1);
    })
})


process.on("uncaugtException", async (err) => {
    console.error("uncaugtException:" ,err)
    await disconnectDB();
    process.exit(1);
})


process.on("SIGTERM", async (err) => {
    console.error("SIGTERM:" ,err)
    server.close( async () => {
        await disconnectDB();
        process.exit(0);
    })
})

