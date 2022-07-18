import {Router} from 'express';
// import {reviewService} from '../services';
import {postReviewCTR, getReviewCTR, getMyReviewCTR, updateReviewCTR, getAllReviewsCTR} from '../controllers/ReviewController';
import {loginRequired} from '../middlewares';

const router = Router();

router.post('/posting', loginRequired, postReviewCTR);
router.get('/vet', getReviewCTR );
router.get('/user',loginRequired, getMyReviewCTR);
router.get('/admin', loginRequired, getAllReviewsCTR);
router.patch('/update', loginRequired, updateReviewCTR);

export {router as reviewRouter};