import { Router } from 'express';
import * as _ from 'lodash';
import { reservationService, hospitalService } from '../services';
import {
  adminOnly,
  HospLoginRequired,
  onlyHospOwner,
  loginRequired,
} from '../middlewares';
import { ReservationInfo, ReservationRegisterData } from '../db';
import mongoose, { model } from 'mongoose';

const reservationRouter = Router();

reservationRouter.post('/register', loginRequired, async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (_.isEmpty(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const { hospName, service, price, pet, rezDate, rezHour } = req.body;

    const userId = new mongoose.Types.ObjectId(req.currentUserId);

    const hospitalInfo = await hospitalService.findHospitalByName(hospName);

    const hospitalId = hospitalInfo._id;

    const rezRegisterData: ReservationRegisterData = {
      customer: userId,
      hospital: hospitalId,
      service: service,
      price: price,
      pet: pet,
      rezDate: rezDate,
      rezHour: rezHour,
    };

    const newReservation = await reservationService.creat(rezRegisterData);

    res.status(200).json({
      data: {
        newReservation,
      },
      message: '예약하셨습니다.',
    });
  } catch (error) {
    next(error);
  }
});

export { reservationRouter };
