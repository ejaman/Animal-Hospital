import {Router, Request, Response, NextFunction} from 'express';
import * as _ from 'lodash'; 
import { PetInfo } from '../db';

const petRouter = Router();

// 펫 정보 등록
petRouter.post('/mypet/register', async(req : Request, res : Response, next: NextFunction)=>{

    if(_.isEmpty(req.body)){
        throw new Error("header의 Content-type이 application/json이 맞는지 확인해주세요.")
    }

    const owner = req.currentUserId;
    const {species, breed, name, age, sex, weight, medicalHistory, vaccination, neutralized, image} : PetInfo = req.body;










})

petRouter.post