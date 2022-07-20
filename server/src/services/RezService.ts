import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  SearchOptions,
  ReservationInfo,
  ReservationModel,
  ReservationRegisterData,
  reservationModel,
} from '../db';
import { hospRegStatusService, hospStatusService } from './index';

class ReservationService {
  constructor(private reservationModel: ReservationModel) {}

  // 예약등록
  async creat(
    rezRegisterData: ReservationRegisterData
  ): Promise<ReservationInfo> {
    // db에 저장
    const createdNewReservation = await this.reservationModel.create(
      rezRegisterData
    );

    return createdNewReservation;
  }

  async getReservations(
    page: number,
    perPage: number,
    searchOptions: SearchOptions
  ): Promise<ReservationInfo[]> {
    const reservations = await this.reservationModel.findList(
      page,
      perPage,
      searchOptions
    );
    return reservations;
  }

  async countTotalReservations(searchOptions: SearchOptions): Promise<number> {
    const total = await this.reservationModel.countReservations(searchOptions);

    if (total < 1) {
      throw new Error('예약이 없습니다.');
    }
    return total;
  }
}

const reservationService = new ReservationService(reservationModel);

export { reservationService };
