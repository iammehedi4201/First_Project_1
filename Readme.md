# <p style="color: blue">Be A Mongo Magician: <p>

#### project setup step

# First Instll all of this

```ts
npm init -y
```

```ts
npm install express
```

```ts
npm install mongoose --save
```

```ts
 npm install typescript --save-dev
```

```ts
 npm i cors
```

```ts
npm i dotenv
```

```ts
tsc - init;
```

- Then in typescript config file

```ts
  "rootDir": "./src/",
  "outDir": "./dist",

```

## Then create a file name `src`

- Inside the `src` file create a file `app.ts` then inside the `app.ts` file put this code

- Install this frist

```ts
npm i --save-dev @types/express
npm i --save-dev @types/cors
```

```ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
const port = 3000;

//parser
app.use(express.json());
app.use(express.text());
app.use(cors());

//application routes
app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

export default app;
```

## And Create a `.env` file put this type code

```ts
NODE_ENV= development // if we work for production then we change it as production .if development then we write development
PORT=5001
DATABASE_URL=mongodb+srv://mehedi1513298:IqP5A40aLR54jlF7@cluster0.btlxizr.mongodb.net/First_Project?retryWrites=true&w=majority

//First_project mean the database name that you want to create
```

- Inside `src` create folder name `app` and inside the `app` folder create a folder name `config` and inside the config create a file name `index.ts` in the `index.ts` put this code

```ts
//for getting current woring directory use this console.log(process.cwd());
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
```

## Inside `src`file create `server.ts` file for server start and mondgb connnect and other connection put in this file

```ts
import config from './app/config';
import app from './app';

import mongoose from 'mongoose';

async function main() {
  await mongoose.connect(config.database_url as string);

  app.listen(config.port, () =>
    console.log(`Example app listening on port ${config.port}!`),
  );
}

main();
```

- Then convert it into into `js` for that make a command in `package.json script `

```ts
  "scripts": {
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

-Then run this command

```ts

npm run build

```

### Eslint file set up

# In the `ts config` file add these for

```ts
 "include": ["src"], // which files to compile
 "exclude": ["node_modules"], // which files to skip
```

# Then install it

```ts

npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

```

# Then run it

```ts
npx eslint --init

//then give the question ans :
1-To check syntax and find problems
2-JavaScript modules (import/export)
3-None of these
4-yes
5-node
6-json
7-yes
8-npm

```

# Then `.eslintrc.json` file add rules that you need

```ts

 "rules": {
        "no-unused-vars": "error",
        "no-unused-expressions":"error",
        "prefer-const":"error", //confiused
        "no-console" :"warn",
        "no-undef":"error"
    },

```

# Then root dictory create a fle name `.eslintignore` and put this in file

```ts
node_modules;
dist;
```

# Then in `Package.json` file add this in script

```ts

// "lint": "eslint --ignore-path .eslintignore --ext .js,.ts"

"scripts": {
    "build": "tsc",
    "lint": "eslint src --ignore-path .eslintignore --ext .ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

```

# if you want check error in you project broken your rules can be tedious then run it

```ts
npm run lint
```

# if you want fix error then run this comman

```ts
npx eslint src --fix

//or you can carate  build-in command  in script

//  "lint:fix": "npx eslint src --fix",


```

## Set up `Prettier`

- First Install this

```ts
npm install --save-dev prettier
```

- Then create a `.prettierrc.json` file in the root directory
- Then put this in `.prettierrc.json` file :

```ts
{
  "semi": true,
  "singleQuote": true
}

```

- Then add this in `package.json ` script

```ts

//  "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",

 "scripts": {
    "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
  },
```

- then run this for fix formet of code

```ts

npm run prettier

```

- Then go to `vs code` setting options and then click the button of top right setting options and in settings option paste this code

```ts

 "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,

```

- Avoiding conflicts when working with ESLint and Prettier install this

```ts
npm install --save-dev eslint-config-prettier
```

- Then paste this in `.eslintrc.json` file

```ts

"extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
```

- In the `package.josn` file create this command for code formet fix useing pretttier

```ts

 "scripts": {


"prettier:fix" :"npx prettier --write src"

  },

```

- Then run this command

```ts

```

- Then create `.gitingore` file and paste this

```ts
node_modules;
dist.env;
```

## For startng the server using `typescript` installl this

```ts
npm i ts-node-dev --save-dev
```

- Then run this command for starting server usign typescript

```ts
ts-node-dev --respawn --transpile-only server.ts

```

- create command for development and prodcution use this in `packeage.json`

```ts

  "start:prod": "node .dist/server.js",
  "start:dev": "ts-node-dev --respawn --transpile-only ./src/sever.ts",

```

## Set up the `Modular Pattern` in project

- if we use `Modular pattern` in `js` We will follow the patter name `schema` -> `model` -> `DB Query`

- if we use `Modular pattern` in `ts` We will follow the patter name `interface` -> `schema` -> `model` -> `DB Query`

- First in `app` folder create a file name `modules` in the `module` folder there will be different moduls in like student ,admin etc.

- Then create a `Student` modules in the `modules` folder

- In `Student modules` there will be file for `interface` -> `schema` -> `model` -> `DB Query`

- In `Student modules` then create a file name `student.interface.ts` inside it put this

```ts
import { Schema, model, connect } from 'mongoose';

export interface Gaudian =  {
  fatherName: string;
  fatherOccupation: string;
  fatherContractNo: string;
  motherName: string;
  motherOccupation: string;
  motherContractNo: string;
}

export

export interface Student {
  id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  email: string;
  gender: 'Male' | 'Female';
  contractNo: string;
  emergencyContractNO: string;
  dateOfBirth: string;
  bloodGroup?: 'A' | 'B' | 'AB' | 'O' | 'A-' | 'B-' | 'AB-' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Gaudian;
}
```

- `schema` ekta class return kore ja use amra `instance` create korte parbo

- Then create a file `student.model.ts` in `modules` folder

```ts
import { Schema, model, connect } from 'mongoose';
import {
  Gaudian,
  LocalGuardian,
  Student,
  UserName,
} from './Student/Student.interface';

const UserNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const GuadianSchema = new Schema<Gaudian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContractNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherContractNo: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
});

const LocalGuardianSchema = new Schema<LocalGuardian>({
  //sub schema
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contractNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const StudentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: {
    type: UserNameSchema,
    required: true,
  },
  email: { type: String, required: true },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'other'],
    required: true,
  },
  dateOfBirth: { type: String },
  contractNo: { type: String, required: true },
  emergencyContractNO: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A', 'B', 'AB', 'O', 'A-', 'B-', 'AB-', 'O-'],
      message:
        'Blood group must be either "A", "B", "AB", "O", "A-", "B-", "AB-", or "O-"',
    },
    required: [true, 'Must Need Blood Group'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: GuadianSchema,
  localGuardian: LocalGuardianSchema,
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['Active', 'Inactive'],
    required: true,
  },
});
//Create a model
const Student = model<Student>('Student', StudentSchema);
```

- Like `union Type` mongoose have a data type name `enum`

```ts
//this union type
gender: 'Male' | 'Female';
//this is mongoose enum type
 gender: ['Male', 'Female'],

```

- Then create file name `Student.router.ts` in the `module -> student` folder

```ts
import express from 'express';
import { StudentControllers } from './Student.controller';

const router = express.Router();

//will call controller function
router.get('/', StudentControllers.getAllStudent);
router.post('/create_student', StudentControllers.createStudent);
router.get('/:studentId', StudentControllers.getASingleStudent);

export const StudentRoutes = router; //ekhane object create korbo nah bcz router nijhe ekta object
```

- Then create file name `Student.controller.ts` in the `module -> student` folder

```ts
import { Request, Response } from 'express';
import { StudentServices } from './Student.service';

//controller handle the  request and response
const createStudent = async (req: Request, res: Response) => {
  try {
    // const student = req.body.student;
    const { student: studentData } = req.body;

    //will call the server function to send the data
    const result = await StudentServices.createStudentToDB(studentData);

    //Send response to user
    res.status(200).json({
      Success: true,
      Message: 'Student is created succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getASingleStudent,
};
```

- Then create file name `Student.service.ts` in the `module -> student` folder

```ts
import { StudentModel } from '../Student.model';
import { Student } from './Student.interface';

//This function will create student To Database
const createStudentToDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

//read all student
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

//read a single student
const getASingalStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({
    id: id,
  });
  return result;
};

export const StudentServices = {
  createStudentToDB,
  getAllStudentsFromDB,
  getASingalStudentFromDB,
};
```
