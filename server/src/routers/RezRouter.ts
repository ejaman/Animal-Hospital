import { Router } from 'express';
import * as _ from 'lodash';
import {
  reservationService,
  hospitalService,
  userService,
  petService,
  rezStatusService,
} from '../services';
import {
  adminOnly,
  HospLoginRequired,
  onlyHospOwner,
  loginRequired,
} from '../middlewares';
import {
  hospServiceModel,
  ReservationInfo,
  ReservationRegisterData,
} from '../db';
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

reservationRouter.get('/user/list', loginRequired, async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);

    const userId = req.currentUserId;

    const userInfo = await userService.getUserData(userId);

    const searchOptions = { customer: userId };

    const totalReservations = await reservationService.countTotalReservations(
      searchOptions
    );

    const Reservations = await reservationService.getReservations(
      page,
      perPage,
      searchOptions
    );

    const hospIds = Reservations.map((data) => data.hospital.toString());
    const petIds = Reservations.map((data) => data.pet.toString());
    const rezStatuses = Reservations.map((data) => data.rezStatus.toString());
    console.log(petIds);

    const hospInfoes = await hospitalService.findByIds(hospIds);
    const petInfoes = await petService.findByIds(petIds);
    const rezStatusInfoes = await rezStatusService.findByIds(rezStatuses);

    const totalPage = Math.ceil(totalReservations / perPage);

    res.status(200).json({
      data: {
        searchOptions: searchOptions,
        ReservationsInfo: {
          Reservations: Reservations,
          hospInfoes: hospInfoes,
          petInfoes: petInfoes,
          rezStatusInfoes: rezStatusInfoes,
        },
        page: page,
        perPage: perPage,
        totalPage: totalPage,
        totalHospitals: totalReservations,
      },
      message: '',
    });
  } catch (error) {
    next(error);
  }
});

export { reservationRouter };
