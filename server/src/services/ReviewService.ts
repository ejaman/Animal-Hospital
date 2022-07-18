import {reviewModel, ReviewModel} from '../db'
import {ReviewInfo, ReviewData} from '../types/ReviewTypes';
class ReviewService {
    constructor(private reviewModel : ReviewModel){}

    //일반 회원의 병원에 대한 리뷰 등록
    async addReview(reviewInfo : ReviewInfo) : Promise<ReviewInfo>{
        const review = await this.reviewModel.createReview(reviewInfo);
        return review;

    }

    //일반 회원의 자신이 작성한 리뷰 조회
    async getReviewsByUser(userId : string) : Promise<ReviewInfo[]>{
        const reviews = await this.reviewModel.findByOwnerId(userId);
        return reviews;
    }

    //병원 회원의 자기 병원에 대한 모든 리뷰 조회
    async getReviewsByHospital(hospitalId : string) : Promise<ReviewData[]>{
        const reviews = await this.reviewModel.findByHospitalId(hospitalId);
        return reviews;
    }

    //관리자의 모든 리뷰 조회
    async getAllReviews():Promise<ReviewInfo[]>{
        const reviews = await this.reviewModel.findAll();
        return reviews;

    }

    //일반 회원의 리뷰 수정
    async updateReview(userId : string, toUpdate : Partial<ReviewInfo>) : Promise<ReviewData>{
        let review = await this.reviewModel.findById(userId);
        // const {update} = toUpdate;
        review = await reviewModel.updateReview({userId,update : toUpdate});
        return review;
    }

    //리뷰 삭제
    async deleteReviewData(reviewId : string) : Promise<{result : string}>{
        const {deletedCount} = await this.reviewModel.deleteReview(reviewId);

        if(deletedCount === 0) {
            throw new Error(`${reviewId} 리뷰를 삭제하지 못했습니다.`)
        }

        return { result : 'success'};
    }
}

const reviewService = new ReviewService(reviewModel);
export {reviewService};