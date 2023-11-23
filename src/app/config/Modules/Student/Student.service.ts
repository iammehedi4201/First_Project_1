import { Student } from '../Student.model';
import { TStudent } from './Student.interface';

//This function will create student To Database
const createStudentToDB = async (studentData: TStudent) => {
  //? buildin Static method
  if (await Student.isExists(studentData.id)) {
    throw new Error('User already Exists');
  }
  const result = await Student.create(studentData);

  //? build in instance method
  // const student = new Student(studentData);
  // if (await student.isExists(studentData.id)) {
  //   throw new Error('User already Exists ');
  // }
  // const result = await student.save(); //buildin instance method
  return result;
};

//read all student
const getAllStudentsFromDB = async () => {
  const result = await Student.find(); //buildtin static method
  return result;
};

//read a single student
const getASingalStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({
  //   id: id,
  // });
  const result = Student.aggregate([
    {
      $match: {
        id: id,
      },
    },
  ]);
  return result;
};

//Delete Data from database
const DeleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id: id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentToDB,
  getAllStudentsFromDB,
  getASingalStudentFromDB,
  DeleteStudentFromDB,
};
