import {model} from 'mongoose';
import {ReviewSchema} from '../schemas/ReviewSchema';

const Review = model('reviews', ReviewSchema);

export class ReviewModel {
    async findByOwnerId (owerId : ):Promise<> {

    }

    async findByHospitalId() : Promise <> {

    }

    async addReview() : Promise<> {

    }

    async setReview() : Promise<>{

    }

    //관리자용 모든 리뷰 조회 
    async getReviews() :Promise<> {

    }

    //일반 사용자의 자기 리뷰 조회 - findbyId와 같은
    async getReviewByUser() : Promise<> {

    }

    //병원 리뷰 조회 - findByhospitalId와 같음
    async getReviewByHos

    async deleteReview() :Promise<> {

    }
}