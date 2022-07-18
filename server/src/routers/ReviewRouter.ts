import {Router} from 'express';
// import {reviewService} from '../services';
import {postReviewCTR} from '../controllers/ReviewController';
import {loginRequired} from '../middlewares';

const router = Router();

router.post('/posting', loginRequired, postReviewCTR)

export {router as reviewRouter};