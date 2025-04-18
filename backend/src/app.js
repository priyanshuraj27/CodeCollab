import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
// console.log("app.js");
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

 app.use(express.json({limit : "16kb"}));
 app.use(urlencoded({extended : true}));
 app.use(express.static('public'));
 app.use(cookieParser());
 
// Routes import 

import userRouter from './routes/user.routes.js';
import projectRouter from './routes/project.routes.js';
import collabRouter from './routes/collab.routes.js';
import chatRouter from './routes/chat.routes.js';
import editorRouter from './routes/editor.routes.js';


app.use("/api/v1/users",userRouter);
app.use("/api/v1/projects",projectRouter);
app.use("/api/v1/collab",collabRouter);
app.use("/api/v1/chat",chatRouter);
app.use("/api/v1/editor",editorRouter);


export {app};
