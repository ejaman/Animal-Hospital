import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  ReservationInfo,
  ReservationModel,
  ReservationRegisterData,
  reservationModel,
} from '../db';
import { hospRegStatusService, hospStatusService } from './index';

class ReservationService {
  constructor(private reservationModel: ReservationModel) {}

  // 일반 회원가입
  async creat(
    rezRegisterData: ReservationRegisterData
  ): Promise<ReservationInfo> {
    // db에 저장
    const createdNewReservation = await this.reservationModel.create(
      rezRegisterData
    );

    return createdNewReservation;
  }
}

const reservationService = new ReservationService(reservationModel);

export { reservationService };
