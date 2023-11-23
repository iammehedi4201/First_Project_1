import express from 'express';
import { StudentControllers } from './Student.controller';

const router = express.Router();

//will call controller function
router.get('/', StudentControllers.getAllStudent);
router.post('/create_student', StudentControllers.createStudent);
router.get('/:studentId', StudentControllers.getASingleStudent);
router.delete('/:studentId', StudentControllers.DeleteSingleStudent);

export const StudentRoutes = router; //ekhane object create korbo nah bcz router nijhe ekta object
