import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

//parser
app.use(express.json());
app.use(express.text());

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('hello world ');
});
export default app;

//  "scripts": {

// "prettier:fix" :"npx prettier --write src"

// },
