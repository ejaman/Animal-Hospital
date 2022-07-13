import {Router, Request, Response, NextFunction} from 'express';
import * as _ from 'lodash'; 
import { PetInfo } from '../db';
import { loginRequired } from '../middlewares/LoginRequired';
import { userService } from '../services';
import {petService} from '../services/PetService';

const petRouter = Router();

// 펫 정보 등록
petRouter.post('/register', loginRequired, async(req : Request, res : Response, next: NextFunction)=>{

    try {
        if(_.isEmpty(req.body)){
            throw new Error("header의 Content-type이 application/json이 맞는지 확인해주세요.")
        }
    
        const owner = req.currentUserId;
        const {species, breed, name, age, sex, weight, medicalHistory, vaccination, neutralized, image} : PetInfo = req.body;
    
        if(!species || !breed || !name || !age || !sex || !weight || !medicalHistory) {
            throw new Error("필수 정보가 모두 입력되었는지 확인해주세요.")
        }
    
        const newPet = await petService.addPet({
            owner,
            species,
            breed,
            name,
            age,
            sex,
            weight,
            medicalHistory,
            vaccination,  //...(vaccination && {vaccination})
            neutralized,
            image
        })
    
        res.status(201).json(newPet)

    } catch (error) {
        next(error)
    }

})

// 펫 정보 조회
petRouter.get('/mypets', loginRequired, async(req : Request, res : Response, next: NextFunction)=>{
    try {
        const userId = req.currentUserId;
        const token = req.headers.authorization;
        console.log(token);

        if(!userId){
            throw new Error("로그인 한 사용자가 아닙니다. 자신의 펫 정보 조회인지 확인해주세요")
        }

        const petInfos = await petService.getUserPetData(userId);
        res.status(200).json(petInfos);
    } catch(error){
        next(error)
    }
})


//펫 정보 수정
petRouter.patch('/update', loginRequired, async(req,res,next)=>{

    try{
        if(_.isEmpty(req.body)){
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            )
        }
    
    // 수정 권한이 있는 사용자 확인??


    }catch(error){
        next(error)
    }

})

export {petRouter}