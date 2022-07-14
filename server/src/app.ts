import cors from 'cors';
import express from 'express';
import { errorLogger, errorHandler } from './middlewares';
import {
    userRouter,
    petRouter,
  hospStatusRouter,
  hospRegStatusRouter,
  hospTagRouter,
  hospitalRouter,
} from './routers';

const app = express();

// CORS 에러 방지
<<<<<<< HEAD
// app.use(cors());
app.use(cors({ 
    credentials: true, 
    origin: "http://localhost:3000" }));
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//   }); 
=======
app.use(cors({ credentials: true, origin: 'http://localhost:3030' }));
>>>>>>> 26b482d664cd2864fa97a2cc89fdeae63d754856

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
<<<<<<< HEAD
app.use(express.urlencoded({ extended: true }));

app.use('/hostpitalStatus', hospStatusRouter);
app.use('/hostpitalRegStatus', hospRegStatusRouter);
app.use('/hostpitalTag', hospTagRouter);
app.use('/hostpital', hospitalRouter);
=======
app.use(express.urlencoded({ extended: false }));
app.use('/hospitalStatus', hospStatusRouter);
app.use('/hospitalRegStatus', hospRegStatusRouter);
app.use('/hospitalTag', hospTagRouter);
app.use('/hospital', hospitalRouter);
>>>>>>> 26b482d664cd2864fa97a2cc89fdeae63d754856
app.use('/api', userRouter);
app.use('/pet', petRouter)


// 미들웨어 (에러를 error.log 파일에 기록 및, 에러를 프론트엔드에 전달)
app.use(errorLogger);
app.use(errorHandler);

//라우팅

export { app };
