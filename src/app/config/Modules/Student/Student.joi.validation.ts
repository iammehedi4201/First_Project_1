import Joi from 'joi';

const UserNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim(true)
    .required()
    .max(20)
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name is required',
      'string.max': 'First name exceeds the maximum length of 20 characters',
      'string.pattern.base': 'First name must contain only letters',
    }),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      'string.base': 'Last name must be a string',
      'string.empty': 'Last name is required',
      'string.pattern.base': 'Last name must contain only letters',
    }),
});

const GuadianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required(),
  fatherOccupation: Joi.string().trim().required(),
  fatherContractNo: Joi.string().trim().required(),
  motherName: Joi.string().trim().required(),
  motherOccupation: Joi.string().trim().required(),
  motherContractNo: Joi.string().trim().required(),
});

const LocalGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  occupation: Joi.string().trim().required(),
  contractNo: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
});

const StudentValidationSchema = Joi.object({
  id: Joi.string().trim().required(),
  name: UserNameValidationSchema.required(),
  email: Joi.string().trim().email().required(),
  gender: Joi.string()
    .valid('Male', 'Female', 'other')
    .insensitive() // this for case sensitive
    .required(),
  dateOfBirth: Joi.string().trim().required(),
  contractNo: Joi.string().trim().required(),
  emergencyContractNO: Joi.string().trim().required(),
  bloodGroup: Joi.string()
    .valid('A', 'B', 'AB', 'O', 'A-', 'B-', 'AB-', 'O-')
    .insensitive()
    .required(),
  presentAddress: Joi.string().trim().required(),
  permanentAddress: Joi.string().trim().required(),
  guardian: GuadianValidationSchema.required(),
  localGuardian: LocalGuardianValidationSchema.required(),
  profileImg: Joi.string().trim().required(),
  isActive: Joi.string().valid('Active', 'Inactive').default('Active'),
});

export default StudentValidationSchema;
