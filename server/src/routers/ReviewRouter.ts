import {Router} from 'express';
// import {reviewService} from '../services';
import {postReviewCTR, getReviewCTR, getMyReviewCTR} from '../controllers/ReviewController';
import {loginRequired} from '../middlewares';

const router = Router();

router.post('/posting', loginRequired, postReviewCTR);
router.get('/vet', getReviewCTR );
router.get('/user',loginRequired, getMyReviewCTR);

export {router as reviewRouter};