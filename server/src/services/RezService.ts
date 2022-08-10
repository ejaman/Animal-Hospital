import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  SearchOptions,
  ReservationInfo,
  ReservationModel,
  ReservationRegisterData,
  reservationModel,
  ToUpdateReservation,
} from '../db';
import { hospRegStatusService, hospStatusService } from './index';

class ReservationService {
  constructor(private reservationModel: ReservationModel) {}

  // 예약등록
  async create(
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
    return total;
  }

  async update({
    reservationId,
    update,
  }: ToUpdateReservation): Promise<ReservationInfo> {
    const isExist = await this.reservationModel.findById(reservationId);
    if (!isExist) {
      throw new Error('해당 예약 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    const newHospRegStatus = await this.reservationModel.update({
      reservationId,
      update,
    });
    return newHospRegStatus;
  }

  async findbyNameAndDate(
    hospitalId: string,
    rezDate: string,
    rezHour: number
  ): Promise<ReservationInfo[]> {
    const reservations = await this.reservationModel.findbyNameAndDate(
      hospitalId,
      rezDate,
      rezHour
    );
    return reservations;
  }
}

const reservationService = new ReservationService(reservationModel);

export { reservationService };
