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

app.get('/', (req: Request, res: Response) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

export default app;
```

## And Create a `.env` file put this type code

```ts
PORT=3000;
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

main().catch((err) => console.log(err));

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

- Then in typescript config file

```ts
  "rootDir": "./src/",
  "outDir": "./dist",

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
- Then put this in `..prettierrc.json` file :

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
dist;
.env;
```
