import express from 'express'
import { createStudent,createMentor,assignMentor,getstudentid,getmentorname,getstudentdetails } from "../Controller/stu_mentor.controller.js";
const router =express.Router();

router.post('/create/student', createStudent)
router.post('/create/mentor',createMentor)
router.post('/mentors/:mentorId',assignMentor)
router.post('/students/:studentId',getstudentid)
router.get('/mentors/:mentorName',getmentorname)
router.get('/studetails/:studentId',getstudentdetails)

export default router;