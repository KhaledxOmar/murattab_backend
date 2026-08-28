import {prisma} from '../config/db.js'


const getTeacherCourses = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.findUnique({
            where: {id: id},
            include: {
                createdCourses: true
            }
        })
        console.log(user)
        if (!user){
            return res.status(400).json({
                error: "user not found"
            })
        }

        // if(user.role !== 'teacher') return res.status(400).json({
        //     error: "bad request"
        // })

        return res.status(200).json({
            message: "success",
            data: {
                courses: user.createdCourses
            }
        })
    }
    catch (error) {
        return res.status(400).json({
            error: "something went wrong"
        })
    }
}

const getCourseDetails = async (req, res) => {
    try {
        const id = req.params.id
        const course = await prisma.course.findUnique({
            where: {id: id}
        })
        

        if(!course){
            return res.status(400).json({
                error: "the course is not found"
            })
        }

        return res.status(200).json({
            message: "success",
            data: {
                course
            }
        })
    }
    catch (error) {
        return res.status(400).json({
            error: "something went wrong"
        })
    }
}

export {getCourseDetails, getTeacherCourses}