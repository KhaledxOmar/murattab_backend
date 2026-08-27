import {prisma} from '../config/db.js'
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        if (!name || !email || typeof name !== 'string' || typeof email !== 'string' || !name.trim() || !email.trim()) {
            return res.status(400).json({
                error: "The request should include name, email, and all of type string"
            })
        }

        if (!password || typeof password !== 'string' || !password.trim()) {
            return res.status(400).json({
                error: "The request should include password"
            })
        }

        const existUser = await prisma.user.findUnique({
            where: {email: email}
        })

        if (existUser) {
            return res.status(400).json({
                error: "email already registered"
            })
        }

        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await prisma.user.create({
            data: {
                name: name.trim(),
                email: email.trim(),
                password: hashedPassword,
                role
            }
        })

        // generate the token
        const token = generateToken(user.id, res)

        res.status(201).json({
            message: "success",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            }
        })

    }
    catch (error) {
        console.error("internal server error")
        res.status(500).json({
            message: "internal server error"
        })
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        if (!email || typeof email !== 'string' || !email.trim()) {
            return res.status(400).json({
                error: "The request should include email, and all of type string"
            })
        }

        if (!password || typeof password !== 'string' || !password.trim()) {
            return res.status(400).json({
                error: "The request should include password"
            })
        }

        const user = await prisma.user.findUnique({
            where: {email: email},
        })
        
        if(!user) {
            return res.status(401).json({
                error: "Invalid email or password"   
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) {
            return res.status(401).json({
                error: "Invalid email or password"   
            })
        }

        //generate Token
        const token = generateToken(user.id, res)

        return res.status(200).json({
            data:{
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            }
        })

    }
    catch (error) {

    }
}

const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            path: '/', // so that it is deleted from all the app routes
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0)
        });
        res.status(200).json({
            message: "Logged out successfully"
        })
    }
    catch (error) {

    }
}



export {register, login, logout}