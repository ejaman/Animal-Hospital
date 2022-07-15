import { Request, Response, NextFunction } from 'express';
import { userModel } from '../db';

async function checkStatus (req : Request, res : Response, next: NextFunction):Promise<void> {
    try{
        const {email} = req.body;
        const user = await userModel.findByEmail(email);
        const userStatus = user?.userStatus;
        if(userStatus === "expired") {
            throw new Error("탈퇴한 사용자입니다.")
            return;
        } else if(userStatus === "normal") {
            req.userStatus = userStatus;
            req.currentUserId = user?._id.toString()!;
            next()
        } else if(userStatus === "pending"){ //현재 pending 상태 회원있어 추가한 코드. 추후 삭제 에정
            next()
        }
    } catch(error) {
        res.status(403).json({
            result : 'forbidden-approach',
            reason : '탈퇴한 회원입니다.'
        });

        return;
    }
}

export {checkStatus};