import { Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';
import { userService } from '../services';
import { HttpError} from '../middlewares';
import { blockInvalidRequest } from './Utils';


export async function registerUserCTR (req : Request, res : Response, next : NextFunction) {
    try {
      
        // //body의 회원등록 정보 가져오기
        const {userName, email, password, phoneNumber, address} = req.body;
        
        // // 필수정보 기입되었는지 확인
        const requiredParams = ['userName','email','password','phoneNumber','address'];
        blockInvalidRequest(req.body, requiredParams);
        
        //중복이메일 체크
        const emailExists = await userService.isSameEmail(email);
        const regexEmail =
          /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regixPW =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,20}/;

        //오피스아워 반영 400에러코드 경우를 한번에 처리함
        if(emailExists || !regexEmail.test(email) || !regixPW.test(password)){
          throw new HttpError(400, "중복된 이메일이거나 이메일 형식 또는 비밀번호 형식이 맞지 않습니다.")
        } 
        
        const newUser = await userService.addUser({
          userName,
          email,
          password,
          phoneNumber,
          address
          });

        res.status(201).json(newUser);
        
    } catch (error) {
      next(error);
    }    
        
}

export async function loginUserCTR (req : Request, res : Response, next : NextFunction) {
    try {
        
        const {email, password} = req.body;
        const requiredParams = ['email', 'password'];
        blockInvalidRequest(req.body, requiredParams);
     
        const isExpired = await userService.blockExpiredUser(email);

        if(isExpired){
            // TODO : 메인페이지 경로로 이동시키기
            
            res.status(400).json({
              result : "failed",
              message : "탈퇴한 회원입니다."})
        } 

        const userToken = await userService.getUserToken({ email, password });
                
        res.status(201).json({ userToken }); 

    } catch (error) {
        next(error)
    }
}

export async function getUserInfoCTR (req : Request, res : Response, next : NextFunction) {
    try {
        const userId = req.currentUserId;
        const currentUserInfo = await userService.getUserData(userId);
    
        res.status(200).json(currentUserInfo);
      } catch (error) {
        next(error);
      }
}

export async function updateUserInfoCTR (req : Request, res : Response, next : NextFunction) {
    try{
        // blockEmptyObject(req.body);
        blockInvalidRequest(req.body)

        //잘못된 접근 에러 처리
        const userId = req.currentUserId;
        const user = await userService.getUserData(userId);
        const email = req.params.userEmail;



        if(email === user.email) {
            const {userName, currentPassword, password, phoneNumber, address, role} = req.body;

            const regixPW = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,20}/;

            if(!currentPassword || !regixPW.test(password) ){
                throw new HttpError(400, "현재 비밀 번호가 없거나 새로운 비밀번호가 규칙에 맞지 않습니다.")
            }

            const userInfoRequired = { email, currentPassword };

            const toUpdate = {
                ...(userName && { userName }),
                ...(password && { password }),
                ...(address && { address }),
                ...(phoneNumber && { phoneNumber }),
                ...(role && { role }),
            };

            const updatedUserInfo = await userService.setUser(
                userInfoRequired,
                toUpdate
            );

            res.status(200).json(updatedUserInfo);
        } else {
            throw new HttpError(400, '잘못된 접근입니다. 로그인한 계정이 맞는지 확인해주세요.')
        }
    } catch (error) {
        next(error);
    }
}

export async function getAllUsersCTR (req : Request, res : Response, next : NextFunction) {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}

export async function ExpireUserCTR (req : Request, res : Response, next : NextFunction) {
    try {
    
        const userStatus = req.userStatus;
        const userId = req.currentUserId;
        const statusInfoRequired = {userId, userStatus};
        const updatedStatus = await userService.setStatus(statusInfoRequired);
    
        res.status(200).json({message : updatedStatus});
    
    
      } catch (error) {
        next(error)
      }
}
