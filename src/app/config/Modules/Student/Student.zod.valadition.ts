import { z } from 'zod';

const UserNameValidationSchema = z.object({
  firstName: z.string().min(1).trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().min(1).trim(),
});

const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1).trim(),
  fatherOccupation: z.string().min(1).trim(),
  fatherContractNo: z.string().min(1).trim(),
  motherName: z.string().min(1).trim(),
  motherOccupation: z.string().min(1).trim(),
  motherContractNo: z.string().min(1).trim(),
});

const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1).trim(),
  occupation: z.string().min(1).trim(),
  contractNo: z.string().min(1).trim(),
  address: z.string().min(1).trim(),
});

const StudentValidationWithZodSchema = z.object({
  id: z.string().min(1).trim(),
  name: UserNameValidationSchema,
  email: z.string().email(),
  password: z
    .string()
    .max(10, { message: 'Must be 10 or fewer character long' }),
  gender: z.enum(['Male', 'Female', 'other']),
  dateOfBirth: z.string().min(1).trim(),
  contractNo: z.string().min(1).trim(),
  emergencyContractNO: z.string().min(1).trim(),
  bloodGroup: z.enum(['A', 'B', 'AB', 'O', 'A-', 'B-', 'AB-', 'O-']),
  presentAddress: z.string().min(1).trim(),
  permanentAddress: z.string().min(1).trim(),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImg: z.string().min(1).trim(),
  isActive: z.enum(['Active', 'Inactive']).default('Active'),
  isDeleted: z.boolean(),
});

export default StudentValidationWithZodSchema;
