import { Request, Response } from 'express';
import { StudentServices } from './Student.service';
import Joi from 'joi';
import { z } from 'zod';
import StudentValidationWithZodSchema from './Student.zod.valadition';

//controller handle the  request and response
const createStudent = async (req: Request, res: Response) => {
  try {
    //----------------------

    // const student = req.body.student;
    const { student: studentData } = req.body;
    //?------------validate data using Zod-----------------------

    const zodParseData = StudentValidationWithZodSchema.parse(studentData);

    //?----------------------------------------------------------
    //?------------validate data using Joi-----------------------
    // const { error, value } = StudentValidationSchema.validate(studentData);
    // if (error) {
    //   res.status(500).json({
    //     Success: false,
    //     Message: 'Something Went Wrong',
    //     error: error.details,
    //   });
    // }
    //?----------------------------------------------------------
    //will call the server function to send the data
    const result = await StudentServices.createStudentToDB(zodParseData);

    //Send response to user
    res.status(200).json({
      Success: true,
      Message: 'Student is created succesfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      Success: false,
      Message: error.message || 'Something Went Wrong',
      error: error,
    });
  }
};

//read all student data from database
const getAllStudent = async (req: Request, res: Response) => {
  try {
    //call the service function
    const result = await StudentServices.getAllStudentsFromDB();

    //send response
    res.status(200).json({
      Success: true,
      Message: 'Students are retrive form database succesfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      Success: false,
      Message: error.message || 'Something Went Wrong',
      error: error,
    });
  }
};

//read a single student
const getASingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getASingalStudentFromDB(studentId);
    res.status(200).json({
      Success: true,
      Message: 'Student retrive from Database Successfull',
      Data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      Success: false,
      Message: error.message || 'Something Went Wrong',
      error: error,
    });
  }
};

//Delete a Single Student
const DeleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.studentId;
    const result = await StudentServices.DeleteStudentFromDB(id);
    res.status(200).json({
      Success: true,
      Message: 'Student Deleted Successfull From Database',
      Data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      Success: false,
      Message: error.message || 'Something Went Wrong',
      error: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getASingleStudent,
  DeleteSingleStudent,
};
