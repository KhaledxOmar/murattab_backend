import express from "express"
import {register, login, logout} from '../controllers/authController.js'

const router = express.Router()

// POST /auth/register
router.post('/register', register)

// POST /auth/login
router.post('/login', login)

// POST /auth/logout
router.post('logout', logout)




export default router