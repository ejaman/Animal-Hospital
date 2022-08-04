import { Router } from 'express';
import * as _ from 'lodash';
import {
  deletePetCTR,
  getPetCTR,
  registerPetCTR,
  updatePetCTR,
} from '../controllers/PetController';

import { loginRequired } from '../middlewares/LoginRequired';
import { upload } from '../utils';

const petRouter = Router();

// 펫 정보 등록
petRouter.post(
  '/register',
  loginRequired,
  upload.single('image'),
  registerPetCTR
);

// 펫 정보 조회
petRouter.get('/mypets', loginRequired, getPetCTR);

//펫 정보 수정
petRouter.patch('/update', loginRequired, upload.single('image'), updatePetCTR);

//펫 정보 삭제
petRouter.delete('/delete', loginRequired, deletePetCTR);

export { petRouter };
