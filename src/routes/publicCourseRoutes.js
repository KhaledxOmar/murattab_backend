import express from "express"
import { getCourseDetails, getTeacherCourses } from "../controllers/publicCourseController.js"

const router = express.Router()


// PUBLIC: THEY DO NOT REQUIRE TOKEN VERIFICATION:


// GET /teachers/:id/courses --> public for all users to view the teacher's courses
router.get('/teachers/:id/courses', getTeacherCourses)

// GET /courses/:id
router.get('/courses/:id', getCourseDetails)


export default router