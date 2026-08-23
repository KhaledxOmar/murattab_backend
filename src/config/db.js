import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ['error', 'warn', 'query'] : ['error']
})


const connectDB = async () => {
    try {
        await prisma.$connect()
    }
    catch (error) {
        console.error("error connecting the db")
        process.exit(1)
    }
}

const disconnectDB = async () => {
    await prisma.$disconnect()
}

export {prisma, connectDB, disconnectDB}