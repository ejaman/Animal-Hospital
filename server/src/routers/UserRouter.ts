import {Router, Request, Response, NextFunction} from 'express';
import * as _ from 'lodash';  //npm install --save @types/lodash

import { userService } from "../service";
import {UserAddress} from '../db';

const userRouter = Router();

userRouter.post('/register', async(req : Request,res : Response, next : NextFunction)=>{
    try{

        //body가 빈 객체가 아닌지 확인
        if(_.isEmpty(req.body)){
            throw new Error("body가 비어있거나 header의 Content-Type이 'application/json'인지 확인해주세요")
        }

        //body의 회원등록 정보 가져오기
        const userName : string = req.body.userName;
        const email : string = req.body.email;
        const password : string = req.body.password;
        const phoneNumber : string = req.body.phoneNumber;
        const address : UserAddress = req.body.address;
        const role : string = req.body.role;
        const userStatus : string = req.body.userStatus;
        
        // 필수정보 기입되었는지, 이메일 형식 맞는지, 이메일 중복 없는지 체크
        if (!userName || !email || !password || !phoneNumber) {
            throw new Error("필수 정보가 모두 입력되었는지 확인해주세요.");
          }

        if (email.indexOf("@") === -1) {
            throw new Error("이메일 형식이 올바르지 않습니다.");
          }

          const newUser = await userService.addUser({
            userName,
            email,
            password,
            phoneNumber,
            address,
            role,
            userStatus,
        })

        res.status(201).json(newUser)

    } catch (error) {
        next(error)
    }
})

export {userRouter};