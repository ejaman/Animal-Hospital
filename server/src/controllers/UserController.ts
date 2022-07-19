import { Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';
import { userService } from '../services';
import { CustomError, blockEmptyObject } from '../middlewares';


export async function registerUserCTR (req : Request, res : Response, next : NextFunction) {
    try {
      
        blockEmptyObject(req.body);
  
        //body의 회원등록 정보 가져오기
        const {userName, email, password, phoneNumber, address, role, userStatus} = req.body;
  
        // 필수정보 기입되었는지 확인
        const requiredParams = ['userName','email','password','phoneNumber','address'];
  
        if (!requiredParams.every(p=>req.body[p])) {
          
          throw new CustomError("필수정보가 모두 입력되었는지 확인해주세요.", 400)
        }

        //중복이메일 체크
        const emailExists = await userService.isSameEmail(email);
        if(emailExists){
          throw new CustomError("중복된 이메일입니다.", 400)
        } else {
          //이메일 유효성 검증
          const regexEmail =
          /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (!regexEmail.test(email)) {
            throw new Error(
              '이메일 형식이 올바르지 않습니다. 이메일 형식을 다시 한 번 확인해주세요.'
            );
          }
          
          //비밀번호 유효성 검증
          const regixPW =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,20}/;
          if (!regixPW.test(password)) {
            throw new Error('비밀번호 규칙을 다시 한 번 확인해주세요.');
          }

          const newUser = await userService.addUser({
            userName,
            email,
            password,
            phoneNumber,
            address,
            role,
            userStatus,
          });

          res.status(201).json(newUser);
        }
    } catch (error) {
      next(error);
    }    
        
}

export async function loginUserCTR (req : Request, res : Response, next : NextFunction) {
    try {
        blockEmptyObject(req.body);

        const {email, password} = req.body;
     
        const isExpired = await userService.blockExpiredUser(email);

        if(isExpired){
            // TODO : 메인페이지 경로로 이동시키기
            res.status(302).redirect('/api/user'); 
        } else {
            const userToken = await userService.getUserToken({ email, password });
            const role = userToken.role;
            const userStatus = userToken.userStatus;
            
            res.status(201).json({ userToken }); 
        }

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
        blockEmptyObject(req.body);

        //잘못된 접근 에러 처리
        const userId = req.currentUserId;
        const user = await userService.getUserData(userId);
        const email = req.params.userEmail;



        if(email === user.email) {
            const {userName, currentPassword, password, phoneNumber, address, role} = req.body;

            const regixPW = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,20}/;

            if(!currentPassword){
                throw new CustomError("현재 비밀 번호를 넣어주세요", 400)
            }

            if(!regixPW.test(password)){
                throw new CustomError("비밀번호 규칙을 다시 한번 확인해주세요", 400)
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
            throw new CustomError('잘못된 접근입니다. 로그인한 계정이 맞는지 확인해주세요.', 400)
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
    
        res.status(200).json(updatedStatus);
    
    
      } catch (error) {
        next(error)
      }
}
