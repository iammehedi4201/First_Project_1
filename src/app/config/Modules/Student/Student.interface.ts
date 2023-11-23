import { Student } from './../Student.model';
import { Schema, model, connect, Model } from 'mongoose';

export type TGaudian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContractNo: string;
  motherName: string;
  motherOccupation: string;
  motherContractNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contractNo: string;
  address: string;
};

export interface TStudent {
  id: string;
  name: TUserName;
  email: string;
  password: string;
  gender: 'Male' | 'Female' | 'other';
  dateOfBirth?: string;
  contractNo: string;
  emergencyContractNO: string;
  bloodGroup?: 'A' | 'B' | 'AB' | 'O' | 'A-' | 'B-' | 'AB-' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGaudian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'Active' | 'Inactive';
  isDeleted: boolean;
}

//? create custoem Static method
export interface StudentModel extends Model<TStudent> {
  isExists(id: string): Promise<TStudent | null>;
}

//? create custoem instance method
// export type StudentMethods = {
//   isExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<TStudent, {}, StudentMethods>;
