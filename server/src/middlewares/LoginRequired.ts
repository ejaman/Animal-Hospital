import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

function loginRequired (req : Request, res : Response, next: NextFunction) {

    const userToken = req.headers['authorization']?.split(' ')[1];

    if(!userToken || userToken === 'null') {
        res.status(403).json({
            result : 'forbidden-approach',
            reason : '로그인한 사용자만 접근할 수 있는 서비스입니다.'
        });

        return;
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
        const jwtDecoded = jwt.verify( userToken, secretKey) as JwtPayload;
        const userId = jwtDecoded.userId;
        
        //로그인한 유저의 userId와 일치하는지 구현하기
        
        next()

        

    } catch(error) {
        res.status(403).json({
            result : 'forbidden-approach',
            reason : '정상적인 토큰이 아닙니다.'
        });

        return;
    }
}