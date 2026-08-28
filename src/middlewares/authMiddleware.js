import {prisma} from '../config/db.js'
import jwt from 'jsonwebtoken'


const verifyToken = async (req, res, next) => {

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    else if (req.cookies?.jwt) {
        token = req.cookies.jwt
    }
    
    if(!token){
        return res.status(401).json({
            error: "unauthorized"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = prisma.user.findUnique({
            where: {id: decoded.id},
            include: {createdCourses: true, enrollments: true}
        })

        console.log(decoded)

        if(!user){
            return res.status(404).json({
                error: "user no longer exist"
            })
        }

        req.user = user
        next()
    }
    catch (error) {
        return res.status(401).json({ 
            error: "Not authorized, token failed" 
        });

    }

}

export default verifyToken