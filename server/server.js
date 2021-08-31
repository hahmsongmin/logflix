import express from "express";
import morgan from "morgan";
import session from "express-session";
import cors from "cors";
import rootRouter from "./routers/rootRouter";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

// app.use((req,res,next)=>{
//     console.log(req.headers);
//     next();
// })

// // 브라우저(새로고침시) --> 쿠키 전달 확인
// app.use((req,res,next)=>{
//     req.sessionStore.all((error, sessions) => {
//         console.log(sessions);
//         next();
//     })
// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(localsMiddleware);

app.use("/", rootRouter);

export default app;
