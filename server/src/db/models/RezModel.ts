import mongoose, { model } from 'mongoose';
import { ReservationSchema } from '../schemas/RezSchema';

const Reservation = model('reservations', ReservationSchema);

export interface ReservationRegisterData {
  customer: mongoose.Types.ObjectId;
  hospital: mongoose.Types.ObjectId;
  service: string;
  price: number;
  pet: mongoose.Types.ObjectId;
  rezDate: string;
  rezHour: number;
}

export interface ReservationInfo {
  _id: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  hospital: mongoose.Types.ObjectId;
  service: string;
  price: number;
  pet: mongoose.Types.ObjectId;
  rezDate: string;
  rezHour: number;
  rezStatus: mongoose.Types.ObjectId;
  message: string;
}

export class ReservationModel {
  async create(
    rezRegisterData: ReservationRegisterData
  ): Promise<ReservationInfo> {
    const createdNewReservation = (await Reservation.create(
      rezRegisterData
    )) as ReservationInfo;
    return createdNewReservation;
  }
}

const reservationModel = new ReservationModel();

export { reservationModel };
