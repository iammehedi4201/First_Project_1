import { Schema, model, connect } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import {
  StudentModel,
  TGaudian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './Student/Student.interface';
import config from '..';

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    // trim: true, // it means that if we any space in word lift and right  then it will remove that space
    maxlength: [20, 'First name exceeds the maximum length of 20 characters'], // we can use this for fixed name character,
    // validate: {
    //   validator: function (value: string) {
    //     const firstName =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //     return firstName === value;
    //   },
    //   message: '{VALUE} is not in Capitalize',
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid. only except letters',
    },
  },
});

const GuadianSchema = new Schema<TGaudian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required'],
  },
  fatherContractNo: {
    type: String,
    trim: true,
    required: [true, 'Father contact number is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother name is required'],
  },
  motherContractNo: {
    type: String,
    trim: true,
    required: [true, 'Mother contact number is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother occupation is required'],
  },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    // required: [true, 'Local guardian name is required'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Local guardian occupation is required'],
  },
  contractNo: {
    type: String,
    trim: true,
    required: [true, 'Local guardian contact number is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Local guardian address is required'],
  },
});
const StudentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      trim: true,
      required: [true, 'Student ID is required'],
      unique: true, //uniqune means the id will be unique it will not have any duplicate
    },
    name: {
      type: UserNameSchema,
      trim: true,
      required: [true, 'Student name is required'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Student email is required'],
      unique: true, //  unique dile se database giye ekta indexing create korbe
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid Email type',
      },
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'other'],
        message: 'Gender must be either "Male", "Female", or "other"',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: String,
      trim: true,
      required: [true, 'Date of birth is required'],
    },
    contractNo: {
      type: String,
      trim: true,
      required: [true, 'Contact number is required'],
      unique: true,
    },
    emergencyContractNO: {
      type: String,
      trim: true,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A', 'B', 'AB', 'O', 'A-', 'B-', 'AB-', 'O-'],
        message:
          'Blood group must be either "A", "B", "AB", "O", "A-", "B-", "AB-", or "O-"',
      },
      required: [true, 'Blood group is required'],
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      trim: true,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: GuadianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: LocalGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: {
      type: String,
      trim: true,
      required: [true, 'Profile image is required'],
      unique: true,
    },
    isActive: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);
//? ------------------ virtual ---------------------------

StudentSchema.virtual('FullName').get(function () {
  return (
    this.name.firstName + ' ' + this.name.middleName + ' ' + this.name.lastName
  );
});

//? ------------------Document middleware------------------
// ekhane this current document ke point korbe
//? Pre Save Middlewar hook
//jokhon amar studentschema model  upore jodi (save() | created()) method tokhon eta apply hobe
StudentSchema.pre('save', async function (next) {
  const user = this; // document
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
//? post save middlewar
// doc means updated document that
// post ta excute tokhon jokhon se data base save hove. client response pathanor age
StudentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
//?-----------------------------------------------------------

//?------------------Query middleware------------------

StudentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('aggregate', function (next) {
  console.log(this.pipeline());

  // this.pipeline().unshift({ $match: { isDeleted: { $ne: ` ` } } });
  // next();
});

//?-----------------------------------------------------

//? create custome Static method
StudentSchema.statics.isExists = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};

//? create custome instance method
// StudentSchema.methods.isExists = async function (id: string) {
//   const extistingUser = await Student.findOne({ id: id });
//   return extistingUser;
// };

//Create a model
export const Student = model<TStudent, StudentModel>('Student', StudentSchema); //'student' is collection name
