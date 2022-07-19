import {Router} from 'express';


import {postReviewCTR} from '../controllers/ReviewController';
import {loginRequired} from '../middlewares';

const router = Router();

router.post('/posting', loginRequired, postReviewCTR)


export {router as reviewRouter};