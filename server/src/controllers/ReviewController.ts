import { reviewService, userService } from '../services';
import { Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';

export async function postReviewCTR(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (_.isEmpty(req.body)) {
      throw new Error(
        "body가 비어있거나 header의 Content-Type이 'application/json'인지 확인해주세요"
      );
    }

    const currentUserId = req.currentUserId;
    const isPermittedUser = await userService.blockUnauthorized(currentUserId);
    if(isPermittedUser){
        const { userId, targetHospital, date, content, like } = req.body;

    if (!currentUserId === userId) {
      //TODO : 리다이렉션경로 재설정하기
      res.status(400).redirect('/api/user');
    } else {
      const reviewInfo = { userId, targetHospital, date, content, like };
      const newReview = await reviewService.addReview(reviewInfo);
      res.status(201).json(newReview);
    }

    } else {
        //TODO : 리다이렉팅 주소 재설정하기
        res.status(400).redirect('/api/user');
    }

    
  } catch (error) {
    next(error);
  }
}

export async function 
